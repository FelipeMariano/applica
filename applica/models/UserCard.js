var mongoose = require('mongoose');
var UserCardSchema = new mongoose.Schema({
  id_user: String,
  id_card: String,
  created_at: Date
});

module.exports = mongoose.model('UserCard', UserCardSchema);
