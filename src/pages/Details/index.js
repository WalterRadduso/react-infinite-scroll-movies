import React from 'react';
import { useParams } from 'react-router-dom';

// Provider
import { DetailsProvider } from '../../contexts/Details';

// Components
import DetailsContent from '../../components/DetailsContent';

const Details = () => {
  let { movieId } = useParams();

  return (
    <DetailsProvider movieId={movieId}>
      <div className="Home">
        <p>Infinite Scroll - Movie List</p>
      </div>

      <DetailsContent />
    </DetailsProvider>
  );
};

export default Details;
