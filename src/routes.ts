import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { coursesController } from './controllers/coursesController';
import { EpisodesController } from './controllers/episodesController';

const router = express.Router();

// Categories
router.get('/categories', categoriesController.index);
router.get('/categories/:id', categoriesController.show);

// Courses
router.get('/courses/featured', coursesController.featured);
router.get('/courses/newest', coursesController.newest);
router.get('/courses/search', coursesController.search);
router.get('/courses/:id', coursesController.show);

// Episodes
router.get('/episodes/stream', EpisodesController.stream);
export {router};