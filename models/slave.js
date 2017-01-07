const mongoose = require('mongoose');


var slaveSchema = new mongoose.Schema({

  imei: String,
  master: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Master'
  }

});


module.exports = mongoose.model('Slave', slaveSchema);
