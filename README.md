# Crossword App

## Schema
``` sql
CREATE TABLE crosswords (
	id INTEGER PRIMARY KEY, 
	year INTEGER, 
	month INTEGER, 
	day INTEGER, 
	columns INTEGER, 
	rows INTEGER, 
	grid TEXT, 
	gridnums TEXT, 
	acrossClues TEXT, 
	downClues TEXT
);
```