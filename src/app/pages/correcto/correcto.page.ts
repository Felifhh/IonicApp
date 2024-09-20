import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario;
  imageUrl:string = '/assets/img/Correcto.png';
  imageUrl2:string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirConCorreo(this.activatedRoute, this.router);
  }

  ngOnInit() { }


  private async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['Confirmar']
    });
    await alert.present();
  }

  public VolverLogin() {
    this.router.navigate(['/login']);
  }

}




