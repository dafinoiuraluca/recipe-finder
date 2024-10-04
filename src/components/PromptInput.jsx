import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeAI } from "../useRecipeAI";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [, setReturnedRecipe] = useState("");

  const { result, loading, hasResponse, getResponseForGivenPrompt } =
    useRecipeAI();
  const navigate = useNavigate();

  const handleGetRecipes = async () => {
    await getResponseForGivenPrompt(`Give me suggestions for ${prompt}`);
    setPrompt("");

    if (hasResponse) {
      setReturnedRecipe(result);
      navigate("/recipesuggestions", { state: { suggestions: result } });
    }
  };

  return (
    <div className="card">
      <textarea
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to cook today?"
        style={{ textAlign: "center" }}
        className="form-control"
        rows="3"
        cols="60"
      />
      <div className="col-auto">
        <button onClick={handleGetRecipes} className="btn btn-primary">
          Send
        </button>
      </div>

      {loading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
