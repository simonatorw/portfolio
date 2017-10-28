const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 8125;
const url = '127.0.0.1';

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
const server = require('http').createServer(app);

server.listen(port, url);
console.log(`Server running at http://${url}:${port}`);

function sendJson(name, res) {
	const filePath = path.join(__dirname, `./app/resource/${name}Data.json`);
	if (fs.existsSync(filePath)) {
		//res.header('Cache-Control', 'public, max-age=31536000');
		res.header('Cache-Control', 'public, max-age=0');
		res.header('Last-Modified', 'Mon, 03 Jan 2011 17:45:57 GMT');
		const readable = fs.createReadStream(filePath);
		readable.pipe(res);
	} else {
		console.log('No such file!');
	}
}

function pushJson(name, res) {
	if (name.includes('RT') || name.includes('rt')) {
		res.header('Content-Type', 'text/event-stream');
		res.header('Cache-Control', 'no-cache');
		res.header('Connection', 'keep-alive');	
		setInterval(function() {
			const pnl = Math.floor(Math.random() * 60) + 10;
			const varVal = Math.round(((Math.random() * 3 + 1) * (Math.floor(Math.random()*2) === 1 ? 1 : -1)) * 100) /100;
			const ret = Math.round(((Math.random() * 3 + 1) * (Math.floor(Math.random()*2) === 1 ? 1 : -1)) * 100) /100;
			const beta = Math.round(((Math.random() * 3 + 1) * (Math.floor(Math.random()*2) === 1 ? 1 : -1)) * 100) /100;
			const alpha = Math.round(((Math.random() * 3 + 1) * (Math.floor(Math.random()*2) === 1 ? 1 : -1)) * 100) /100;
			res.write(`data: { "vsPrevDay": ["$${pnl}M", "${varVal}%", "${ret}%", "${beta}%", "${alpha}%"] }\n\n`);
			res.flushHeaders();
		}, 3000);
		
	}
}

app.get('*', function(req, res) {
	console.log(req.url);
	sendJson(req.url.split('/')[1], res);
	//pushJson(req.url.split('/')[1], res);
});

