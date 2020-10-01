import React, { useContext } from 'react';

// Context
import { HomeContext } from '../../contexts/Home';

// Components
import MoviesList from '../../components/MoviesList';

// Semantic UI
import { Loader } from 'semantic-ui-react';

const HomeContent = () => {
  const {
    state: { genres, loading, movies },
  } = useContext(HomeContext);

  return loading ? (
    <Loader active content="loading..." inline="centered" />
  ) : (
    <MoviesList genres={genres} {...movies} />
  );
};

export default HomeContent;
