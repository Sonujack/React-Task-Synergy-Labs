import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = ({ users, setUsers }) => {
  
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        alert('User deleted successfully!');

        // Update the users state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/create">Create New User</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <Link to={`/edit/${user.id}`}>Edit</Link>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
