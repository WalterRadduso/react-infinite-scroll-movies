import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { arrayOf, shape } from 'prop-types';

// Config
import { IMAGES_URL } from '../../config';

// Hooks
import useGetMovies from '../../hooks/useGetMovies';

// Semantic UI
import { Button, Icon, Table } from 'semantic-ui-react';

const MoviesList = ({ genres }) => {
  let history = useHistory();
  const [pageNumber, setPageNumber] = useState(1);

  const { error, hasMore, loading, movies } = useGetMovies(pageNumber, 'title.asc');

  const observer = useRef();

  const lastMovieTableRef = useCallback(
    node => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore],
  );

  const footerInfo = () => {
    if (loading) {
      return (
        <Fragment>
          <Icon loading name="spinner" />
          Loading...
        </Fragment>
      );
    } else {
      if (error) {
        return (
          <Fragment>
            <Icon name="frown" />
            There was an error loading new movies.
          </Fragment>
        );
      } else if (!hasMore) {
        return (
          <Fragment>
            <Icon name="smile" />
            There are no more movies on the list.
          </Fragment>
        );
      }

      return (
        <Fragment>
          <Icon name="arrow alternate circle down" />
          Scroll to load more movies...
          <span ref={lastMovieTableRef} />
        </Fragment>
      );
    }
  };

  const viewMovieDetails = movieId => {
    history.push(`/details/${movieId}`);
  };

  return (
    movies && (
      <Table className="movie-list" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Genre</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {movies.map(movie => {
            const { id, genre_ids: genreIds, poster_path: movieImg, title } = movie;

            let movieGenres = [];

            if (genres && genres.length) {
              genres.map(genre => {
                if (genreIds.includes(genre.id)) {
                  movieGenres.push(genre.name);
                }

                return false;
              });
            }

            return (
              <Table.Row key={id}>
                <Table.Cell className="movie-list-poster">
                  <img
                    className="movie-list-poster__image"
                    src={`${IMAGES_URL}/w200/${movieImg}`}
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>
                  {movieGenres.length ? movieGenres.map(genre => <p key={genre}>{genre}</p>) : '-'}
                </Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell className="movie-list-details">
                  <Button onClick={() => viewMovieDetails(id)} primary>
                    Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell className="right aligned" colSpan="4">
              {footerInfo()}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  );
};

MoviesList.propTypes = {
  genre: arrayOf(shape({})),
};

MoviesList.defaultProps = {
  genres: null,
};

export default MoviesList;
