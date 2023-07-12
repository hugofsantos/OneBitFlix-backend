import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { adminJsConfig } from '../../config/adminJs.config';

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS(adminJsConfig);

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs);