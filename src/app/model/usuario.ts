import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NivelEducacional } from "./nivel-educacional";
import { Persona } from "./persona";

export class Usuario extends Persona {
    public cuenta: string;
    public correo: string;
    public password: string;
    public preguntaSecreta: string;
    public respuestaSecreta: string;

    constructor() {
        super();
        this.cuenta = '';
        this.correo = '';
        this.password = '';
        this.preguntaSecreta = '';
        this.respuestaSecreta = '';
        this.nombre = '';
        this.apellido = '';
        this.nivelEducacional = NivelEducacional.findNivelEducacionalById(1)!;
        this.fechaNacimiento = undefined;
    }

    public static getNewUsuario(
        cuenta: string,
        correo: string,
        password: string,
        preguntaSecreta: string,
        respuestaSecreta: string,
        nombre: string,
        apellido: string,
        nivelEducacional: NivelEducacional,
        fechaNacimiento: Date | undefined
    ) {
        let usuario = new Usuario();
        usuario.cuenta = cuenta;
        usuario.correo = correo;
        usuario.password = password;
        usuario.preguntaSecreta = preguntaSecreta;
        usuario.respuestaSecreta = respuestaSecreta;
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.nivelEducacional = nivelEducacional;
        usuario.fechaNacimiento = fechaNacimiento;
        return usuario;
    }

    public static buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
        return Usuario.getListaUsuarios().find(
            usu => usu.cuenta === cuenta && usu.password === password
        );
    }

    public validarCuenta(): string {
        const usu = Usuario.buscarUsuarioValido(this.cuenta, this.password);
        if (!usu) {
            return 'Ingrese un usuario u contraseña validos';
        }
        return '';
    }

    public buscarRespuestaSecreta(respuestaSecreta: string): Usuario | undefined {
        return Usuario.getListaUsuarios().find(
            usu => usu.respuestaSecreta === respuestaSecreta
        )
    }

    public validarRespuesta(): string {
        if (this.buscarRespuestaSecreta(this.respuestaSecreta)) {
            return '';
        }
        return '';
    }

    public validarRespuestaSecreta(): string {
        return this.validarRespuesta();
    }


    public static buscarCorreoValido(correo: string): Usuario | undefined {
        return Usuario.getListaUsuarios().find(
            usu => usu.correo === correo
        );
    }

    public validarCorreo(): string {
        const usu = Usuario.buscarCorreoValido(this.correo); 
        if (!usu) {
            return 'Ingrese un correo valido';
        }
        return '';
    }


    public validarPassword(): string {
        if (this.password.trim() === '') {
            return 'Para entrar al sistema debe ingresar la contraseña.';
        }
        if (!/^\d{4}$/.test(this.password)) {
            return 'La contraseña debe ser numérica de 4 dígitos.';
        }
        return '';
    }

    public validarUsuario(): string {
        return this.validarCuenta() || this.validarPassword();
    }

    public getTextoNivelEducacional(): string {
        if (this.nivelEducacional) {
            return this.nivelEducacional.getTextoNivelEducacional();
        }
        return 'No asignado';
    }

    public override toString(): string {
        return `
            Cuenta: ${this.cuenta}
            Correo: ${this.correo}
            Contraseña: ${this.password}
            Pregunta Secreta: ${this.preguntaSecreta}
            Respuesta Secreta: ${this.respuestaSecreta}
            Nombre: ${this.nombre}
            Apellido: ${this.apellido}
            Nivel Educacional: ${this.getTextoNivelEducacional()}
            Fecha de Nacimiento: ${this.formatDateDDMMYYYY(this.fechaNacimiento)}
        `;
    }

    public formatDateDDMMYYYY(date: Date | undefined): string {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    public static getListaUsuarios(): Usuario[] {
        return [
            Usuario.getNewUsuario(
                'omfuentes',
                'omfuentes@duocuc.cl',
                '1290',
                '¿Cuál es tu animal favorito?',
                'perro',
                'Omar',
                'Fuentes',
                NivelEducacional.findNivelEducacionalById(5)!,
                new Date(2000, 0, 1)
            ),
            Usuario.getNewUsuario(
                'chcornejo',
                'chcornejo@duocuc.cl',
                '0987',
                '¿Cuál es tu postre favorito?',
                'pastel',
                'Christian',
                'Cornejo',
                NivelEducacional.findNivelEducacionalById(5)!,
                new Date(2000, 1, 1)
            ),
            Usuario.getNewUsuario(
                'fefuentes',
                'fefuentesh@duocuc.cl',
                '1234',
                '¿Cuantos gatos tienes?',
                '2',
                'Felipe',
                'Fuentes',
                NivelEducacional.findNivelEducacionalById(5)!,
                new Date(2003, 11, 12)
            )
        ];
    }

    recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
        activatedRoute.queryParams.subscribe(() => {
            const nav = router.getCurrentNavigation();
            if (nav) {
                if (nav.extras.state) {
                    const cuenta = nav.extras.state['cuenta'];
                    const password = nav.extras.state['password'];
                    const usu = Usuario.buscarUsuarioValido(cuenta, password)!;
                    this.cuenta = usu.cuenta;
                    this.correo = usu.correo;
                    this.password = usu.password;
                    this.preguntaSecreta = usu.preguntaSecreta;
                    this.respuestaSecreta = usu.respuestaSecreta;
                    this.nombre = usu.nombre;
                    this.apellido = usu.apellido;
                    this.nivelEducacional = usu.nivelEducacional;
                    this.fechaNacimiento = usu.fechaNacimiento;
                    return;
                }
            }
            router.navigate(['/login']);
        });
    }

    navegarEnviandousuario(router: Router, pagina: string) {
        const navigationExtras: NavigationExtras = {
            state: {
                cuenta: this.cuenta,
                password: this.password,
            }
        }
        if (this.cuenta !== '' && this.password !== '')
            router.navigate([pagina], navigationExtras);
        else
            router.navigate([pagina]);
    }

    recibirConCorreo(activatedRoute: ActivatedRoute, router: Router) {
        activatedRoute.queryParams.subscribe(() => {
            const nav = router.getCurrentNavigation();
            if (nav) {
                if (nav.extras.state) {
                    const correo = nav.extras.state['correo'];
                    const usu = Usuario.buscarCorreoValido(correo)!;
                    this.cuenta = usu.cuenta;
                    this.correo = usu.correo;
                    this.password = usu.password;
                    this.preguntaSecreta = usu.preguntaSecreta;
                    this.respuestaSecreta = usu.respuestaSecreta;
                    this.nombre = usu.nombre;
                    this.apellido = usu.apellido;
                    this.nivelEducacional = usu.nivelEducacional;
                    this.fechaNacimiento = usu.fechaNacimiento;
                    return;
                }
            }
            router.navigate(['/login']);
        });
    }

    navegarEnviandousuario2(router: Router, pagina: string) {
        const navigationExtras: NavigationExtras = {
            state: {
                correo: this.correo,
            }
        }
        if (this.correo !== '')
            router.navigate([pagina], navigationExtras);
        else
            router.navigate([pagina]);
    }



}
