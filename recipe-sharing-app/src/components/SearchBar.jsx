import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search recipes by title or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            flex: '1',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #007bff',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            style={{
              padding: '12px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        )}
      </div>
      {searchTerm && (
        <p style={{ marginTop: '10px', color: '#6c757d', fontStyle: 'italic' }}>
          Searching for: "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;