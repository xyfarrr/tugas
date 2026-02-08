module.exports = (req, res, next) => {
    const { nama, harga } = req.body;
    
    if (!nama || !harga) {
        return res.status(400).json({
            message: "Nama dan harga produk wajib diisi"
        });
    }
    
    next();
};