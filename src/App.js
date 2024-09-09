import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LinkedList from './LinkedList';
import Stacks from './Stacks';
import Queues from './Queues';
import Auth from './Login/Auth';
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/linkedlist" element={<LinkedList />} />
          <Route path="/stack" element={<Stacks />} />
          <Route path="/queue" element={<Queues />} />
        </Routes>
      </Router>
  );
};

export default App;
