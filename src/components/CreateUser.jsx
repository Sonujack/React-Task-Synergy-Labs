import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ addUser }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      alert('User created: ' + JSON.stringify(response.data));
      
      // Call the addUser function to update the user list
      addUser(response.data);

      // Redirect to the main page
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
