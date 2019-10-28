import gridReducer from './reducers/grid';

const mainReducer = ({ grid }, action) => ({
  grid: gridReducer(grid, action),
});

export default mainReducer;
