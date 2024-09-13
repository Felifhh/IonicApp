import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild('Titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('homecard', { read: ElementRef }) itemHomecard!: ElementRef;


  public usuario: Usuario;
  imageUrl: string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';
  imageHome: string = 'assets/img/Chico-Home-Page.jpeg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
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
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state['usuario']) {
        this.usuario = navigation.extras.state['usuario'];
      } else {
        this.router.navigate(['/login']);  // En caso de no encontrar usuario, redirige al login
      }
    });
  }

  ngOnInit() {
  }

  public goToInicio() {
    this.router.navigate(['/inicio']);
  }

  public goToMiClase() {
    this.router.navigate(['/miclase']);
  }

  public goToMisDatos() {
    this.router.navigate(['/misdatos']);
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

    if (this.itemHomecard) {
      const animation = this.animationController
        .create()
        .addElement(this.itemHomecard.nativeElement)
        .iterations(1)
        .duration(4000)
        .fromTo('opacity', '0', '1'); 
      animation.play();
    }
  }
}


