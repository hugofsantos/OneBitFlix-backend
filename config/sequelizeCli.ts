import {Options} from 'sequelize';
import { config } from 'dotenv';

config(); // Configura variáveis de ambiente (.env)

export const sequelizeConfig: Options = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  define: {
    underscored: true // Converte snake_case do banco de dados para camelCase no javascript
  }
};