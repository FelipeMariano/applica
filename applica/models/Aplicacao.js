var mongoose = require('mongoose');

var AplicacaoSchema = new mongoose.Schema({
  data: Date,
  local: String,
  vacina: String,
  lote: String,
  cardeneta: {type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta'}
});

module.exports = mongoose.model('Aplicacao', AplicacaoSchema);
