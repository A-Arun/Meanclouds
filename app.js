var express = require('express');
var fs = require("fs");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('abc'));
app.use(express.static(path.join(__dirname, 'public')));

//Mongo Begin 

var mongoClient=require('mongodb').MongoClient;
var mongoDbObj;
var db ;
var mongodb     = require('mongodb');
mongoClient.connect('mongodb://127.0.0.1:27017/test', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(2010, () => {
    console.log('listening on 2010')
            
      
  })
});


//Mongo End


// EJS Begin

app.set('view engine', 'ejs')

app.get('/get', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {users: result})
  })
})

// Quotes

app.get('/setup', (req, res) => {
  db.collection('food').find().sort(["imageid",1]).toArray((err, result) => {
    if (err) return console.log(err)
        res.render('food.ejs', {food: result})
  })
})

app.get('/order/:id', (req, res) => {
  // var imgid= new String(req.params.id);
    console.log("Order id : " +req.params.id);
  db.collection('food').find({"_id": new mongodb.ObjectId(req.params.id)}).toArray((err, result) => {
    if (err) return console.log(err)
        res.render('order.ejs', {food: result})
  })
})


app.get('/', (req, res) => {
  db.collection('food').find().sort(["imageid",1]).toArray((err, result) => {
    if (err) return console.log(err)
        res.render('simulate.ejs', {food: result})
  })
})

app.get('/view', (req, res) => {
  db.collection('food').find().sort(["imageid",1]).toArray((err, result) => {
    if (err) return console.log(err)
        res.render('simulate.ejs', {food: result})
  })
})


app.get('/del', (req, res) => {
  /*  console.log(req.body.del_id);
    
    
    if(req.body.del_id}) {
         db.collection('food').deleteOne({_id:req.body.del_id});
        
       return res.redirect(301,'/'); }*/
})

app.get('/:id', function(req, res, next) {
     //var id = req.query.id;
     console.log("id : " + req.params.id);
     db.collection('food').deleteOne({"_id": new mongodb.ObjectId(req.params.id)}) ;
     res.redirect(301,'/'); 
    })         
 
     
app.post('/update', (req, res) => {
    //console.log(req.body.submit);
    if(req.body.submit != "save"){
         db.collection('food').deleteOne({_id:req.body.id});
        console.log("id : " +req.body.id[1]);
     return res.redirect(301,'/');

     }else{    
  db.collection('food').updateMany({status:null}, {
    $set: {
      status: req.body.status,
             
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
  
     }
return res.redirect(301,'/');
})

app.post('/save',(req, res) => {
var food_data = {
      status: req.body.status,
      imageid: req.body.imageid,
      hotel: req.body.hotel,
      ftype: req.body.ftype,
      cost: req.body.cost    
};

      db.collection('food').updateMany(food_data, function(err, result) {         
         if(err) { throw err; }
     })
//app.use('/', routes);
      
  res.redirect(301,'/');
})


app.post('/insert',(req, res) => {
var food_data = {
      status: req.body.status,
      imageid: req.body.imageid,
      hotel: req.body.hotel,
      ftype: req.body.ftype,
      cost: req.body.cost   
};

      db.collection('food').insert(food_data, function(err, result) {         
         if(err) { throw err; }
     })
//app.use('/', routes);
      
  res.redirect(301,'/');
})



app.post('/confirm',(req, res) => {
var order_data = {
      status: req.body.status,
      imageid: req.body.imageid,
      name: req.body.name,
      addr: req.body.addr,
      phone: req.body.phone, 
      qty: req.body.qty   
};

      db.collection('order').insert(order_data, function(err, result) {         
         if(err) { throw err; }
     })
//app.use('/', routes);
      
       res.set('Content-type','text/html');
res.end('<html><body> Order Confirmed.. Thanks!!! <br> It will be delivered by 40 mins in COD mode. <br> New Order <a href="/view"> Click here </a> </body></html>');
 
})

// EJS End

module.exports = app;

var debug = require('debug')('request');


app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
});