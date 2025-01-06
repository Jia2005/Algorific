import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinkedList from './Learn/LinkedList';
import Stacks from './Learn/Stacks';
import Queues from './Learn/Queues';
import HomePage from './HomePage'; 
import BSTApp from './Algorithms/bst';
import Bstgame from './Game/bstgame';
import Water from './Game/water';
import HuffmanVisualizer from './Learn/huffman';
import Dashboard from './Dashboard/dashboard';
import QueueGame from './Game/queuegame';

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
        <Route path="/huffman" element={<HuffmanVisualizer />} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/queuegame" element={<QueueGame/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
