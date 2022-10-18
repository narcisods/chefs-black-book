const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

/**
 * App Routes
 */
router.get('/', homeController.homepage);
router.get('/about', homeController.getAbout);
router.get('/contact', homeController.getContact);

router.get('/profile', ensureAuth, recipeController.getProfile);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

router.get('/about', homeController.getAbout);
router.get('/contact', homeController.getContact);

module.exports = router;
