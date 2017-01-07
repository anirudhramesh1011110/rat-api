const express = require('express');
const router = express.Router();
const Slave = require('../models/slave');

//GET data for web app
router.get('/data', (req, res, next) => {
  //res.send('returning data for slave: ' + req.headers.id);
  res.send("Connection working");

});

// POST data from Android
router.post('/data', (req, res, next) => {

  console.log("GOT POST");

  var query = Slave.find({'imei': req.header.imei});

  query.exec((err, slave) => {
      if(err) throw ("Error!");

      res.send('Slave: ' + slave[0]);

  });



});


module.exports = router;
