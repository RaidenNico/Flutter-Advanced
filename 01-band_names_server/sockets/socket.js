
const { io } = require("../index.js");


//! Mensaje de Sockets

io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
     });                                                       //! "IO" es todo el servidor

     client.on("mensaje", (payload) => {
        console.log("Mensaje!!", payload);

        io.emit("mensaje", {admin: "Nuevo mensaje"});


     })


  });
