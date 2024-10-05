import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Function to add a new user
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to update an existing user
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
        <Route path="/create" element={<CreateUser addUser={addUser} />} />
        <Route path="/edit/:id" element={<EditUser updateUser={updateUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
