export class Usuario {

    constructor(id = 0, nombre = '', nick = '', email = '', image = '', rol = '') {
        this.id = id;
        this.nombre = nombre;
        this.nick = nick;
        this.email = email;
        this.image = image;
        this.rol = rol;
    }

    id: number;
    nombre: string;
    nick: string;
    email: string;
    image: string;
    rol: string;
}