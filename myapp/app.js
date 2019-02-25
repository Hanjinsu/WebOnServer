var express = require('express');
var app = express();
var fs = require('fs');


// MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WebProject');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
})
var imgSchema = new mongoose.Schema({
	id : String,
	src : String,
	cnt : Number
});

const Img = mongoose.model('Img',imgSchema);


app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

app.use(express.static('../'));

app.get('/changeJson', function (req, res) {
	var winnerId = req.query.winnerID;
	var subject = req.query.subject;
	const fs = require('fs');
	const rtPath = '../data/';
	var json = fs.readFileSync(rtPath + subject + '.json', 'utf-8');
	Json = JSON.parse(json);
	//console.log(Json);
	res.send('recieve data');
	for (var i = 0; i < 8; i++) {
		if (Json[i].src == winnerId) {
			Json[i].cnt++;
		}
	}
	var newJson = JSON.stringify(Json);
	fs.unlinkSync(rtPath + subject + '.json');
	fs.writeFileSync(rtPath + subject + '.json', newJson);

	var add = Img.findOne({'src' : winnerId},function(err,fix){
		if(err){
			console.log(err);
		}
		fix.cnt = fix.cnt + 1;
		fix.save(function(err){
			if(err){
				console.log(err);
			}
		});
	});
});
app.get('/getRank', function (req, res) {
	var subject = req.query.subject;
	var st = Img.find().where({'id': subject}).sort({cnt:-1}).limit(3).exec(function(err,doc){
		if(err){
			console.log(err);
		}
		res.json(doc);
	});
});


/*

cat1 = new Img({
	'id':'cat','src':'assets/img/cat1.jpg','cnt':0
});
cat2 = new Img({
	'id':'cat','src':'assets/img/cat2.jpg','cnt':0
});
cat3 = new Img({
	'id':'cat','src':'assets/img/cat3.jpg','cnt':0
});
cat4 = new Img({
	'id':'cat','src':'assets/img/cat4.jpg','cnt':0
});
cat5 = new Img({
	'id':'cat','src':'assets/img/cat5.jpg','cnt':0
});
cat6 = new Img({
	'id':'cat','src':'assets/img/cat6.jpg','cnt':0
});
cat7 = new Img({
	'id':'cat','src':'assets/img/cat7.jpg','cnt':0
});
cat8 = new Img({
	'id':'cat','src':'assets/img/cat8.jpg','cnt':0
});

cat1.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat2.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat3.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat4.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat5.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat6.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat7.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
cat8.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});

*/
/*
Img.remove(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});

*/