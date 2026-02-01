const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const validateQuery = require('./middleware/validateQuery');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "TMDb API berjalan",
        contoh: "/movie/search?q=avatar"
    });
});

// Endpoint API TMDb + validasi + error handling
app.get('/movie/search', validateQuery, async (req, res, next) => {
    try {
        const query = req.query.q;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
        );

        // Error dari API TMDb
        if (!response.ok) {
            return res.status(response.status).json({
                status: response.status,
                error: "Data film tidak ditemukan atau API Key bermasalah"
            });
        }

        const data = await response.json();

        // Validasi hasil kosong
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "Film tidak ditemukan"
            });
        }

        const hasil = data.results.map(movie => ({
            judul: movie.title,
            rilis: movie.release_date,
            rating: movie.vote_average
        }));

        res.json({
            status: 200,
            jumlah_data: hasil.length,
            data: hasil
        });

    } catch (error) {
        next(error); // diteruskan ke middleware errorHandler
    }
});

// Middleware error HARUS PALING BAWAH
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});