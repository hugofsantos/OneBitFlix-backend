import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { coursesController } from './controllers/coursesController';

const router = express.Router();

// Categories
router.get('/categories', categoriesController.index);
router.get('/categories/:id', categoriesController.show);

// Courses
router.get('/courses/featured', coursesController.featured);
router.get('/courses/:id', coursesController.show);

export {router};