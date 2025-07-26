import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  
  // Use filtered recipes if there's a search term, otherwise show all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>Recipe List</h2>
        {searchTerm && (
          <span style={{ color: '#007bff', fontWeight: 'bold' }}>
            Found {filteredRecipes.length} recipe(s)
          </span>
        )}
      </div>
      
      {displayRecipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          {searchTerm ? (
            <div>
              <p>No recipes found matching "{searchTerm}"</p>
              <p>Try searching with different keywords or check your spelling.</p>
            </div>
          ) : (
            <p>No recipes yet. Add your first recipe!</p>
          )}
        </div>
      ) : (
        <div>
          {displayRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              style={{ 
                border: '1px solid #dee2e6', 
                margin: '10px 0', 
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ color: '#007bff', marginBottom: '10px' }}>
                {recipe.title}
              </h3>
              <p style={{ color: '#6c757d', lineHeight: '1.5', marginBottom: '15px' }}>
                {recipe.description.length > 150 
                  ? `${recipe.description.substring(0, 150)}...` 
                  : recipe.description}
              </p>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;