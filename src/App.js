import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinkedList from './LinkedList';
import Stacks from './Stacks';
import Queues from './Queues';
import Auth from './Login/Auth';
import UserProfile from './Profile/profile';
import HomePage from './HomePage'; // Ensure this path is correct

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Auth />} />

        {/* Route for Linked List page */}
        <Route path="/linkedlist" element={<LinkedList />} />

        {/* Route for Stack page */}
        <Route path="/stack" element={<Stacks />} />

        {/* Route for Queue page */}
        <Route path="/queue" element={<Queues />} />

        {/* Route for the user profile page */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
