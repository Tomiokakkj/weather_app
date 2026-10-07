const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const API_KEY = 'c248d45643107c0045d42ed708b0c158';

if (!API_KEY || API_KEY === 'SUA_CHAVE_AQUI') {
  console.warn('AVISO: defina sua API key na constante API_KEY em server.js.');
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  if (!city && !(lat && lon)) {
    return res.status(400).json({ error: 'Informe "city" ou "lat" e "lon".' });
  }

  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    if (city) {
      url.searchParams.set('q', city);
    } else {
      url.searchParams.set('lat', lat);
      url.searchParams.set('lon', lon);
    }
    url.searchParams.set('appid', API_KEY);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('lang', 'pt_br');

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Erro ao consultar a API' });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao buscar o clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
