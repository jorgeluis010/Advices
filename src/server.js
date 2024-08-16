// server.js
const express = require('express');
const { Translate } = require('@google-cloud/translate').v2;
const cors = require('cors');

const app = express();
const port = 5000;

// Crie uma instância do cliente de tradução
const translate = new Translate({ key: 'YOUR_GOOGLE_CLOUD_API_KEY' });

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const [translation] = await translate.translate(req.body.text, 'pt');
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
