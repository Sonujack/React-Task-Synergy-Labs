import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ updateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  // Fetch the user data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch a specific user's data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      alert(`User updated successfully: ${JSON.stringify(response.data)}`);
      
      // Call the updateUser function to update the user list in the main page
      updateUser(response.data);

      // Redirect to the main page after the update
      navigate('/');
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} onChange={handleChange} required />
        <input name="email" value={user.email} onChange={handleChange} required />
        <input name="phone" value={user.phone} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
