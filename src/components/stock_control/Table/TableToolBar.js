import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@material-ui/core';

import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../assets/css/stock';

export const TableToolBar = (props) => {
  const classes = ToolbarStyles;
  const {
    numSelected,
    handleTextChange,
    title,
    isSearchActive,
    handleHideSearch,
    handleClickSearch,
    handleClickInverseSelection,
    handleClickDeselectAll
  } = props;

  return (
    <Toolbar
      className={clsx(classes.selection, {
        'tool-bar-elevation': numSelected > 0
      })}
    >
      <div style={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {`${numSelected} row(s) selected`}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div style={classes.spacer} />
      <div style={classes.actions}>
        {numSelected > 0 ? (
          <SelectionToolBar
            handleClickInverseSelection={handleClickInverseSelection}
            handleClickDeselectAll={handleClickDeselectAll}
            selected={numSelected}
          />
        ) : (
          <CustomToolBar
            handleClickSearch={handleClickSearch}
            isSearchActive={isSearchActive}
            handleHideSearch={handleHideSearch}
            handleTextChange={handleTextChange}
          />
        )}
      </div>
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
};

export default TableToolBar;
