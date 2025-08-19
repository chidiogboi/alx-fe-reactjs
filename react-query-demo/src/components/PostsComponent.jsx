import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  console.log('Fetching posts from API...'); // To demonstrate caching
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const PostsComponent = () => {
  const queryClient = useQueryClient();

  // Use React Query useQuery hook to fetch data
  const {
    data: posts,
    isLoading,
    error,
    isError,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    cacheTime: 10 * 60 * 1000, // 10 minutes - data stays in cache
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    keepPreviousData: true, // Retain previous data during refetch
  });

  // Handle loading state
  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="error">
        <p>Error loading posts: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  // Function to trigger refetch
  const handleRefetch = () => {
    refetch();
  };

  // Function to invalidate cache and refetch
  const handleInvalidateAndRefetch = () => {
    queryClient.invalidateQueries(['posts']);
  };

  return (
    <div className="posts-container">
      <h1>Posts from JSONPlaceholder API</h1>
      
      <div>
        <button onClick={handleRefetch} disabled={isFetching}>
          {isFetching ? 'Refetching...' : 'Refetch Posts'}
        </button>
        <button onClick={handleInvalidateAndRefetch} disabled={isFetching}>
          Invalidate & Refetch
        </button>
        <p>Status: {isFetching ? 'Fetching...' : 'Ready'}</p>
        <p>Total posts: {posts?.length || 0}</p>
      </div>

      <div style={{margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px'}}>
        <h3>Caching Demo Instructions:</h3>
        <ul style={{textAlign: 'left'}}>
          <li>Refresh this page - data loads from cache if within 5 minutes</li>
          <li>Check browser Network tab to see actual API calls</li>
          <li>Click "Refetch Posts" to manually update data</li>
          <li>Click "Invalidate & Refetch" to force fresh data</li>
        </ul>
      </div>

      <div className="posts-list">
        {posts && posts.slice(0,  Lansing).map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
          </div>
        ))}
      </div>

      {posts && posts.length > 10 && (
        <p>Showing first 10 of {posts.length} posts</p>
      )}
    </div>
  );
};

export default PostsComponent;