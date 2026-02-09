const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'praktikum_pbp_p10'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database: ' + err.stack);
        return;
    }
    console.log('Terhubung ke database MySQL dengan ID: ' + db.threadId);
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            message: "Berhasil mengambil data",
            data: results
        });
    });
});

app.post('/users', (req, res) => {
    const { nama, prodi } = req.body;
    const query = 'INSERT INTO users (nama, prodi) VALUES (?, ?)';
    db.query(query, [nama, prodi], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: "Data berhasil ditambahkan",
            id: result.insertId
        });
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nama, prodi } = req.body;
    const query = 'UPDATE users SET nama = ?, prodi = ? WHERE id = ?';
    db.query(query, [nama, prodi, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User tidak ditemukan" });
        res.status(200).json({ message: `Data dengan ID ${id} berhasil diperbarui` });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User tidak ditemukan" });
        res.status(200).json({ message: `User dengan ID ${id} berhasil dihapus` });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});