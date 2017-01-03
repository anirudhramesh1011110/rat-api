const express = require('express');
const router = express.Router();

//GET data for web app
router.get('/data', (req, res, next) => {
  //res.send('returning data for slave: ' + req.headers.id);


  res.send("Connection working");

});

// POST data from Android
router.post('/data', (req, res, next) => {
  //res.sendStatus('posting data from slave ' + req.headers.id + ' to master server/mongo');

});


module.exports = router;
