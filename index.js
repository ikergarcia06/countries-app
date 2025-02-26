const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('API de Países en Node.js');
});

app.get('/countries', async (req, res) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los países' });
    }
});

app.get('/countries/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'País no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});