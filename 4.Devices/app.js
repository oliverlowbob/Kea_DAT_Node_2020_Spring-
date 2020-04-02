const express = require('express')
const app = express()


app.use(express.urlencoded({ extended: false }))

app.use(express.json());



let devices = [
    { id: 1, type: "computer"}, 
    { id: 2, type: "smart watch"}
];


app.get("/devices", (req, res) =>{
    return res.send({response: devices})
});

app.get("/devices/:id", (req, res) => {
    const device = devices.find(device => device.id === Number(req.params.id));
    return res.send({ response: device });
});



app.post("/devices", (req, res) => {
    let newDevice = req.body; 
    if(!newDevice.type){
        return res.status(400).send({response: "Missing type"});
    }
    const maxId = devices.reduce((previous, current) =>{
        if(current.id>previous.id){
            return current.id;
        }
        else{
            return previous.id
        }
    });
    newDevice.id = maxId+1;
    devices.push(newDevice);
    return res.send({response: newDevice});
});


app.put("/devices/:id", (req, res) =>{
    const foundIndex = devices.findIndex(device => device.id === Number(req.params.id));
    delete req.body.id
    const newDevice = {...devices[foundIndex], ...req.body};
    devices[foundIndex] = newDevice;
    return res.send({response: devices});

    //const device = devices.find(device => device.id === Number(req.params.id));
    //device.type = req.body
    //return res.send({response: devices})

});

app.delete("/devices/:id", (req, res) =>{

    // devices = devices.filter(device => device.id !== Number(req.params.id));

    const device = devices.find(device => device.id === Number(req.params.id));

    for(var i = 0; i < devices.length; i++) {
      if(devices[i].id == device.id) {
        devices.splice(i, 1);
          break;
        }
    }
    return res.send({response: devices})
      

})



const server = app.listen(80, (error) =>{
    if(error){
        console.log(error);
    }
    console.log("Server is running...", server.address().port);
});