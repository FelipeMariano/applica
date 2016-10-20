var mongoose = require('mongoose');
var Cardeneta = require('./Cardeneta.js');
var relationship = require('mongoose-relationship');

var UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  dt_nasc: Date,
  email: String,
  password: String,
  joined_at: {type: Date},
  updated_at: {type: Date, default: Date.now},
  cardenetas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta', childPath: 'users'}]
});

UserSchema.plugin(relationship, {
  relationshipPathName: 'cardenetas'
})

module.exports = mongoose.model('User', UserSchema);
