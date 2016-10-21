var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var VacinaSchema = new mongoose.Schema({
  nome: String,
  aplicacoes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aplicacao', childPath: 'aplicacoes'}]
});

VacinaSchema.plugin(relationship, {
  relationshipPathName: 'aplicacoes'
});

module.exports = mongoose.model('Vacina', VacinaSchema);
