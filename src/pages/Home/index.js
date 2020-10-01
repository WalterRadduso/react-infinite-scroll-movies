import React from 'react';

// Provider
import { HomeProvider } from '../../contexts/Home';

// Components
import HomeContent from '../../components/HomeContent';

const HomePage = () => (
  <HomeProvider>
    <div className="Home">
      <p>Infinite Scroll - Movie List</p>
    </div>

    <HomeContent />
  </HomeProvider>
);

export default HomePage;
