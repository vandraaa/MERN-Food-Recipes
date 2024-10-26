import express from 'express';
import multer from 'multer';
import { createUser, deleteUser, editUser, getAllUsers, getUserById } from '../controllers/userController.js';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { createRecipe, deleteRecipe, getRecipeByCategoryId, getRecipeById } from '../controllers/recipeController.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})

// user routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', upload.single('image'), editUser);
router.delete('/users/:id', deleteUser);

// category routes
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.patch('/categories/:id', editCategory);
router.delete('/categories/:id', deleteCategory);

// recipe routes
router.post('/recipes', upload.single('image'), createRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getRecipeByCategoryId);
router.delete('/recipes/:id', deleteRecipe);


export default router;