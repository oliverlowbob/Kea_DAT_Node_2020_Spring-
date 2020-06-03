const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const User = require('./models/User.js');
app.use(express.static(__dirname + '/public'));
const parseurl = require('parseurl')
const session = require('express-session')
const ejs = require('ejs');
app.set("view engine", "ejs")
const escape = require('escape-html');
const helmet = require('helmet');
app.use(helmet());
const server = require('http').createServer(app);
const io = require('socket.io')(server)


app.use(session(
    {
    secret: require("./config/mysqlCredentials.js").sessionSecret,
    resave: false,
    saveUninitialized: true
  }))
 
  var clients =[];

  io.on('connection', function (socket) {

    //bruges til at gemme info om clienter
      socket.on('storeClientInfo', function (data) {
            //opretter json object af client, sætter customid og clientid i clienten til den givne customid samt det autogenererede socket.id
          var clientInfo = {}
          clientInfo.customId = data.customId;
          clientInfo.clientId = socket.id;
          //tilføjer den nye client til array af clients
          clients.push(clientInfo);
      });

      //leder efter brugeren der sendes til i arrayet af brugere
      socket.on("send-message", ({ message, from, to }) => {
        // sends out to all the clients
        //io.emit("recieve-message", { message: escape(message), from: escape(from), to: escape(to) });

        //looper gennem alle brugere
        for( var i=0, len=clients.length; i<len; ++i ){
            var c = clients[i];
            //ser om det customid der sættes når der connectes, passer til det id der gives med fra client
            if(c.customId == to){
                //hvis der er match, sendes beskeden først tilbage til clienten selv, så han kan se sin besked, derefter til den fundne client
                socket.emit('recieve-message', { message: escape(message), from: escape(from), to: escape(to) });
                socket.broadcast.to(c.clientId).emit('recieve-message', { message: escape(message), from: escape(from), to: escape(to) });
                break
            }
        }
        socket.on('typing', function (data) {
            console.log(data);
            socket.broadcast.emit('typing', data);
          });
      
        
        //socket.broadcast.to(socketid).emit('recieve-message', { message: escape(message), from: escape(from), to: escape(to) });


    });

    //leder gennem array'et af brugere, for at finde den bruger der har disconnected, og fjerner den fra arrayet
      socket.on('disconnect', function (data) {

          for( var i=0, len=clients.length; i<len; ++i ){
              var c = clients[i];

              if(c.clientId == socket.id){
                  console.log("User left", socket.id);
                  clients.splice(i,1);
                  break;
                  
              }
          }
        


      });
  });



const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8 // limit each IP to 100 requests per windowMs
});
app.use("/login", limiter);
app.use("/signup", limiter);


/* Setup Objection + Knex */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

Model.knex(knex);

/* Add routes */

const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute);
app.use(usersRoute);

//get-request der svarer når man prøver at starte en chat med en bruger. id kommer med fra user-siden 
app.get("/sendmessage/:id", (req, res)=>{
    if(req.session.isLoggedIn === true){
        //bruges så man kan se hvem der skal startes chat med (forvirrende navn)
        fromId = req.params.id
        //brugernavnet på den bruger, der er logget på
        username = req.session.userName
        //id på den bruger der er logget på 
        userId = req.session.userId
        res.render("chat")       
    }
    else{
        res.render("login")

    }
})


app.get("/login", (req, res)=>{
    if(req.session.isLoggedIn === true){
        res.redirect("/")
    }
    else{
        res.render("login")

    }
    //return res.send(navbarPage+loginPage+footerPage)
})

app.get("/signup", (req, res)=>{
    res.render("signup")
})

app.get("/", (req, res)=>{
    var pathname = parseurl(req)
    req.session.myValue = pathname.path
    if(req.session.isLoggedIn === true){    
        username = req.session.userName
        userId = req.session.userId
        res.render("users")
    }
    else{
        return res.redirect("/login")
    }
})

app.get("/chat", (req, res)=>{    

    var pathname = parseurl(req)
    req.session.myValue = pathname.path
    if(req.session.isLoggedIn === true){    
        username = req.session.userName
        userId = req.session.userId
        res.render("chat")
    }
    else{
        return res.redirect("/login")
    } 
})

app.get("/undefined", (req, res)=>{    
    return res.redirect("/chat")
})

app.get("/test", (req, res)=>{
    var pathname = parseurl(req)
    req.session.myValue = pathname.path
    if(req.session.isLoggedIn === true){    
        username = req.session.userName
        res.render("testpage")
    }
    else{
        return res.redirect("/login")
    }
})


/* Start server */

const PORT = 3000;

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
})


