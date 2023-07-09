const express = require('express');
const app = express();
const port = 4000; // Change the port number if needed
let recipes = [
  { id: 1, name: 'pasta', ingredients: ['pasta', 'tomatoes', 'cheese'] },
  { id: 2, name: 'Pizza', ingredients: ['dough', 'tomato sauce', 'cheese', 'toppings'] },
];


// GET all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

// GET a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// POST a new recipe
app.post('/recipes', (req, res) => {
  const recipe = req.body;
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  res.status(201).json(recipe);
  res.send({ message: "recipe added successfully" });
});

// PUT update a recipe
app.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  if (recipe) {
    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    res.json(recipe);
    res.send({ message: "recipe edited successfully" });
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// DELETE an existing recipe
app.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex !== -1) {
    recipes.splice(recipeIndex, 1);
    res.sendStatus(204);
    res.send({ message: "recipe deleted successfully" });
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
