const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const fs = require("fs");
const CrosswordDB = require('./database.js');
app.use(express.urlencoded({ extended: false }));

app.get('/dates', (req, res) => {
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getYears((response) => {
		res.json(response);
	});
});

app.get('/dates/:year', (req, res) => {
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getMonths((response) => {
		res.json(response);
	}, req.params.year);
});

app.get('/dates/:year/:month', (req, res) => {
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getDays((response) => {
		res.json(response);
	}, req.params.year, req.params.month);
})

app.get('/crosswords', (req, res) => {
	// No data provided
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getRandomDay((response) => {
		res.json(response);
	});
});

app.get('/crosswords/:year', (req, res) => {
	// Year provided
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getRandomDay((response) => {
		res.json(response);
	}, req.params.year);
});

app.get('/crosswords/:year/:month', (req, res) => {
	// Year and month provided
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getRandomDay((response) => {
		res.json(response);
	}, req.params.year, req.params.month);
});

app.get('/crosswords/:year/:month/:day', (req, res) => {
	// Year, month and day provided
	var database = new CrosswordDB;
	res.setHeader('Access-Control-Allow-Origin', '*');
	database.getSpecificDay((response) => {
		res.json(response);
	}, req.params.year, req.params.month, req.params.day);
});

app.listen(port, () => {
 	console.log(`Example app listening at http://localhost:${port}`);
});