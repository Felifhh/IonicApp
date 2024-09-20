import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  @ViewChild('Titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario: Usuario
  imageUrl: string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }


  // Navegacion de datos
  public goToInicio() {
    this.usuario.navegarEnviandousuario(this.router, '/inicio');
  }
  public goToMiClase() {
    this.usuario.navegarEnviandousuario(this.router, '/miclase');
  }
  public goToMisDatos() {
    this.usuario.navegarEnviandousuario(this.router, '/misdatos');
  }
  public async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cerrar sesión cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }


  ionViewDidEnter() {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(5000)
        .fromTo('transform', 'translate(-45%)', 'translate(110%)');
      animation.play();
    }
}
}
