import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  usuario: Usuario;
  imageUrl:string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';


    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private alertController: AlertController
    ) {
      this.usuario = new Usuario();
      this.usuario.recibirConCorreo(this.activatedRoute, this.router);
    }

  ngOnInit() { }


  public async ResponderPregunta() {
    if (this.usuario) {
      if (!this.validarRespuestaSecreta(this.usuario)) return;

      const usu = this.usuario.buscarRespuestaSecreta(this.usuario.respuestaSecreta)

      if(usu){
        const extras: NavigationExtras = {
          state: {
            usuario : usu
          }
        };

        await this.usuario.navegarEnviandousuario2(this.router, '/correcto');
        this.mostrarMensaje('Contraseña Recuperada');
      } else {
        this.usuario.navegarEnviandousuario2(this.router, '/incorrecto');
        this.mostrarMensaje('Contraseña No Recuperada');
      }
    }
  }


  private validarRespuestaSecreta(usuario: Usuario): boolean {
    const mensajeError = usuario.validarRespuesta();
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
