import React, { useContext } from 'react';

// Context
import { DetailsContext } from '../../contexts/Details';

// Components
import MovieDetails from '../MovieDetails';

// Semantic UI
import { Loader } from 'semantic-ui-react';

const DetailsContent = () => {
  const {
    state: { loading, movieDetails },
  } = useContext(DetailsContext);

  return !loading && movieDetails ? (
    <MovieDetails />
  ) : (
    <Loader active content="loading..." inline="centered" />
  );
};

export default DetailsContent;
