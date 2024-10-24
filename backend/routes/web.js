import express from 'express';
import { createUser, deleteUser, editUser, getAllUsers, getUserById } from '../controllers/userController.js';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';

const router = express.Router();

// user routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

// category routes
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.patch('/categories/:id', editCategory);
router.delete('/categories/:id', deleteCategory);


export default router;