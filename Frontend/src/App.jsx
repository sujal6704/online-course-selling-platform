import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/edit/:id" element={<EditCourse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
