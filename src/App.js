import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinkedList from './LinkedList';
import Stacks from './Stacks';
import Queues from './Queues';
import Auth from './Login/Auth';
import UserProfile from './Profile/profile';
import HomePage from './HomePage'; 
import BSTApp from './Game/bst';
import Bstgame from './bstgame';
import Water from './Game/water';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Auth />} />
        <Route path="/linkedlist" element={<LinkedList />} />
        <Route path="/stack" element={<Stacks />} />
        <Route path="/queue" element={<Queues />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/algo" element={<BSTApp />} />
        <Route path="/bstgame" element={<Bstgame />} />
        <Route path="/water" element={<Water/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
