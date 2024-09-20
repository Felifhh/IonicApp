import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;
  imageUrl:string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() { }

  public async IniciarSesion() {
    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensaje(error);
      return;
    } 
    this.mostrarMensaje('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/inicio');

  }

  private validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarCuenta();
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    const passwordError = usuario.validarPassword();
    if (passwordError) {
      this.mostrarMensaje(passwordError);
      return false;
    }

    return true;
  }

  private async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['Confirmar']
    });
    await alert.present();
  }


  public RecuperarContrasena() {
    this.router.navigate(['/ingresecorreo']);
  }

}
