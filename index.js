const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxwjp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {

  const collection = client.db("form").collection("formData");
  app.post('/addRegistration', (req,res) => {
    const newRegistration = req.body
    console.log(newRegistration)
      collection.insertOne(newRegistration)
      .then(result => {
      
      res.send(result)
      })

})
console.log(err)
  // perform actions on the collection object
  console.log('database connected')
//   client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World! boss')
})


app.listen( process.env.PORT || port)
