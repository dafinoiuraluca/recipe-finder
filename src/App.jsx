import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WishList from "./routes/WishList";
import RecipeSuggestions from "./routes/RecipeSuggestions";
import RecipeInstructions from "./routes/RecipeInstructions";
import PromptInput from "./components/PromptInput";
import "./App.css";
import NavBarComponent from "./components/NavBarComponent";

function App() {
  const [wishlistRecipes, setWishlistRecipes] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState("");

  const handleDisplayWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistRecipes(storedWishlist);
  };

  const handleAddToWishlist = (recipe) => {
    const updatedWishlist = [...wishlistRecipes, recipe];
    setWishlistRecipes(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useEffect(() => {
    handleDisplayWishlist();
  }, []);

  const handleGetRecipe = (recipe) => {
    setGeneratedRecipe(recipe);
  };

  return (
    <Router>
      <div className="App">
        <NavBarComponent />
        <h1>Recipe Finder</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <PromptInput onGetRecipe={handleGetRecipe} />
                <WishList recipes={wishlistRecipes} />
              </div>
            }
          />
          <Route
            path="/recipesuggestions"
            element={
              <RecipeSuggestions
                suggestions={generatedRecipe}
                onAddToWishlist={handleAddToWishlist}
              />
            }
          />
          <Route path="/recipeinstructions" element={<RecipeInstructions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
