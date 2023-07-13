import {Sequelize} from 'sequelize';
import { sequelizeConfig } from '../../config/sequelize.config';

export const sequelize = new Sequelize(sequelizeConfig);
