
const { io } = require("../index.js");
const Bands = require("../models/bands.js");
const Band = require("../models/band.js");

const bands  = new Bands();

bands.addBand(new Band("metallica"));
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Linkin Park"));
bands.addBand(new Band("Guns and Roses"));


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


     client.on("vote-band",(payload) => {
      bands.voteBand( payload.id );
      io.emit("active-bands", bands.getBands());
     });

     client.on("add-band",(payload) => {
      const newBand = new Band(payload.name);
      bands.addBand(newBand)
      io.emit("active-bands", bands.getBands());
     });

     client.on("delete-band",(payload) => {
      bands.deleteBand( payload.id );
      io.emit("active-bands", bands.getBands());
     });
  });
