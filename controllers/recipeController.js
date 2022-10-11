const cloudinary = require("../middleware/cloudinary"); //Allows cloudinary middleware
const Recipe = require("../models/Recipe"); // Variable for recipe model


module.exports = {
  getProfile: async (req, res) => {
    const limitNumber = 20
    const latest = await Recipe.find({user: req.user.id}).sort({_id: -1}).limit(limitNumber)
    const food = { latest }
    try {
      res.render("profile.ejs", { title: `Chef's Black Book`, user: req.user, food, signup: true  })
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
  getCatagories: async (req, res) => {
    try {
      res.render("catagories.ejs", { title: `Chef's Black Book - Catagories`, user: req.user})
    } catch (err) { 
      console.log(err);
    }
  },
  getComponents: async (req, res) => {
    try {      
      const limitNumber = 25
      const component = await Recipe.find({ 'category' : 'Component', user: req.user.id}).sort({name: 1}).limit(limitNumber)
      res.render("component.ejs", { title: `Chef's Black Book - Components`, user: req.user, component }) 
    } catch (err) { 
      console.log(err);
    }
  },
  getSauces: async (req, res) => {
    try {      
      const limitNumber = 25
      const sauces = await Recipe.find({ user: req.user.id,'category' : 'Sauce',user: req.user.id }).sort({name: 1}).limit(limitNumber)
      res.render("sauces.ejs", { title: `Chef's Black Book - Components`, user: req.user, sauces }) 
    } catch (err) { 
      console.log(err);
    }
  },
  getFinal: async (req, res) => {
    try {      
      const limitNumber = 25
      const final = await Recipe.find({ user: req.user.id,'category' : 'Final' }).sort({name: 1}).limit(limitNumber)
      res.render("final.ejs", { title: `Chef's Black Book - Components`, user: req.user, final }) 
    } catch (err) { 
      console.log(err);
    }
  },
  searchRecipe: async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { user: req.user.id,  $text: { $search: searchTerm, $diacriticSensitive: true} });
      res.render('search.ejs', { title: 'Cooking Blog - Search', recipe,user: req.user });
    } catch (err) {
      console.log(err);
    }
    
  },
}