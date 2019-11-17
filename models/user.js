const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	nick_name: { type: String, required: true },
	avatar_urls: { type: String, required: true },
	open_id: { type: String, required: true },
	phoneno: { type: Number, required: true }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;