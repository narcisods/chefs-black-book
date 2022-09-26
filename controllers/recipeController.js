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











  // getProfile: async (req, res) => {
  //   const limitNumber = 5
  //   const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
  //   const food = { latest }
  //   try {
  //     res.render("profile.ejs", { title: `Chef's Black Book`, user: req.user, food })
  //   } catch (err) { 


//   },
//   getFeed: async (req, res) => { //Get request for feed
//     try {
//       const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean(); //Finds all recipe and puts it in descending order from created date
//       res.render("feed.ejs", { recipes: recipes }); //Renders feed.ejs with recipes: recipes from db
//     } catch (err) { //Errors
//       console.log(err);
//     }
//   },
//   getRecipe: async (req, res) => { //Get request for single recipe
//     try {
//       const post = await Recipe.findById(req.params.id); //Finds recipe object in recipe db using _id
//       res.render("recipe.ejs", { recipe: recipe, user: req.user, comments: req.params.userName, comments: comments }); //renders recipe.ejs with recipe of user
//     } catch (err) { //Errors
//       console.log(err);
//     }
//   },




  
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
      res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
    } catch (err) {
      console.log(err);
    }
  }, 
  // getCatagories: async (req, res) => {
  //   try {
  //     const catagories = await Recipe.category;
  //     res.render('catagories', { title: 'Cooking Blog - Recipe', catagories } );
  //   } catch (error) {
  //     res.satus(500).send({message: error.message || "Error Occured" });
  //   }
  // } 
} 

//   likePost: async (req, res) => { //Put request for likes
//     try {
//       await Recipe.findOneAndUpdate( //Finds recipe and update
//         { _id: req.params.id }, //Finds by ID
//         {
//           $inc: { likes: 1 }, //Increases likes property by one using $inc
//         }
//       );
//       console.log("Likes +1"); //Console.log
//       res.redirect(`/post/${req.params.id}`); //Redirects to post
//     } catch (err) { //Errors
//       console.log(err);
//     }
//   },
//   deleteRecipe: async (req, res) => { //Delete request to delete one recipe
//     try {
//       let post = await Recipe.findById({ _id: req.params.id }); // Find recipe by id
//       await cloudinary.uploader.destroy(recipe.cloudinaryId); // Delete image from cloudinary
//       await Recipe.remove({ _id: req.params.id }); // Delete recipe from db
//       console.log("Deleted Recipe");// Console.log
//       res.redirect("/profile");//redirect /profile
//     } catch (err) { //Errors
//       res.redirect("/profile"); //redirect /profile
//       console.log(err)
//     }
//   },
// };
