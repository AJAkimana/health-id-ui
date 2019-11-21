import gridReducer from './reducers/grid';
const mainReducer = (state, action) => ({
  grid: gridReducer(state.grid, action),
});

export default mainReducer;
