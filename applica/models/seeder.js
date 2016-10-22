var Doenca = require('./Doenca.js');
var seeder = require('mongoose-seeder');
var data = require('./seed.json');


var seed = function(){
  console.log('-------------\nApplying seeds...');

  Doenca.remove({}, function(){
    console.log("deleted");
  })

  seeder.seed(data).then(function(dbData){
    console.log("seeded com sucesso!\n------------\n");
  }).catch(function(err){
    console.log("erro ao inserir: " + err);
  });
}

module.exports = seed;
