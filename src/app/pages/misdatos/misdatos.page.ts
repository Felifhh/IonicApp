import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';



@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  @ViewChild('Titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  usuario: Usuario
  imageUrl: string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';
  public listaNivelesEducacionales = NivelEducacional.getNivelEducacionales();

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

  public actualizarNivelEducacional(event: any) {
    this.usuario.nivelEducacional 
      = NivelEducacional.findNivelEducacionalById(event.detail.value)!;
  }


  limpiarPagina() {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional = NivelEducacional.findNivelEducacionalById(1)!;
    this.usuario.fechaNacimiento = undefined;
  }

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }

  mostrarDatosPersona() {
    // Si el usuario no ingresa la cuenta, se mostrará un error
    if (this.usuario.cuenta.trim() === '') {
      this.mostrarMensaje('La cuenta es un campo obligatorio.');
      return;
    }
    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    this.usuario.nombre = this.usuario.nombre.trim();
    this.usuario.apellido = this.usuario.apellido.trim();
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.mostrarMensaje('Debe ingresar al menos un nombre o un apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = `
      <small>
        <b>Cuenta:     </b> ${this.usuario.cuenta} <br>
        <b>Correo:    </b> ${this.usuario.correo} <br>
        <b>Nombre:     </b> ${this.asignado(this.usuario.nombre)} <br>
        <b>Apellido:   </b> ${this.asignado(this.usuario.apellido)} <br>
        <b>Educación:  </b> ${this.asignado(this.usuario.nivelEducacional.getTextoNivelEducacional())} <br>
        <b>Nacimiento: </b> ${this.usuario.getFechaNacimiento()}
      </small>
    `;
    this.mostrarMensaje(mensaje);
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

animarLimpiezaIzq(nativeElement: any, duration: number) {
  this.animationController
    .create()
    .addElement(nativeElement)
    .iterations(1)
    .duration(duration)
    .fromTo('transform', 'translate(100%)', 'translate(0%)')
    .play();
}

animarLimpiezaDer(nativeElement: any, duration: number) {
  this.animationController
    .create()
    .addElement(nativeElement)
    .iterations(1)
    .duration(duration)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },   // Estado inicial
      { offset: 0.5, transform: 'scale(1.2)', opacity: '2' }, // Aumento de tamaño y brillo
      { offset: 1, transform: 'scale(1)', opacity: '1' }])
    .fromTo('transform', 'translate(100%)', 'translate(0%)')
    .play();
}

private async mostrarMensaje(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: mensaje,
    buttons: ['Confirmar']
  });
  await alert.present();
}

limpiarAnimando() {
  console.log('Limpiar Animando');
  this.limpiarPagina();
  this.animarLimpiezaDer(this.itemCuenta.nativeElement, 650);
  this.animarLimpiezaDer(this.itemNombre.nativeElement, 700);
  this.animarLimpiezaDer(this.itemApellido.nativeElement, 750);
  this.animarLimpiezaDer(this.itemEducacion.nativeElement, 800);
  this.animarLimpiezaDer(this.itemFechaNacimiento.nativeElement, 850);
  // Aquí puedes agregar la lógica que necesitas para la animación
}


}
