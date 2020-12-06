const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://Yoda:WIJTw18H7forYhdQ@cluster0.ruwzh.mongodb.net/yodaBase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');
    app.use(bodyParser.urlencoded({extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})
app.listen(3000, function(){
    console.log('Listening on 3000');
})

console.log('May the Node be with You');
    
  })
  .catch(error => console.error(error))

