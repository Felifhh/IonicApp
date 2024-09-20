import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
    this.usuario = new Usuario();
  }

  ngOnInit() { }


  public async RecuperarContrasena() {
    const error = this.usuario.validarCorreo();
    if(error) {
      this.mostrarMensaje(error);
      return;
    } 
    this.mostrarMensaje('Ingrese su respuesta secreta');
    this.usuario.navegarEnviandousuario2(this.router, '/pregunta');
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
    this.usuario.navegarEnviandousuario(this.router, '/login');
  }
}

