const mongoose = require('mongoose');

var imgSchema = new mongoose.Schema({
	id : String,
	src : String,
	cnt : Number
});

const Img = mongoose.model('Img',imgSchema);

module.exports = mongoose.model('Img',imgSchema);