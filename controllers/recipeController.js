const cloudinary = require("../middleware/cloudinary"); //Allows cloudinary middleware
const recipe = require("../models/recipe"); // Variable for recipe model


module.exports = {
  getProfile: async (req, res) => { //Get request for profile
    try {
      // const recipes = await Recipe.find({ user: req.user.id }); //Finds recipe from db that has logged in user id
      res.render("profile.ejs", { title: "Chef's Black Book"}
      // { recipes: recipes, user: req.user }
      ); //Renders profile.ejs getting info from db of logged in user
    } catch (err) { //Errors
      console.log(err);
    }
  },
  getFeed: async (req, res) => { //Get request for feed
    try {
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean(); //Finds all recipe and puts it in descending order from created date
      res.render("feed.ejs", { recipes: recipes }); //Renders feed.ejs with recipes: recipes from db
    } catch (err) { //Errors
      console.log(err);
    }
  },
  getRecipe: async (req, res) => { //Get request for single recipe
    try {
      const post = await Recipe.findById(req.params.id); //Finds recipe object in recipe db using _id
      res.render("recipe.ejs", { recipe: recipe, user: req.user, comments: req.params.userName, comments: comments }); //renders recipe.ejs with recipe of user
    } catch (err) { //Errors
      console.log(err);
    }
  },
  createRecipe: async (req, res) => { //Recipe request for creating a recipe
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); //Creates result variable declares it as cloudinary uploader

      await Recipe.create({ //creates Recipe
        title: req.body.title, //Gets title from body
        image: result.secure_url, //Gets image url from cloudinary uploader
        cloudinaryId: result.public_id, //Gets cloudinaryId with cloudinary uploader
        caption: req.body.caption, //Gets caption from body
        likes: 0, // Default 0 likes
        user: req.user.id, //Gets user id from logged in user
      });
      console.log("Recipe has been added!"); //Console.log
      res.redirect("/profile"); //redirects to /profile
    } catch (err) { //Errors
      console.log(err);
    }
  },
  likePost: async (req, res) => { //Put request for likes
    try {
      await Recipe.findOneAndUpdate( //Finds recipe and update
        { _id: req.params.id }, //Finds by ID
        {
          $inc: { likes: 1 }, //Increases likes property by one using $inc
        }
      );
      console.log("Likes +1"); //Console.log
      res.redirect(`/post/${req.params.id}`); //Redirects to post
    } catch (err) { //Errors
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => { //Delete request to delete one recipe
    try {
      let post = await Recipe.findById({ _id: req.params.id }); // Find recipe by id
      await cloudinary.uploader.destroy(recipe.cloudinaryId); // Delete image from cloudinary
      await Recipe.remove({ _id: req.params.id }); // Delete recipe from db
      console.log("Deleted Recipe");// Console.log
      res.redirect("/profile");//redirect /profile
    } catch (err) { //Errors
      res.redirect("/profile"); //redirect /profile
      console.log(err)
    }
  },
};
