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

app.use(session(
    {
    secret: require("./config/mysqlCredentials.js").sessionSecret,
    resave: false,
    saveUninitialized: true
  }))
 

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
        res.render("users", {data : username})
    }
    else{
        return res.redirect("/login")
    }
})


app.get("/undefined", (req, res)=>{    
    return res.redirect("/")
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

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
})
