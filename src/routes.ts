import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { coursesController } from './controllers/coursesController';
import { EpisodesController } from './controllers/episodesController';
import { authController } from './controllers/authController';
import { ensureJwtAuth, ensureJwtAuthViaQuery } from './middlewares/jwtAuth';
import { favoritesController } from './controllers/favoritesController';

const router = express.Router();

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Categories
router.get('/categories', ensureJwtAuth, categoriesController.index);
router.get('/categories/:id', ensureJwtAuth, categoriesController.show);

// Courses
router.get('/courses/featured', ensureJwtAuth, coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', ensureJwtAuth, coursesController.search);
router.get('/courses/:id', ensureJwtAuth, coursesController.show);

// Episodes
router.get('/episodes/stream', ensureJwtAuthViaQuery ,EpisodesController.stream);

// Favorites
router.post('/favorites', ensureJwtAuth, favoritesController.save);
export {router};