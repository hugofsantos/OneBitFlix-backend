import { AdminJSOptions } from 'adminjs';
import { sequelize } from '../src/database';
import { adminJsResouces } from '../src/admin/resources';
import { locale } from '../src/admin/locale';

export const adminJsConfig:AdminJSOptions = {
  databases: [sequelize],
  rootPath: '/admin', // Rota para acessar o admin
  resources: adminJsResouces,
  locale: locale,
  branding: {
    companyName: 'OneBitFlix',
    logo: '/logoOnebitflix.svg',
    theme: {
      colors: {
        primary100: '#ff0043',
        primary80: '#ff1a57',
        primary60: '#ff3369',
        primary40: '#ff4d7c',
        primary20: '#ff668f',
        grey100: '#151515',
        grey80: '#333333',
        grey60: '#4d4d4d',
        grey40: '#666666',
        grey20: '#dddddd',
        filterBg: '#333333',
        accent: '#151515',
        hoverBg: '#151515',
      }
    }
  }
};