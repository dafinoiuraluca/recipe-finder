import RecipeCard from "../components/RecipeCard";

// eslint-disable-next-line react/prop-types
const WishList = ({ recipes }) => {
  // eslint-disable-next-line react/prop-types
  if (recipes.length === 0) {
    return <p>Start adding some recipes!</p>;
  }

  return (
    <div>
      <div>
        <ul>
          {/* eslint-disable-next-line react/prop-types*/}
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.title} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishList;
