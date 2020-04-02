const app = require("express")();

const request = require('request');


app.listen(80, (error) =>{
    if(error){
        console.log(error);
    }
    console.log("Server is running...");
});

const me = {
    name: "Oliver",
    hobby: "adc",
    dateOfBirth: "17-01-1833"
};


app.get("/", (request, response) =>{
    response.send({message : "DABBBBBBB"});
});


app.get("/aboutMe", (request, response) =>{
    response.send(me);
});


app.get("/aboutThisWebsite", (reqeust, response) =>{
    const obj = {
        name: "a website",
        owner: me
    }
    response.send(obj);
});


var weekday=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get("/time", (reqeust, response) =>{

    let date = new Date();
    let obj = {
        date: date.getDate(),
        day: weekday[date.getDay()-1],
        month: month[date.getMonth()],
        hour: date.getHours(),
        minutes: date.getMinutes()
    }   
    return response.send(obj);
});

app.get("/user/:id", (req, res) => {
    console.log(req.params)
    return res.send({"id" : req.params.id})
});

app.get("/search", (req, res) =>{
    const query = req.query;
    return res.send(query);
});



app.get("/google", (req, res) =>{
    request('http://www.google.com', (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        return res.send(body);
      });
});

app.get("/documentation", (req, res) =>{
    //return res.redirect("documentationtwo"); SERVERSIDE REDIRECT
    return res.sendFile(__dirname+"/public/documentation.html");
});

app.get("/documentationtwo", (req, res) =>{
    return res.sendFile(__dirname+"/public/documentationtwo.html");
});