import React from 'react';
import { useAuth } from '../../context/auth/AuthState';

const UserProfile = () => {
  const [state] = useAuth();
  const { user } = state;
  const name = user && user.name;
  const department = user && user.department;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {name}</p>
      <p>Department: {department}</p>
    </div>
  );
};

export default UserProfile;
