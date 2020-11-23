const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log('Listening on 3000');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

app.post('/quotes', (req, res) => {
    console.log('Heloooooo World 4!!!!')
})
console.log('May the Node be with You');