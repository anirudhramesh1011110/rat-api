const mongoose = require('mongoose');

var masterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

// Hash Password and salt it.
masterSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
masterSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('Master', masterSchema);
