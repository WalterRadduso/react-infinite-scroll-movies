import React, { createContext, useEffect, useMemo, useReducer } from 'react';

// Reducer
import reducer from './reducer';

// Action
import { getGenre } from './actions';

const HomeContext = createContext();
const { Provider } = HomeContext;

const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    getGenre(dispatch);
  }, []);

  const contextValue = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [dispatch, state],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export { HomeProvider, HomeContext };
