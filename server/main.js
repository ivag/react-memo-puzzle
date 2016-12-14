"use strict";

var express = require('express');
var app     = new express();

app
.set('views',__dirname+'/../app')
.get('/', function(req, res){
	res.render('../app/index.ejs', {});
})
.use('/static', express.static(__dirname + '/../app/scripts/'))
.listen(8000);

