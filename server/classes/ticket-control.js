const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);


        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) { //recibo en el escritorio

        if (this.tickets.length === 0) { //verifico que haya ticket pendientes de atender
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //extraigo el numero del ticket
        this.tickets.shift(); //elimino la 1er posicion del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio); //creo un nuevo ticket con el nro de ticket mas el escritorio a atender

        this.ultimos4.unshift(atenderTicket); //agrego el ticket al inicio del arreglo

        if (this.ultimos4.length > 4) { //verifico que haya 4 ticket en el arreglo
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo(); //grobo el archivo

        return atenderTicket; //regreso el ticket que quiero atender

    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }


    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }



}



module.exports = {
    TicketControl
}