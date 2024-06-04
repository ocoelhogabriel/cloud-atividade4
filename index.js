const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'cloud',
  host: 'localhost',
  database: 'cloud',
  password: 'cloud',
  port: 5432,
});

app.get('/consulta-dados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao consultar dados');
  }
});

app.get('/liveness', (req, res) => res.send('Aplicação está viva'));
app.get('/readiness', (req, res) => res.send('Aplicação está pronta'));

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
