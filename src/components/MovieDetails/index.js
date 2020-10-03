import React, { Fragment, useContext, useState } from 'react';

// Config
import { IMAGES_URL } from '../../config';

// Actions
import { rateMovie } from '../../contexts/Details/actions';

// Context
import { DetailsContext } from '../../contexts/Details';

// Semantic UI
import { Container, Grid, Header, Image, Loader, Message, Rating } from 'semantic-ui-react';

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
      movieRatedError,
    },
  } = useContext(DetailsContext);
  const [userRate, setUserRate] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  const rateThisMove = async (e, { rating }) => {
    setShowMessage(true);
    await rateMovie(dispatch, movieId, rating);
    setUserRate(rating);
  };

  const closeErrorMessage = () => {
    setShowMessage(false);
  };

  return (
    <Container className="movie-details">
      <Header as="h2" className="movie-details__title" textAlign="center">
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

              {movieRatedError && showMessage && (
                <Message
                  onDismiss={() => closeErrorMessage()}
                  header="Oops"
                  content="There was a problem voting this movie. Try again later."
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader active inline="centered" />
      )}
    </Container>
  );
};

export default MovieDetails;
