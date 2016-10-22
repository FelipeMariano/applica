var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var VacinaSchema = new mongoose.Schema({
  nome: String,
  idade_mes: Number,
  dose: String,
  doencas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Doenca', childPath: 'doencas'}],

  aplicacoes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aplicacao', childPath: 'aplicacoes'}]
});

VacinaSchema.plugin(relationship, {
  relationshipPathName: 'aplicacoes'
});

VacinaSchema.plugin(relationship, {
  relationshipPathName: 'doencas'
});

module.exports = mongoose.model('Vacina', VacinaSchema);
