const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('nodash');

let recentRecipes = [];
let allRecipes = {};


let aboutContent = "This Website shows the recipes added by people and People can add recipes to this website. ";
let homeContent = "Dont know how to cook! Don't worry we got you. Checkout the Recently added Recipes";
let allRecipeContent = "Scroll to find all the recipes";
let contactContent = "Karthik Yechuri \n 813-709-6035";
let addRecipeContent = "Please add the Name of the Recipe and how to prepare it in the form given below";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("home", {homeContent: homeContent, recentRecipes: recentRecipes, allRecipes: allRecipes});
});

app.post("/", function(req, res){
    recentRecipes.push(req.body.recipeName);
    allRecipes[req.body.recipeName] = req.body.recipeInstructions;
    res.redirect("/");
});

app.get("/recipe", function(req, res){
    res.render("recipe", {allRecipeContent: allRecipeContent, allRecipes: allRecipes});
});

app.get("/recipe/:recipeName", function(req, res){
    const recipe = req.params.recipeName;
    res.render("oneRecipe", 
    {recipe: recipe,
    recipeDescription: allRecipes[recipe]
    });
});

app.get("/addrecipe", function(req, res){
    res.render("addrecipe", {addRecipeContent: addRecipeContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent: contactContent});
});

app.get("/about", function(req, res){
    res.render("about", {aboutContent: aboutContent});
});


app.listen("3000", function(){
    console.log("Port Successfully established on 3000");
});