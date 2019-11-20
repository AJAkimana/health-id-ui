const gridReducer = (grid, action) => {
  switch (action.type) {
    case 'changeGrid':
      return {
        ...grid,
        isActive: action.grid
      };
    case 'hideNavbar':
      return {
        ...grid,
        isNavbarHidden: action.payload
      };
    default:
      return grid;
  }
};

export default gridReducer;
