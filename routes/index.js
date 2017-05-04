const ObjectId = require('mongodb').ObjectID;
const Twit=require('twit');
var T;

//pages
exports.match_url = (req, res)=> {
  let url_id = ObjectId(req.params.id);
  db.collection('questions').find({'_id' : url_id}).toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('matches.ejs', {result: result, session: req.session, page: "single_match"})
  })
}

exports.create_match = (req, res)=> {
  res.render('create_match.ejs', {session: req.session, page: "create_match"});
}

exports.edit_match = (req, res)=> {
  let url_id = ObjectId(req.params.id);
  db.collection('questions').find({'_id' : url_id}).toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('create_match.ejs', {result: result[0], session: req.session, page: "edit_match"})
  })
}


exports.match_list = (req, res)=> {
  db.collection('questions').find().toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('match_list.ejs', {result: result, session: req.session})
  })
}

exports.my_matches = (req, res)=> {
  db.collection('questions').find({"user": req.session.user}).toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('matches.ejs', {result: result, session: req.session, page: "my_matches"})
  })
}

exports.stats = (req, res)=> {
  let url_id = ObjectId(req.params.id);
  db.collection('questions').find({'_id' : url_id}).toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('stats.ejs', {result: result})
  })
}

exports.home = (req, res)=> {
  if(req.session.user !== undefined) {
    T.get('users/search', {q: req.session.user}, function(err, data, response) {
        req.session.real_name = data[0].name;
        res.render('index.ejs', {session: req.session});
    })
  } else {
    res.render('index.ejs', {session: req.session})
  }
}



//twitter and login

exports.handle_twitter_callback = (req, res)=> {
  req.session.user = req.query.raw.screen_name;
  T = new Twit({
  /*REMOVED*/
  })
  res.redirect("/");

}

exports.logout = (req, res)=> {
  req.session.destroy();
  res.redirect('/');
}

exports.login = (req, res)=> {
  res.redirect('/connect/twitter/');
}

//Create new match
exports.submitMatch = (req, res) => {

  db.collection('questions').find().toArray(function(err, result) {
    if (err) return console.log(err);
      const toInsert = {
        user: req.session.user,
        name: req.session.real_name,
        question: req.body.question,
        options: [],
        ip: []
      }

      var keys = Object.keys(req.body);
      for(var i = 0; i < keys.length; i++) {
        if(keys[i].indexOf("answer") >= 0) {
          toInsert.options.push({'answer': keys[i], option: req.body[keys[i]], 'votes': 0});
        }
      }

      if(req.session.user !== null) {
        db.collection('questions').save(toInsert, (err,result) => {
          if (err) return console.log(err)
          res.redirect("/create_match");
      })
      } else {
        res.sendStatus(400);
    }

  });
}

exports.editMatch = (req, res) => {
  var questionId = ObjectId(req.body._id);
  var toInsert = [];
  var keys = Object.keys(req.body);
  for(var i = 0; i < keys.length; i++) {
    if(keys[i].indexOf("answer") >= 0) {
      toInsert.push({'answer': keys[i], option: req.body[keys[i]], 'votes': 0});
    }
  }

  db.collection('questions')
  .findOneAndUpdate({"_id": questionId}, {$push: { options: { $each: toInsert } } } )

  res.redirect('/my_matches');


}

//submit vote

exports.submitVote = (req, res) => {
  var questionId = ObjectId(req.body._id);

  var ip = req.headers['x-forwarded-for'] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;
  ip = ip.replace("::ffff:", "").replace(/\./g, "");
  ip = ip.split(",");

  db.collection('questions').find({'_id' : questionId}).toArray(function(err, result) {
    if (err) return console.log(err);
    if(result[0].ip.indexOf(ip[0]) >= 0) {
        res.sendStatus(400);
      } else {
        db.collection('questions')
        .findOneAndUpdate({"_id": questionId}, {$addToSet : {ip: ip[0]} }, (err, result) => {
          if (err) return res.send(err)
        })
        var index = parseInt(req.body.votedFor) - 1;
        var inc = {};
        inc["options." + index + ".votes"] = 1;
        db.collection('questions')
        .findOneAndUpdate({"_id": questionId}, {$inc : inc }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })

      }
  })

}


exports.deleteMatch = (req, res) => {
  let myId = ObjectId(req.body._id);
  db.collection('questions')
  .findOneAndDelete({"_id": myId}, (err, result) => {
    if (err) return res.send(500, err)
    res.send(result)
  })
}
