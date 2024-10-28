import express from 'express';
import multer from 'multer';
import { deleteUser, editUser, getAllUsers, getUserById } from '../controllers/userController.js';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { createRecipe, deleteRecipe, editRecipe, getRecipeByCategoryId, getRecipeById, searchRecipesByTitle } from '../controllers/recipeController.js';
import { loginUser, registerUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createIngredient, deleteAllIngredientsByRecipeId, deleteIngredient, editIngredient } from '../controllers/ingredientsController.js';
import { createFeedback, deleteFeedback, getFeedbackByRecipeId } from '../controllers/feedbackController.js';
import { saveRecipe, unsaveRecipe } from '../controllers/savedRecipeController.js';

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
router.patch('/recipes/:id', authMiddleware, upload.single('image'), editRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getRecipeByCategoryId);
router.get('/search/recipes', searchRecipesByTitle);
router.delete('/recipes/:id', authMiddleware, deleteRecipe);

// ingredient routes
router.post('/recipes/ingredients/:id', authMiddleware, createIngredient);
router.patch('/recipes/ingredients/:id', authMiddleware, editIngredient);
router.delete('/recipes/ingredients/:id', authMiddleware, deleteIngredient);
router.delete('/recipes/ingredients/all/:id', authMiddleware, deleteAllIngredientsByRecipeId);

// feedback routes
router.post('/recipes/feedback', authMiddleware, createFeedback);
router.delete('/recipes/feedback/:id', authMiddleware, deleteFeedback);
router.get('/recipes/feedback/:id', getFeedbackByRecipeId);

// saved recipes routes
router.post('/save-recipe', authMiddleware, saveRecipe);
router.delete('/unsave-recipe', authMiddleware, unsaveRecipe);


export default router;