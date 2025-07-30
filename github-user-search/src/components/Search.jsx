import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }

    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search GitHub Users</h2>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && (
        <div className="loading">
          Loading...
        </div>
      )}

      {error && (
        <div className="error">
          Looks like we cant find the user
        </div>
      )}

      {userData && (
        <div className="user-card">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="user-avatar"
          />
          <h3 className="user-name">{userData.name || userData.login}</h3>
          <p className="user-bio">{userData.bio || 'No bio available'}</p>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;