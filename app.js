const express = require('express')
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override")
const flash = require("express-flash")
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')
const connectDB = require("./config/database");
const mainRoutes = require('./routes/mainRoutes.js')
const recipeRoutes = require('./routes/recipeRoutes.js')



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Layouts
app.use(expressLayouts)
app.set('layout','./layouts/main')

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Routes
app.use('/', mainRoutes)
app.use('/recipe', recipeRoutes)

//Console.log Port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
  