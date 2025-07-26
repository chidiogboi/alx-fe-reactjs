import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
              <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>
                Recipe Sharing Application
              </h1>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App