const express = require('express');
const app = express();
const logging = require('./middleware/logging');
const validasiProduk = require('./middleware/validasiProduk');
const auth = require('./middleware/auth');

app.use(express.json());
app.use(logging);

app.post('/produk', validasiProduk, (req, res) => {
    const { nama, harga } = req.body;
    res.json({ message: "Data produk diterima", data: { nama, harga } });
});

app.delete('/produk/:id', auth, (req, res) => {
    const id = req.params.id;
    res.json({ message: `Produk dengan ID ${id} berhasil dihapus` });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});