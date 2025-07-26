import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(recipe => recipe !== undefined);

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '8px',
        textAlign: 'center',
        border: '1px solid #dee2e6',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#495057', marginBottom: '15px' }}>❤️ My Favorites</h2>
        <p style={{ color: '#6c757d' }}>
          You haven't added any favorites yet. Click the heart icon on any recipe to add it to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ 
        color: '#dc3545', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        ❤️ My Favorites ({favoriteRecipes.length})
      </h2>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {favoriteRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            style={{ 
              border: '2px solid #dc3545', 
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#fff8f8',
              position: 'relative'
            }}
          >
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#dc3545'
              }}
              title="Remove from favorites"
            >
              💔
            </button>
            
            <h3 style={{ color: '#dc3545', marginBottom: '10px', paddingRight: '40px' }}>
              {recipe.title}
            </h3>
            <p style={{ color: '#6c757d', lineHeight: '1.5', marginBottom: '15px' }}>
              {recipe.description.length > 120 
                ? `${recipe.description.substring(0, 120)}...` 
                : recipe.description}
            </p>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '8px 16px',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              View Recipe →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;