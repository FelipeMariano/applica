var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  sexo: String,
  dt_nasc: Date,
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cardeneta', CardSchema);
