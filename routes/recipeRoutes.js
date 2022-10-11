const express = require("express"); 
const router = express.Router(); 
const upload = require("../middleware/multer"); 
const recipeController = require("../controllers/recipeController"); 
const { ensureAuth, ensureGuest } = require("../middleware/auth");  

//Recipe Routes
router.get("/new", ensureAuth, recipeController.newRecipe);
router.post("/create", upload.single("file"), recipeController.createRecipe); 
router.post("/search", ensureAuth, recipeController.searchRecipe);
router.get("/categories", ensureAuth, recipeController.getCatagories);
router.get("/categories/sauces", ensureAuth, recipeController.getSauces);
router.get("/categories/component", ensureAuth, recipeController.getComponents);
router.get("/categories/sauces", ensureAuth, recipeController.getSauces);
router.get("/categories/final", ensureAuth, recipeController.getFinal);
router.get("/:id", ensureAuth, recipeController.getRecipe);
// router.get("/catagories", ensureAuth, recipeController.getCatagories);
// router.put("/likeRecipe/:id", recipeController.likeRecipe); 
router.delete("/deleteRecipe/:id", recipeController.deleteRecipe); 


module.exports = router;
