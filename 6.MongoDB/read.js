const mongo = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'animalfarm';
 
// Use connect method to connect to the server 
//callback, en metode der køres efter en anden metode er slut 
mongo.connect(url,{useUnifiedTopology: true}, (err, client) => {
  if(err){
      throw "Error connecting to mongodb"+err
  }

  console.log("Connected successfully to server");
 
  const animalFarm  = client.db(dbName);
  const buildings = animalFarm.collection("buildings")
  //console.log(buildings.find())

  buildings.find({type: {$exists: true}}).limit(1).toArray((error, foundBuildings) => {
    console.log(foundBuildings)
    client.close()
  })
  

  
});
