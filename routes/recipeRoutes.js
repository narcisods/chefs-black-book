const express = require("express"); 
const router = express.Router(); 
const upload = require("../middleware/multer"); 
const recipeController = require("../controllers/recipeController"); 
const { ensureAuth, ensureGuest } = require("../middleware/auth");  

//Recipe Routes
// router.get("/:id", ensureAuth, recipeController.getRecipe);
router.get("/new", ensureAuth, recipeController.newRecipe);
router.post("/create", upload.single("file"), recipeController.createRecipe); 
// router.put("/likeRecipe/:id", recipeController.likeRecipe); 
// router.delete("/deleteRecipe/:id", recipeController.deleteRecipe); 

module.exports = router;
