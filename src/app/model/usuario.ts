import { NivelEducacional } from "./nivel-educacional";
import { Persona } from "./persona";

export class Usuario extends Persona {
    public cuenta: string;
    public correo: string;
    public password: string;
    public preguntaSecreta: string;
    public respuestaSecreta: string;

    public constructor(
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
        super();
        this.cuenta = cuenta;
        this.correo = correo;
        this.password = password;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nivelEducacional = nivelEducacional;
        this.fechaNacimiento = fechaNacimiento;

    }

    public buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
        return Usuario.getListaUsuarios().find(
            usu => usu.cuenta === cuenta && usu.password === password
        );
    }

    public validarCuenta(): string {
        if (this.buscarUsuarioValido(this.cuenta, this.password)) {
            return '';
        }
        return 'Para ingresar al sistema debe ingresar una cuenta y contraseña válidos.';
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
            new Usuario(
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
            new Usuario(
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
            new Usuario(
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
}
