const express = require('express');
const mysql = require('mysql');
// const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'cmsc198'
});

connection.connect(err => {
	if(err){
		throw err;
	}

	console.log('Connected to the database');
});
global.db = connection;

// middlewares
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

// routes
app.use('/api/login', require('./routes/api/login'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/semester', require('./routes/api/semester'));
app.use('/api/class', require('./routes/api/class'));
app.use('/api/subject', require('./routes/api/subject'));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});