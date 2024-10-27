import express from 'express';
import multer from 'multer';
import { deleteUser, editUser, getAllUsers, getUserById } from '../controllers/userController.js';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { createRecipe, deleteRecipe, getRecipeByCategoryId, getRecipeById } from '../controllers/recipeController.js';
import { loginUser, registerUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})

// auth routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// user routes
router.get('/users', getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.patch('/users/:id', authMiddleware, upload.single('image'), editUser);
router.delete('/users/:id', authMiddleware, deleteUser);

// category routes
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', authMiddleware, createCategory);
router.patch('/categories/:id', authMiddleware, editCategory);
router.delete('/categories/:id', authMiddleware, deleteCategory);

// recipe routes
router.post('/recipes', authMiddleware, upload.single('image'), createRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getRecipeByCategoryId);
router.delete('/recipes/:id', authMiddleware, deleteRecipe);


export default router;