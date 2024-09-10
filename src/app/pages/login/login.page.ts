import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;
  imageUrl: string = 'assets/img/Logo_DuocUC.png';

  constructor(
    private router: Router,
    private toastController: ToastController
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
    this.usuario.cuenta = 'fefuentes';
    this.usuario.password = '1234';
  }

  ngOnInit() { }

  public async IniciarSesion() {
    if (this.usuario) {
      if (!this.validarUsuario(this.usuario)) return;

      const usu = this.usuario.buscarUsuarioValido(this.usuario.cuenta, this.usuario.password);

      if (usu) {
        const extras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };

        await this.router.navigate(['/inicio'], extras);
        this.mostrarMensaje('¡Bienvenido(a) ' + this.usuario.cuenta + ' al Sistema de Asistencia DUOC!');
      } else {
        this.mostrarMensaje('Usuario o contraseña incorrectos.');
      }
    }
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

  private async mostrarMensaje(mensaje: string, duracion: number = 2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion
    });
    toast.present();
  }
}
