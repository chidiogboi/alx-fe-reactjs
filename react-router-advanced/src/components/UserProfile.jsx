function UserProfile({ users }) {
  return (
    <div className="mt-5 text-center">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="mt-3">Viewing profile for user: {users.name}</p>
    </div>
  );
}

export default UserProfile;