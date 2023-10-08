import React from 'react';
import Home from './pages/Home';
import ResponsiveAppBar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Home />
    </div>
  );
};

export default App;
