// models/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Sesuaikan dengan user mysql Anda
    password: '',      // Sesuaikan dengan password mysql Anda
    database: 'mahasiswa' // Pastikan nama DB sesuai ('mahasiswa' di langkah 1)
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;