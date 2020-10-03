import types from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.data };
    case types.LOADING_RATE:
      return { ...state, loadingRate: action.data };
    case types.GET_MOVIE_DETAILS:
      return { ...state, loading: false, movieDetails: action.data };
    case types.GET_MOVIE_DETAILS_ERROR:
      return { ...state, loading: false, movieDetails: null, movieDetailsError: action.data };
    case types.POST_RATE_MOVIE:
      return { ...state, loadingRate: false, movieRated: action.data };
    case types.POST_RATE_MOVIE_ERROR:
      return {
        ...state,
        loadingRate: false,
        movieRated: false,
        movieRatedError: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
