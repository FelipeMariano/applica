var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Cardeneta = require('./Cardeneta.js');
var relationship = require('mongoose-relationship');

var UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  dt_nasc: Date,
  email: String,
  hashed_password: String,
  salt: {type: String, default: ''},
  joined_at: {type: Date},
  updated_at: {type: Date, default: Date.now},
  cardenetas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta', childPath: 'users'}]
});

const validatePresenceOf = value => value && value.length;

UserSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
    this.authToken = this.makeToken();
  })
  .get(function(){
    return this._password;
  });

UserSchema.plugin(relationship, {
  relationshipPathName: 'cardenetas'
});

///Validations:

UserSchema.path('hashed_password').validate(function(hashed_password){
  return hashed_password.length && this._password.length;
}, 'Password vazio!');

UserSchema.pre('save', function(next){
  if(!this.isNew) return next();

  next();
});

//PreSaver hooks:

UserSchema.methods = {

  authenticate: function(pass_to_auth){
    return this.encryptPassword(pass_to_auth) === this.hashed_password;
  },

  /**
    @return {String}
  **/
  makeSalt: function(){
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  /**
  @param {String} password
  @return {String}
  **/
  encryptPassword: function(password){
    if(!password) return '';

    try{
      return crypto.createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
    }catch(err){
      return '';
    }
  }
}

UserSchema.statics = {
  load: function(options,cb){
    return this.findOne(options.criteria)
    .select(options.select)
    .exec(cb);
    next();
  }
}

module.exports = mongoose.model('User', UserSchema);
