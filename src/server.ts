import express from 'express';
import {config} from 'dotenv';

const app = express();
config(); // Configura variáveis de ambiente (.env)

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
  console.log('Servidor iniciado na porta ' + PORT);
});