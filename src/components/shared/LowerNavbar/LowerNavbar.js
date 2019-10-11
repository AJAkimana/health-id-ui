import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { lowerNavbarStyles } from '../../../assets/styles/suppliers/suppliers';

export class LowerNavbar extends Component {
  constructor({ activeGrid, menu }) {
    super(activeGrid, menu);
    this.state = {
      menu,
      activeGrid
    };
  }

  handleOnClick = (grid) => {
    this.setState(prevState => ({
      ...prevState,
      activeGrid: grid,
    }));
  };

  lowerNavbar = (activeGrid) => {
    const { menu } = this.state;
    const switchGrid = (id, label, link, index) => (
      <Grid
        key={index}
        item
        xs={1}
        style={id === activeGrid ? lowerNavbarStyles.itemActive : lowerNavbarStyles.items}
      >
        <Link to={link} style={{ textDecoration: 'none' }} id={id} onClick={() => this.handleOnClick(id)}>
          <Typography variant="inherit" style={lowerNavbarStyles.typographyText}>
            {label}
          </Typography>
        </Link>
      </Grid>
    );
    return (
      <Grid container style={lowerNavbarStyles.gridContainer}>
        { menu.map((item, index) => (
          switchGrid(item.grid, item.label, item.url, index)
        ))
        }
      </Grid>
    );
  };

  render() {
    const { activeGrid } = this.state;
    return <div>{this.lowerNavbar(activeGrid)}</div>;
  }
}
LowerNavbar.propTypes = {
  activeGrid: PropTypes.string,
  menu: PropTypes.instanceOf(Array),
};
LowerNavbar.defaultProps = {
  activeGrid: '',
  menu: [],
};
export default LowerNavbar;
