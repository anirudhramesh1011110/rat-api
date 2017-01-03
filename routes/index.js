const express = require('express');
const router = express.Router();

//GET index page.
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send("rat-api index.");
});


module.exports = router;
