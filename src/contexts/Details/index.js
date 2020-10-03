import React, { createContext, useEffect, useMemo, useReducer } from 'react';

// Reducer
import reducer from './reducer';

// Action
import { getMovieDetails } from './actions';

const DetailsContext = createContext();
const { Provider } = DetailsContext;

const DetailsProvider = ({ children, movieId }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    getMovieDetails(dispatch, movieId);
  }, [movieId]);

  const contextValue = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [dispatch, state],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export { DetailsProvider, DetailsContext };
