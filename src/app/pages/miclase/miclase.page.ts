import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {

  @ViewChild('Titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('video')
  private video!: ElementRef;
  @ViewChild('canvas')
  private canvas!: ElementRef;
  @ViewChild('fileinput', { static: false })
  private fileinput!: ElementRef;

  public datosQRObjeto: any = null;
  imageSrc: string | ArrayBuffer | null = null;
  public escaneando = false;
  public datosQR: string = '';
  public usuario: Usuario;
  imageUrl: string = 'https://www.duoc.cl/wp-content/themes/wordpress-duoc-cl/images/logo-duoc.svg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  )  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  // Escaneo  desde la camara
  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(imageData?: ImageData): boolean {
    let img: ImageData;
  
    // Si no se proporcionan datos de la imagen, obtenerlos desde el video (cámara)
    if (!imageData) {
      const w: number = this.video.nativeElement.videoWidth;
      const h: number = this.video.nativeElement.videoHeight;
      this.canvas.nativeElement.width = w;
      this.canvas.nativeElement.height = h;
      const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
      context.drawImage(this.video.nativeElement, 0, 0, w, h);
      img = context.getImageData(0, 0, w, h);
    } else {
      // Si se proporcionan datos de la imagen (imagen cargada)
      img = imageData;
    }
  
    // Procesar los datos de la imagen con jsQR
    let qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode && qrCode.data !== '') {
      this.escaneando = false;
      this.mostrarDatosQROrdenados(qrCode.data);
      return true;
    }
    return false;
  }
  

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

// Escaneo desde una imagen
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e.target!.result as string;
      img.onload = () => {
        // Crear un canvas para obtener los datos de la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Llama a obtenerDatosQR con los datos de la imagen cargada
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.obtenerDatosQR(imageData);
        }
      };
    };

    reader.readAsDataURL(file);  // Leer el archivo como Data URL
  }
}


    public cargarImagenDesdeArchivo(): void {
      this.fileinput.nativeElement.click();
    }

    public mostrarDatosQROrdenados(datosQR: string): void {
      this.datosQR = datosQR;
    
      try {
        const objetoDatosQR = JSON.parse(datosQR); // Parsear el JSON
        this.datosQRObjeto = objetoDatosQR; // Guardar el objeto para usarlo en la plantilla HTML
      } catch (e) {
        console.error("El QR no contiene un JSON válido", e);
        this.datosQR = 'El QR no contiene un JSON válido';
        this.datosQRObjeto = null; // Limpiar el objeto en caso de error
      }
    }

public getKeys(obj: any): string[] {
  return Object.keys(obj);
}

public limpiarDatosQR(): void {
  this.datosQRObjeto = null ; // Limpiar los datos del QR
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
    }}
    

}
