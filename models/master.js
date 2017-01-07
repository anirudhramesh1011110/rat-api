const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_FACTOR = 10;



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


masterSchema.pre('save', function(next) {
  var master = this;

  if (!master.isModified('password')) return next();

  // Generate a salt.
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if(err) return next(err);

    // Hash the password with salt.
    bcrypt.hash(master.password, salt, null, (err, hash) => {
      if(err) return next(err);

       // override the cleartext password with the hashed one
       master.password = hash;
       next();
    });
  });

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
