import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipeAI } from "../useRecipeAI";
import AddToWishlistButton from "../components/AddToWishlistButton";

const RecipeInstructions = () => {
  const location = useLocation();
  const recipeName = location.state?.recipeName || "";
  const recipeId = location.state?.recipeId || "";

  const navigate = useNavigate();

  const { result, loading, hasResponse, getResponseForGivenPrompt } =
    useRecipeAI();

  useEffect(() => {
    const getRecipeInstructions = async () => {
      if (recipeName) {
        await getResponseForGivenPrompt(`Give me the recipe for ${recipeName}`);
      }
    };

    getRecipeInstructions();
  }, [recipeName, getResponseForGivenPrompt]);

  useEffect(() => {
    if (hasResponse) {
      navigate("/recipeinstructions", {
        state: { instructions: result, recipeId },
      });
    }
  }, [hasResponse, result, navigate, recipeId]);

  return (
    <div style={{ textAlign: "left"}}>
      <h2>{recipeName}</h2>
      <AddToWishlistButton recipeId={recipeId} />
      <div>
        {loading && (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>
      <pre>{result.replaceAll("**", "")}</pre>
    </div>
  );
};

export default RecipeInstructions;
