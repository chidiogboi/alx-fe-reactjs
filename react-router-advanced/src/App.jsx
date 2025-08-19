import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import useAuth from './components/useAuth';

function Home() {
  return <h1 className="text-3xl font-bold text-center mt-10">Home Page</h1>;
}

function About() {
  return <h1 className="text-3xl font-bold text-center mt-10">About Page</h1>;
}

function BlogPost() {
  const { id } = useParams();
  return (
    <div className="mt-5 text-center">
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="mt-3">Viewing blog post with ID: {id}</p>
    </div>
  );
}

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 justify-center">
            <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
            <li><Link to="/blog/123" className="text-white hover:text-gray-200">Blog Post</Link></li>
            <li><Link to="/profile" className="text-white hover:text-gray-200">Profile</Link></li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              )}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;