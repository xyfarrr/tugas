const db = require('../config/db');

exports.getAllDosen = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = 'nama_dosen', order = 'ASC', prodi } = req.query;
        let offset = (page - 1) * limit;
        
        let query = "SELECT * FROM dosen WHERE 1=1";
        let params = [];

        if (prodi) {
            query += " AND prodi = ?";
            params.push(prodi);
        }

        query += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [rows] = await db.execute(query, params);
        res.json({ page, limit, data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDosenById = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM dosen WHERE nidn = ?", [req.params.nidn]);
        if (rows.length === 0) return res.status(404).json({ message: "Dosen tidak ditemukan" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.tambahDosen = async (req, res) => {
    const { nidn, nama_dosen, gender, prodi, email } = req.body;
    try {
        await db.execute(
            "INSERT INTO dosen (nidn, nama_dosen, gender, prodi, email) VALUES (?, ?, ?, ?, ?)",
            [nidn, nama_dosen, gender, prodi, email]
        );
        res.status(201).json({ message: "Dosen berhasil ditambahkan" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDosen = async (req, res) => {
    const { nama_dosen, gender, prodi, email } = req.body;
    try {
        await db.execute(
            "UPDATE dosen SET nama_dosen=?, gender=?, prodi=?, email=? WHERE nidn=?",
            [nama_dosen, gender, prodi, email, req.params.nidn]
        );
        res.json({ message: "Data dosen berhasil diperbarui" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDosen = async (req, res) => {
    try {
        await db.execute("DELETE FROM dosen WHERE nidn = ?", [req.params.nidn]);
        res.json({ message: "Dosen berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};