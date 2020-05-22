const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const escape = require('escape-html');
const helmet = require('helmet');
app.use(helmet());

const AColorPicker = require('a-color-picker');



io.on('connection', socket => { 
    // console.log("Socket joined", socket.id);
    

    socket.on("I'm thinking about this", ({ thoughts }) => {
        // sends out to all the clients
        io.emit("Someone said", { thoughts: escape(thoughts) });

        // sends back to the very same client
        //socket.emit("Someone said", { thoughts: escape(thoughts) });

        // sends to all clients but the client itself
        // socket.broadcast.emit("Someone said", { thoughts: escape(thoughts) });

    });

    socket.on("client color", ({ color }) => {
      // sends out to all the clients
      io.emit("color change", { color: escape(color) });

      // sends back to the very same client
      //socket.emit("Someone said", { thoughts: escape(thoughts) });

      // sends to all clients but the client itself
      // socket.broadcast.emit("Someone said", { thoughts: escape(thoughts) });

  });

    
/*     socket.on('disconnect', () => {
        console.log("Socket left", socket.id);
    }); */
});

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html");
});


app.get("/colors", (req, res) => {
  return res.sendFile(__dirname + "/colors.html");
});

server.listen(3000);
