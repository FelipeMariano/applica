var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  dt_nasc: Date,
  email: String,
  password: String,
  joined_at: {type: Date},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
