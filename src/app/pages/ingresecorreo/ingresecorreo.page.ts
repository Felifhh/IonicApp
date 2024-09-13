import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingresecorreo',
  templateUrl: './ingresecorreo.page.html',
  styleUrls: ['./ingresecorreo.page.scss'],
})
export class IngresecorreoPage implements OnInit {

  public usuario: Usuario;
  imageUrl:string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';


  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    this.usuario = new Usuario(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      NivelEducacional.findNivelEducacionalById(1)!,
      undefined
    );
    this.usuario.correo = 'fefuentesh@duocuc.cl'
  }

  ngOnInit() { }


  public async RecuperarContrasena() {
    if (this.usuario) {
      if (!this.validarFormato(this.usuario)) return;
      if (!this.validaRecuperacion(this.usuario)) return;

      const usu = this.usuario.buscarCorreoValido(this.usuario.correo)

      if(usu){
        const extras: NavigationExtras = {
          state: {
            usuario : usu
          }
        };

        await this.router.navigate(['/pregunta'], extras);
        this.mostrarMensaje('Ingrese Respuesta');
      } else {
        this.mostrarMensaje('');
      }
    }
  }

  private validaRecuperacion(usuario: Usuario): boolean {
    const mensajeError = usuario.validarCorreo();
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }
    return true;
  }

private validarFormato(usuario:Usuario): boolean{
  const mensajeError = usuario.validarFormatoCorreo();
  if (mensajeError) {
    this.mostrarMensaje(mensajeError);
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


  public goToLogin() {
    this.router.navigate(['/login']);
  }
}

