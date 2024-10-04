import { useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { useRecipeAI } from "../useRecipeAI";

const RecipeSuggestions = () => {
  const { result, loading, hasResponse, getResponseForGivenPrompt } =
    useRecipeAI();

  const [titles, setTitles] = useState([]);

  const location = useLocation();
  const suggestions = location.state?.suggestions || "";

  const getSuggestions = (suggestions) => {
    const splittedSuggestions = suggestions.split("**").join("");
    const sections = splittedSuggestions.split("\n\n");

    const titles = sections.map((section) => {
      const lines = section.split("\n");
      return lines[0];
    });

    setTitles(titles);
  };

  useEffect(() => {
    getSuggestions(suggestions);
  }, [suggestions]);

  const regenerateSuggestions = async () => {
    const prompt = "Give me other recipe suggestions";

    await getResponseForGivenPrompt(prompt);

    if (hasResponse) {
      getSuggestions(result);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <ul>
          {titles.map((title, index) => (
            <RecipeCard key={index} recipe={title} />
          ))}
        </ul>
        <button onClick={regenerateSuggestions}>
          {"I don't like these options"}
        </button>
        {loading && (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSuggestions;
