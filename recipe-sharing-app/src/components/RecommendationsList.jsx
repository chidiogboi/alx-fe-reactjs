import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  useEffect(() => {
    if (recipes.length > 0) {
      generateRecommendations();
    }
  }, [recipes, favorites, generateRecommendations]);

  const refreshRecommendations = () => {
    generateRecommendations();
  };

  if (recommendations.length === 0) {
    return (
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '30px', 
        borderRadius: '8px',
        textAlign: 'center',
        border: '1px solid #bbdefb',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#1976d2', marginBottom: '15px' }}>🌟 Recommended for You</h2>
        <p style={{ color: '#424242' }}>
          Add some recipes and mark your favorites to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h2 style={{ 
          color: '#1976d2', 
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: 0
        }}>
          🌟 Recommended for You
        </h2>
        <button
          onClick={refreshRecommendations}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄 Refresh
        </button>
      </div>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {recommendations.map((recipe) => (
          <div 
            key={recipe.id} 
            style={{ 
              border: '2px solid #1976d2', 
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f3f8ff',
              position: 'relative'
            }}
          >
            <button
              onClick={() => addFavorite(recipe.id)}
              disabled={favorites.includes(recipe.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: favorites.includes(recipe.id) ? 'default' : 'pointer',
                color: favorites.includes(recipe.id) ? '#dc3545' : '#6c757d'
              }}
              title={favorites.includes(recipe.id) ? 'Already in favorites' : 'Add to favorites'}
            >
              {favorites.includes(recipe.id) ? '❤️' : '🤍'}
            </button>
            
            <h3 style={{ color: '#1976d2', marginBottom: '10px', paddingRight: '40px' }}>
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
                backgroundColor: '#1976d2',
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

export default RecommendationsList;