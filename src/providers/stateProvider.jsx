import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const values = { state, dispatch };
  return (
    <StateContext.Provider value={values}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

StateProvider.propTypes = {
  children: PropTypes.instanceOf(Object),
  reducer: PropTypes.instanceOf(Object),
  initialState: PropTypes.instanceOf(Object)
};

StateProvider.defaultProps = {
  children: {},
  reducer: {},
  initialState: {},
};

export default StateProvider;
