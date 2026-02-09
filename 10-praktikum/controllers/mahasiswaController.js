const express = require('express');
const router = express.Router();
const db = require('../models/db'); 

router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.put('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    const { nama, gender, prodi, alamat } = req.body;
    
    db.query('UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
        [nama, gender, prodi, alamat, mahasiswaNim], (error) => {
            if (error) {
                console.error('Error updating mahasiswa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Updating mahasiswa Successfully' });
            }
        });
});

router.post('/', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;

    if (!nim || !nama) {
        return res.status(400).json({ message: 'NIM dan Nama wajib diisi' });
    }

    const sql = 'INSERT INTO mahasiswa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nim, nama, gender, prodi, alamat], (error, results) => {
        if (error) {
            console.error('Error adding mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        } else {
            res.status(201).json({ message: 'Mahasiswa added successfully', data: req.body });
        }
    });
});

router.delete('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    
    db.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error, results) => {
        if (error) {
            console.error('Error deleting mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.json({ message: 'Mahasiswa deleted successfully' });
        }
    });
});

module.exports = router;  