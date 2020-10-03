import types from './types';
import MovieService from '../../services/MovieService';

export const getMovieDetails = async function (dispatch, page) {
  dispatch({ type: types.LOADING, data: true });

  try {
    const data = await MovieService.getMovieDetails(page);

    dispatch({
      type: types.GET_MOVIE_DETAILS,
      data,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: types.GET_MOVIE_DETAILS_ERROR,
        data: true,
      });
    }
  }
};

export const rateMovie = async function (dispatch, movieId, rating) {
  dispatch({ type: types.LOADING_RATE, data: true });

  try {
    const { success } = await MovieService.rateMovie(movieId, rating);

    dispatch({
      type: types.POST_RATE_MOVIE,
      data: success,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: types.POST_RATE_MOVIE_ERROR,
        data: true,
      });
    }
  }
};

export default {
  getMovieDetails,
};
