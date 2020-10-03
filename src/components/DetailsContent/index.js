import React, { useContext } from 'react';

// Context
import { DetailsContext } from '../../contexts/Details';

// Components
import MovieDetails from '../MovieDetails';
import { useHistory } from 'react-router-dom';

// Semantic UI
import { Button, Container, Icon, Loader, Message } from 'semantic-ui-react';

const DetailsContent = () => {
  const {
    state: { loading, movieDetails, movieDetailsError },
  } = useContext(DetailsContext);
  let history = useHistory();

  const loadContent = (loading, movieDetails, movieDetailsError) => {
    if (!loading && movieDetails) {
      return <MovieDetails history={history} />;
    } else if (loading) {
      return <Loader active content="loading..." inline="centered" />;
    } else if (movieDetailsError) {
      return (
        <Message
          header="Oops"
          content="There was a problem getting the movie details. Try again refreshing this page or later."
        />
      );
    }

    return null;
  };

  const viewAllMovies = () => {
    history.goBack();
  };

  return (
    <Container className="details-content">
      {loadContent(loading, movieDetails, movieDetailsError)}

      <Button animated onClick={() => viewAllMovies()} primary className="movie-details__button">
        <Button.Content visible>Go Back</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
    </Container>
  );
};

export default DetailsContent;
