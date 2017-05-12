const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Grant = require('grant-express');
const grant = new Grant(require('./config.json'));
require('es6-promise').polyfill();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//grant
app.use(logger('dev'))
app.use(session({
  secret:'grant',
  resave: false,
  cookieName: 'session'
}));
app.use(grant);

const routes = require('./routes/')

MongoClient.connect("*/REMOVED*/", (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })
})

//login

app.get('/login', routes.login);

app.get('/logout', routes.logout);

app.get("/handle_twitter_callback", routes.handle_twitter_callback);

//pages
app.get("/edit_match:id?", routes.edit_match);

app.get("/match_list", routes.match_list);

app.get('/stats:id?', routes.stats);

app.get("/match:id?", routes.match_url);

app.get("/", routes.home);

app.get("/create_match", routes.create_match);

app.get("/my_matches", routes.my_matches);

//polls

app.post("/submitMatch", routes.submitMatch);

app.post("/editMatch", routes.editMatch);

app.put('/submitVote', routes.submitVote);

app.delete("/deleteMatch", routes.deleteMatch);
