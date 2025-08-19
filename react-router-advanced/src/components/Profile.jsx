import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ProfileDetails() {
  return <h2 className="text-2xl font-semibold text-center mt-5">Profile Details</h2>;
}

function ProfileSettings() {
  return <h2 className="text-2xl font-semibold text-center mt-5">Profile Settings</h2>;
}

function Profile() {
  return (
    <div className="mt-5">
      <h1 className="text-3xl font-bold text-center">User Profile</h1>
      <nav className="flex justify-center space-x-4 my-4">
        <Link to="details" className="text-blue-600 hover:underline">Details</Link>
        <Link to="settings" className="text-blue-600 hover:underline">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;