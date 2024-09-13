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

  public usuario: Usuario;
  imageUrl:string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';


  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.usuario.respuestaSecreta = ' '
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state['usuario']) {
        this.usuario = navigation.extras.state['usuario'];
      }
    });
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

        await this.router.navigate(['/correcto'], extras);
        this.mostrarMensaje('Contraseña Recuperada');
      } else {
        this.router.navigate(['/incorrecto']);
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
