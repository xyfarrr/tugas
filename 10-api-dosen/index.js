const express = require('express');
require('dotenv').config();
const dosenRoutes = require('./routes/dosenRoutes');

const app = express();
app.use(express.json());

app.use('/api', dosenRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uji endpoint di: http://localhost:${PORT}/api/dosen`);
});