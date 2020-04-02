const express = require("express");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const fs = require('fs');


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('videos'))
app.use(express.static('public'))

const navbarPage = fs.readFileSync(__dirname+"/public/navbar/navbar.html", "utf8");
const footerPage = fs.readFileSync(__dirname+"/public/footer/footer.html", "utf8");
const index = fs.readFileSync(__dirname+"/public/index/index.html", "utf8");
const player = fs.readFileSync(__dirname+"/public/player/player.html", "utf8");
const uploadpage = fs.readFileSync(__dirname+"/public/upload/upload.html", "utf8");


//Import routes
const videoRoute = require("./routes/videos");

//Setup routes
app.use(videoRoute)

//const port = proce.env.PORT ? process.env.PORT : 80;

app.get("/player/:id", (req, res) =>{

    return res.send(navbarPage+player+footerPage);
});


app.get("/", (req, res) =>{
    return res.send(navbarPage+index+footerPage)
});

app.get("/upload", (req, res) =>{
    return res.send(navbarPage+uploadpage+footerPage)
});


const server = app.listen(80, (error) =>{
    if(error){
        console.log(error);
    }
    console.log("Server is running", server.address().port);
});

