var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
const fs = require("fs");
const path = require("path");

class CrosswordDB {
	constructor() {
		this.database = new sqlite3.Database("./database.db");
	}

	// ----------- Dates ----------- \\
	getYears(callback) {
		let sql = "SELECT year FROM crosswords";
		this.database.all(sql, (err, response) => {
			if (err) {
				return console.error(err.message);
			}
			var years = [];
			for(let i = 0; i < response.length; i++){
				years.push(response[i].year);
			}
			years = [...new Set(years)].sort(function (a, b) { return a - b; });
			callback(years);
		})
	}

	getMonths(callback, year) {
		let sql = "SELECT month FROM crosswords WHERE year = ?";
		this.database.all(sql, [year], (err, response) => {
			if (err) {
				return console.error(err.message);
			}
			var months = [];
			for(let i = 0; i < response.length; i++){
				months.push(response[i].month);
			}
			months = [...new Set(months)].sort(function (a, b) { return a - b; });
			callback(months);
		})
	}

	getDays(callback, year, month) {
		let sql = "SELECT day FROM crosswords WHERE year = ? AND month = ?";
		this.database.all(sql, [year, month], (err, response) => {
			if (err) {
				return console.error(err.message);
			}
			var days = [];
			for(let i = 0; i < response.length; i++) {
				days.push(response[i].day);
			}
			days = [...new Set(days)].sort(function (a, b) { return a - b; });
			callback(days);
		})
	}

	// ----------- Data ----------- \\
	getRandomDay(callback, year = 0, month = 0) {
		// If no arguments are declared, returns random data from any year/month
		if(year) {
			if(month) {
				var data = [year, month];
				var sql = "SELECT * FROM crosswords WHERE year = ? AND month = ? ORDER BY RANDOM() LIMIT 1";
			} else {
				var data = [year];
				var sql = "SELECT * FROM crosswords WHERE year = ? ORDER BY RANDOM() LIMIT 1";
			}
		} else if(month){
			var data = [month];
			var sql = "SELECT * FROM crosswords WHERE month = ? ORDER BY RANDOM() LIMIT 1";
		} else {
			var sql = "SELECT * FROM crosswords ORDER BY RANDOM() LIMIT 1";
		}

		if(year || month) {
			this.database.get(sql, data, (err, response) => {
				if (err) {
					return console.error(err.message);
				}
				callback(response);
			})
		} else {
			this.database.get(sql, (err, response) => {
				if (err) {
					return console.error(err.message);
				}
				callback(response);
			})
		}
	}

	getSpecificDay(callback, year, month, day) {
		let sql = "SELECT * FROM crosswords WHERE year = ? AND month = ? AND day = ?";
		let data = [year, month, day];

		this.database.get(sql, data, (err, response) => {
			if (err) {
				return console.error(err.message);
			}
			callback(response);
		})
	}
}

module.exports = CrosswordDB;