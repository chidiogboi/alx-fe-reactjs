import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  // Basic search states
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  
  // Advanced search states
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'

  // Basic search function (existing)
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }

    setLoading(true);
    setError(false);
    setUserData(null);
    setSearchResults([]);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Advanced search function (new)
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError(false);
    setUserData(null);
    setSearchResults([]);

    try {
      const data = await searchUsers(searchQuery, location, minRepos);
      setSearchResults(data.items || []);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>GitHub User Search</h2>
      
      {/* Search Type Toggle */}
      <div className="search-toggle">
        <button
          onClick={() => setSearchType('basic')}
          className={`toggle-btn ${searchType === 'basic' ? 'active' : ''}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`toggle-btn ${searchType === 'advanced' ? 'active' : ''}`}
        >
          Advanced Search
        </button>
      </div>

      {/* Basic Search Form */}
      {searchType === 'basic' && (
        <form onSubmit={handleBasicSearch} className="search-form">
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
      )}

      {/* Advanced Search Form */}
      {searchType === 'advanced' && (
        <form onSubmit={handleAdvancedSearch} className="advanced-search-form">
          <div className="form-group">
            <label htmlFor="searchQuery">Search Query:</label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., john, javascript, react"
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., London, San Francisco"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="minRepos">Min Repositories:</label>
              <input
                id="minRepos"
                type="number"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                placeholder="e.g., 5"
                className="form-input"
                min="0"
              />
            </div>
          </div>
          
          <button type="submit" className="search-button advanced-search-button">
            Advanced Search
          </button>
        </form>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading">
          Loading...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          Looks like we cant find the user
        </div>
      )}

      {/* Basic Search Result */}
      {userData && (
        <div className="user-card">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="user-avatar"
          />
          <h3 className="user-name">{userData.name || userData.login}</h3>
          <p className="user-bio">{userData.bio || 'No bio available'}</p>
          <div className="user-stats">
            <span className="stat">
              <strong>Repos:</strong> {userData.public_repos}
            </span>
            <span className="stat">
              <strong>Followers:</strong> {userData.followers}
            </span>
            <span className="stat">
              <strong>Following:</strong> {userData.following}
            </span>
          </div>
          {userData.location && (
            <p className="user-location">📍 {userData.location}</p>
          )}
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

      {/* Advanced Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length} users found)</h3>
          <div className="users-grid">
            {searchResults.map((user) => (
              <div key={user.id} className="user-card-small">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="user-avatar-small"
                />
                <h4 className="user-name-small">{user.login}</h4>
                <p className="user-score">Score: {Math.round(user.score)}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link-small"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;