import types from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.data };
    case types.GET_GENRE:
      return { ...state, loading: false, genres: action.data };
    case types.GET_GENRE_ERROR:
      return { ...state, loading: false, genres: null, genreError: action.data };
    case types.GET_MOVIES:
      return { ...state, loading: false, movies: action.data };
    case types.GET_MOVIES_ERROR:
      return { ...state, loading: false, movies: null, moviesError: action.data };
    case types.GET_GENRE_MOVIES:
      return { ...state, loading: false, genres: action.data.genres, movies: action.data.movies };
    case types.GET_GENRE_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        genres: null,
        movies: null,
        genreMoviesError: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
