import express from 'express';
import { config } from 'dotenv';
import { sequelize } from './database';
import { adminJs, adminJsRouter } from '../src/admin';
import { router } from './routes';

config(); // Configura variáveis de ambiente (.env)

const app = express();

app.use(express.static('public')); // Configura a pasta public como a padrão de assets estáticos 
app.use(adminJs.options.rootPath, adminJsRouter); // Configura a rota do AdminJs
app.use(express.json()); // Configura para ler o corpo da requisição como JSON

// Router
app.use(router);


const PORT = process.env.APP_PORT  ? Number (process.env.APP_PORT) : 8080;

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