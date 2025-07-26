import { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const recipes = useRecipeStore((state) => state.recipes);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize filtered recipes on component mount
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      addRecipe({ 
        id: Date.now(), 
        title: title.trim(), 
        description: description.trim() 
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '25px', 
      borderRadius: '8px', 
      marginBottom: '30px',
      border: '1px solid #dee2e6'
    }}>
      <h2 style={{ color: '#495057', marginBottom: '20px' }}>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            style={{ 
              width: '100%', 
              padding: '12px', 
              fontSize: '16px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              outline: 'none'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            rows="4"
            style={{ 
              width: '100%', 
              padding: '12px', 
              fontSize: '16px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              outline: 'none',
              resize: 'vertical'
            }}
            required
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;