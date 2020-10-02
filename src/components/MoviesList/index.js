import React, { Fragment, useCallback, useRef, useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';

// Hooks
import useGetMovies from '../../hooks/useGetMovies';

// Semantic UI
import { Button, Icon, Table } from 'semantic-ui-react';

const MoviesList = ({ genres, sortBy }) => {
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

  return (
    movies && (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Genre</Table.HeaderCell>
            <Table.HeaderCell>Language</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Overview</Table.HeaderCell>
            <Table.HeaderCell>Popularity</Table.HeaderCell>
            <Table.HeaderCell>Release Date</Table.HeaderCell>
            <Table.HeaderCell>Votes</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {movies.map(movie => {
            const {
              id,
              genre_ids: genreIds,
              original_language: language,
              overview,
              popularity,
              release_date: releaseDate,
              title,
              vote_count: votes,
            } = movie;

            let movieGenres = [];

            if (genres.length) {
              genres.map(genre => {
                if (genreIds.includes(genre.id)) {
                  movieGenres.push(genre.name);
                }

                return false;
              });
            }

            return (
              <Table.Row key={id}>
                <Table.Cell>
                  {movieGenres.length ? movieGenres.map(genre => <p key={genre}>{genre}</p>) : '-'}
                </Table.Cell>
                <Table.Cell>{language.toUpperCase()}</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{overview}</Table.Cell>
                <Table.Cell>{popularity}</Table.Cell>
                <Table.Cell>{releaseDate}</Table.Cell>
                <Table.Cell>{votes}</Table.Cell>
                <Table.Cell>
                  <Button primary>Details</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell className="right aligned" colSpan="8">
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
  sortBy: string,
};

MoviesList.defaultProps = {
  genres: null,
  sortBy: null,
};

export default MoviesList;
