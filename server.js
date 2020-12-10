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
    app.use(express.static('public'))
    app.use(bodyParser.json())

app.set('view engine', 'ejs')    
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray().then(results => {
    res.render('index.ejs', { quotes: results })
  })
  .catch(error => console.error(error))
  
})
app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(
    { name: 'Yoda' },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    upsert: true
  }
  )
    .then(result => {
      res.json('Success')
     })
    .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
})

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(error => console.error(error))
})
app.listen(3000, function(){
    console.log('Listening on 3000');
})
console.log('May the Node be with You');
console.log(quotesCollection.find({},{ projection: { _id: 0, name: 1, quote: 1 } }).toArray(function(err, result){
  if (err) throw err;
  console.log(result);
  
}));
    
  })
  .catch(error => console.error(error))

