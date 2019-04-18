export class Usuario {

    constructor(nombre = '', nick = '', email = '', image = '', rol = '') {
        this.nombre = nombre;
        this.nick = nick;
        this.email = email;
        this.image = image;
        this.rol = rol;
    }

    nombre: string;
    nick: string;
    email: string;
    image: string;
    rol: string;
}
