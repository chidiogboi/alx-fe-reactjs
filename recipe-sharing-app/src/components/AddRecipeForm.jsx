import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            rows="4"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            required
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;