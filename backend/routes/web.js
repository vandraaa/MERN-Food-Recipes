import express from 'express';
import multer from 'multer';
import { changePassword, changePhoto, deleteUser, editUser, getAllUsers, getUserById } from '../controllers/userController.js';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { approveRecipe, createRecipe, deleteRecipe, editRecipe, getRecipeByCategoryId, getRecipeById, searchRecipesByTitle } from '../controllers/recipeController.js';
import { loginUser, registerUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createIngredient, deleteAllIngredientsByRecipeId, deleteIngredient, editIngredient } from '../controllers/ingredientsController.js';
import { createFeedback, deleteFeedback, getFeedbackByRecipeId } from '../controllers/feedbackController.js';
import { getSavedRecipeByUserId, saveRecipe, unsaveRecipe } from '../controllers/savedRecipeController.js';
import { createStep, deleteAllStepsByRecipeId, deleteStep, updateStep } from '../controllers/stepsController.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})

// auth routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// user routes
router.get('/users', getAllUsers);
router.get('/users-detail', authMiddleware, getUserById);
router.patch('/users', authMiddleware, editUser);
router.patch('/changes-photo', authMiddleware, upload.single('image'), changePhoto);
router.patch('/changes-password', authMiddleware, changePassword);
router.delete('/users', authMiddleware, deleteUser);

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
router.post('/approve-recipe', authMiddleware, approveRecipe);

// steps routes
router.post('/recipe/steps/:recipeId', authMiddleware, createStep);
router.patch('/recipe/steps/:stepId', authMiddleware, updateStep);
router.delete('/recipe/steps/:stepId', authMiddleware, deleteStep);
router.delete('/recipe/steps/all/:recipeId', authMiddleware, deleteAllStepsByRecipeId);

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
router.get('/saved-recipe', authMiddleware, getSavedRecipeByUserId);
router.post('/save-recipe', authMiddleware, saveRecipe);
router.delete('/unsave-recipe', authMiddleware, unsaveRecipe);


export default router;