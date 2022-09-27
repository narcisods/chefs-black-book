const cloudinary = require("../middleware/cloudinary"); //Allows cloudinary middleware
const Recipe = require("../models/recipe"); // Variable for recipe model


module.exports = {
  getProfile: async (req, res) => {
    const limitNumber = 5
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
    const food = { latest }
    try {
      res.render("profile.ejs", { title: `Chef's Black Book`, user: req.user, food })
    } catch (err) { 
      console.log(err);
    }
  },
  newRecipe: async (req,res) => {
    try {
      const infoErrorsObj = req.flash('infoErrors')
      const infoSubmitObj = req.flash('infoSubmit')
      res.render("new.ejs", { title: `Chef's Black Book`, user: req.user, infoErrorsObj, infoSubmitObj })
    } catch (err) { 
      console.log(err);
    }
  },
  createRecipe: async (req, res) => { 
    try {
      
      const result = await cloudinary.uploader.upload(req.file.path);

      await Recipe.create({ //creates Recipe
        chef: req.body.chef,
        status: req.body.status,
        name: req.body.name, 
        ingredients: req.body.ingredients,
        instructions: req.body.instructions, 
        notes: req.body.notes,
        likes: 0, 
        user: req.user.id,
        category: req.body.category,
        image: result.secure_url,
        cloudinaryId: result.public_id
      });
      console.log("Recipe has been added!"); //Console.log
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect("/profile"); //redirects to /profile
    } catch (err) {
      req.flash('infoErrors', err) 
      res.redirect("/recipe/new")
      console.log(err);
    }
  },

  getRecipe: async (req, res) => {
    try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'Cooking Blog - Recipe', recipe, user: req.user } );
    } catch (err) {
      console.log(err);
    }
  }, 
  deleteRecipe: async (req, res) => { 
    try {
      let recipe = await Recipe.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      await Recipe.remove({ _id: req.params.id }); 
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) { 
      res.redirect("/profile"); 
      console.log(err)
    }
  },
};
