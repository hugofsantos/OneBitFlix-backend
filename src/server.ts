import express from 'express';
import {config} from 'dotenv';
import {sequelize} from './database';

const app = express();
config(); // Configura variáveis de ambiente (.env)

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, async () => {
  sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao se conectar ao banco de dados: ' + error.message);
  });
  console.log('Servidor iniciado na porta ' + PORT);
});