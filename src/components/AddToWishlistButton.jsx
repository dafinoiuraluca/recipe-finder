import { useState, useEffect } from "react";
import Heart from "react-heart";
import "./RecipeCard.css";

// eslint-disable-next-line react/prop-types
const AddToWishlistButton = ({ recipeId }) => {
  const [active, setActive] = useState(false);

  const returnedRecipe = {
    id: recipeId,
  };

  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const isAlreadyInWishlist = existingWishlist.some(
      (recipe) => recipe.id === recipeId
    );
    setActive(isAlreadyInWishlist);
  }, [recipeId]);

  const handleWishlistToggle = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (active) {
      const updatedWishlist = existingWishlist.filter(
        (recipe) => recipe.id !== recipeId
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      existingWishlist.push(returnedRecipe);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    }

    setActive(!active);
  };

  return (
    <div className="add-button">
      <Heart isActive={active} onClick={handleWishlistToggle} />
    </div>
  );
};

export default AddToWishlistButton;
