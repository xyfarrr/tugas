module.exports = (err, req, res, next) => {
    console.error("SERVER ERROR:", err.message);

    res.status(500).json({
        status: 500,
        error: "Terjadi kesalahan pada server",
        detail: err.message
    });
};