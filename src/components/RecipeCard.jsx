import { useNavigate } from "react-router-dom";
import AddToWishlistButton from "./AddToWishlistButton";
import { useId } from "react";
import "./RecipeCard.css";

// eslint-disable-next-line react/prop-types
const RecipeCard = ({ recipe, onAddToWishlist }) => {
  const idPrefix = useId();
  const uniqueId = `${idPrefix}-${recipe}`;

  const navigate = useNavigate();

  const handleClick = () => {
    const recipeName = recipe === undefined ? "Mashed Potatoes" : recipe;

    navigate("/recipeinstructions", {
      state: { recipeName: recipeName, recipeId: uniqueId },
    });
  };

  const handleAddToWishlist = () => {
    const newRecipe = { id: uniqueId, title: recipe };
    onAddToWishlist(newRecipe);
  };

  return (
    <>
      <div className="recipe-card" onClick={handleClick}>
        <div className="recipe-card-body">
          <span className="recipe-card-title">
            {recipe || "Mashed Potatoes"}
          </span>
        </div>
      </div>
      <div className="button-card">
        <AddToWishlistButton recipeId={uniqueId} onClick={handleAddToWishlist}/>
      </div>
    </>
  );
};

export default RecipeCard;
