
const { io } = require("../index.js");
const Bands = require("../models/bands.js");
const Band = require("../models/band.js");

const bands  = new Bands();

bands.addBand(new Band("metallica"));
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Linkin Park"));
bands.addBand(new Band("Bon Jovi"));


console.log(bands);

//! Mensaje de Sockets

io.on('connection', client => {
    console.log("Cliente conectado");

      client.emit("active-bands", bands.getBands());




    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
     });                                                       //! "IO" es todo el servidor

     client.on("mensaje", (payload) => {
        console.log("Mensaje!!", payload);

        io.emit("mensaje", {admin: "Nuevo mensaje"});
     });


     client.on("emitir-mensaje", (payload) => {
      //console.log(payload);
     // io.emit("nuevo-mensaje", payload); //emite a todos
     client.broadcast.emit("nuevo-mensaje", payload);  //! emite a todos menos el que lo emitio
     });



  });
