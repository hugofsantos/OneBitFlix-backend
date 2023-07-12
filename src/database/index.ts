import {Sequelize} from 'sequelize';
import { sequelizeConfig } from '../../config/sequelizeCli';

export const sequelize = new Sequelize(sequelizeConfig);
