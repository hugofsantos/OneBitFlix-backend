import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { adminJsConfig } from '../../config/adminJs.config';
import { userModel } from '../models';
import bcrypt from 'bcrypt';

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS(adminJsConfig);

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await userModel.findOne({where: {email}});

    if(user && user.role === 'admin') {
      const matched = await bcrypt.compare(password, user.password);

      if(matched) return user;
    }

    return false;
  },
  cookiePassword: process.env.ADMIN_PASSWORD ?? '',
}, null, {  resave: false, saveUninitialized: false});