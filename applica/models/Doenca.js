var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var DoencaSchema = new mongoose.Schema({
  nome: String,
  vacinas = [{type: mongoose.Schema.Types, ref: 'Vacina', childPath: 'doencas'}]
});
