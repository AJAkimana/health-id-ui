import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { TextField, Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { searchStyles } from '../../../assets/styles/stock/stock';

export class TableSearch extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    const { onHide } = this.props;

    if (event.keyCode === 27) {
      onHide();
    }
  };

  render() {
    const { classes, onHide, handleTextChange } = this.props;

    return (
      <Grow appear in timeout={300}>
        <div className={classes.main}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            id="search-field"
            className={classes.searchText}
            autoFocus
            onChange={handleTextChange}
            fullWidth
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

TableSearch.propTypes = {
  classes: PropTypes.objectOf(Object).isRequired,
  onHide: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired
};

export default withStyles(searchStyles)(TableSearch);
