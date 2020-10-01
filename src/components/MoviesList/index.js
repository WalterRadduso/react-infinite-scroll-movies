import React from 'react';
import { arrayOf, number, shape } from 'prop-types';

// Semantic UI
import { Button, Icon, Table } from 'semantic-ui-react';

const MoviesList = ({ genres, page, results }) => {
  console.log('genres: ', genres);
  console.log('page: ', page);
  console.log('results: ', results);

  return (
    results && (
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
          {results.map(movie => {
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
              <Icon name="arrow alternate circle down" />
              Scroll to load more movies...
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  );
};

MoviesList.propTypes = {
  genre: arrayOf(shape({})),
  page: number,
  results: arrayOf(shape({})),
};

MoviesList.defaultProps = {
  genres: null,
  page: null,
  results: null,
};

export default MoviesList;
