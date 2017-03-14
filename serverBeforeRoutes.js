const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

//var routes = require('./routes/')

MongoClient.connect("mongodb://admin:admin@ds129720.mlab.com:29720/fcc-voting-app", (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res)=> {
  db.collection('questions').find().toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {result: result})
  })

})




app.post("/submit-question", (req, res) => {

  db.collection('questions').find().toArray(function(err, result) {
    if (err) return console.log(err);

      let toInsert = {
        question_id : result.length + 1,
        question: req.body.question,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer1_votes: 0,
        answer2_votes: 0,
      }

      console.log(toInsert);

      db.collection('questions').save(toInsert, (err,result) => {
        if (err) return console.log(err)
        res.send('Your question has been saved!');
      })

  });
})


app.put('/submitVote', (req, res) => {
  console.log(req.body)
  db.collection('questions')
  .findOneAndUpdate({"question_id": parseInt(req.body.question_id)}, {$inc : {[req.body.questionToUpdate] : 1} }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
