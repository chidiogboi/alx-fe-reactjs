import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1 className="text-3xl font-bold text-center mt-10">Home Page</h1>;
}

function About() {
  return <h1 className="text-3xl font-bold text-center mt-10">About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 justify-center">
            <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;