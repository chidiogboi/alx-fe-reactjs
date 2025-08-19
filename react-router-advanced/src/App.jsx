import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function Home() {
  return <h1 className="text-3xl font-bold text-center mt-10">Home Page</h1>;
}

function About() {
  return <h1 className="text-3xl font-bold text-center mt-10">About Page</h1>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const users = { name: "John Doe" };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <ul className="flex space-x-4 justify-center">
          <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
          <li><Link to="/profile" className="text-white hover:text-gray-200">Profile</Link></li>
          <li><Link to="/user/john" className="text-white hover:text-gray-200">User Profile</Link></li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={() => setIsAuthenticated(false)}
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
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:userId" element={<UserProfile users={users} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}

export default App;