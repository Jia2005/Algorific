import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinkedList from './LinkedList';
import Stacks from './Stacks';
import Queues from './Queues';
import HomePage from './HomePage'; 
import BSTApp from './Game/bst';
import Bstgame from './bstgame';
import Water from './Game/water';
import HashingGame from './HashingGame';
import HuffmanVisualizer from './huffman';
import Dashboard from './Dashboard/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/linkedlist" element={<LinkedList />} />
        <Route path="/stack" element={<Stacks />} />
        <Route path="/queue" element={<Queues />} />
        <Route path="/algo" element={<BSTApp />} />
        <Route path="/bstgame" element={<Bstgame />} />
        <Route path="/water" element={<Water />} />
        <Route path="/hashing" element={<HashingGame />} />
        <Route path="/huffmangame" element={<HuffmanVisualizer />} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
