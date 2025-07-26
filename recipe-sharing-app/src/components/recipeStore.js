import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return { 
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    const updatedFavorites = state.favorites.filter(favId => favId !== id);
    return {
      recipes: updatedRecipes,
      favorites: updatedFavorites,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  
  setSearchTerm: (term) => set((state) => {
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase())
    );
    return {
      searchTerm: term,
      filteredRecipes
    };
  }),
  
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  // Favorites functionality
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // Recommendations functionality
  generateRecommendations: () => set((state) => {
    // Mock implementation based on favorites
    const favoriteRecipes = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id)
    );
    
    if (favoriteRecipes.length === 0) {
      // If no favorites, recommend random recipes
      const shuffled = [...state.recipes].sort(() => 0.5 - Math.random());
      return { recommendations: shuffled.slice(0, 3) };
    }
    
    // Simple recommendation based on keywords from favorite recipes
    const favoriteKeywords = favoriteRecipes
      .map(recipe => recipe.title.toLowerCase().split(' '))
      .flat()
      .filter(word => word.length > 3); // Filter out short words
    
    const recommended = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude already favorited
      .filter(recipe => {
        const recipeWords = (recipe.title + ' ' + recipe.description).toLowerCase();
        return favoriteKeywords.some(keyword => recipeWords.includes(keyword));
      })
      .slice(0, 3);
    
    // If not enough keyword-based recommendations, fill with random recipes
    if (recommended.length < 3) {
      const remaining = state.recipes
        .filter(recipe => 
          !state.favorites.includes(recipe.id) && 
          !recommended.some(rec => rec.id === recipe.id)
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - recommended.length);
      
      recommended.push(...remaining);
    }
    
    return { recommendations: recommended };
  })
}));

export default useRecipeStore;