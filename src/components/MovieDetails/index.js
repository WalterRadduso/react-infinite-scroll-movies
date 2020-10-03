import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Config
import { IMAGES_URL } from '../../config';

// Actions
import { rateMovie } from '../../contexts/Details/actions';

// Context
import { DetailsContext } from '../../contexts/Details';

// Semantic UI
import { Button, Container, Grid, Header, Icon, Image, Loader, Rating } from 'semantic-ui-react';

const MovieDetails = () => {
  const {
    dispatch,
    state: {
      loadingRate,
      movieDetails: {
        id: movieId,
        overview,
        poster_path: movieImg,
        title,
        vote_average: voteAverage,
        vote_count: voteCount,
      },
    },
  } = useContext(DetailsContext);
  const [userRate, setUserRate] = useState(0);

  let history = useHistory();

  const rateThisMove = async (e, { rating }) => {
    await rateMovie(dispatch, movieId, rating);
    setUserRate(rating);
  };

  const viewAllMovies = () => {
    history.goBack();
  };

  return (
    <Container className="movie-details">
      <Header as="h2" textAlign="center">
        {title}
      </Header>

      <Image
        className="movie-details__image"
        src={`${IMAGES_URL}/w200/${movieImg}`}
        size="medium"
      />

      <Header as="h3" textAlign="center">
        Overview
      </Header>
      <p>{overview}</p>

      <Header as="h3" textAlign="center">
        Ranking
      </Header>

      <Fragment>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h5" textAlign="center">
                Vote Quantity
              </Header>

              <p>{voteCount}</p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Header as="h5" textAlign="center">
                Vote Average
              </Header>

              <Rating icon="star" rating={voteAverage} maxRating={10} disabled />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>

      <Header as="h3" textAlign="center">
        Vote this movie
      </Header>

      {!loadingRate ? (
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Rating
                icon="star"
                rating={userRate}
                maxRating={10}
                clearable
                className="movie-details__rating"
                onRate={rateThisMove}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader active inline="centered" />
      )}

      <Button animated onClick={() => viewAllMovies()} primary className="movie-details__button">
        <Button.Content visible>Go Back</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
    </Container>
  );
};

export default MovieDetails;
