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
      isNavbarHidden: true
    };
  default:
    return grid;
  }
};

export default gridReducer;
