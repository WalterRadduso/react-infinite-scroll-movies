import types from './types';
import MovieService from '../../services/MovieService';

export const getMovies = async function (dispatch, page) {
  dispatch({ type: types.LOADING, data: true });

  try {
    const data = await MovieService.getMovies(page);

    dispatch({ type: types.GET_MOVIES, data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: types.GET_MOVIES_ERROR,
        data: true,
      });
    }
  }
};

export const getGenre = async function (dispatch) {
  try {
    const { genres } = await MovieService.getGenre();

    dispatch({ type: types.GET_GENRE, data: genres });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: types.GET_GENRE_ERROR,
        data: true,
      });
    }
  }
};

export const getGenreMovies = async function (dispatch, page) {
  try {
    const movies = await MovieService.getMovies(page);
    const { genres } = await MovieService.getGenre();

    dispatch({
      type: types.GET_GENRE_MOVIES,
      data: {
        movies: {
          page: movies.page,
          results: movies.results,
        },
        genres,
      },
    });
  } catch (error) {
    if (error.response) {
      const { data } = error.response;

      dispatch({
        type: types.GET_GENRE_MOVIES_ERROR,
        data,
      });
    }
  }
};

export default {
  getGenre,
  getGenreMovies,
  getMovies,
};
