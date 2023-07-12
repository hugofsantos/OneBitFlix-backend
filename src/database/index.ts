import {Sequelize} from 'sequelize';
import { sequelizeConfig } from '../../config/sequelizeCli.config';

export const sequelize = new Sequelize(sequelizeConfig);
