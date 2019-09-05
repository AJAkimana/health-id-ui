import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@material-ui/core';
import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export const TableToolBar = (props) => {
  const classes = ToolbarStyles;
  const {
    numSelected,
    handleTextChange,
    title,
    isAdmin,
    isSearchActive,
    handleEdit,
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
          <Typography
            variant="p"
            id="tableTitle"
          >
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
            handleEdit={handleEdit}
            selected={numSelected}
          />
        ) : (
          <CustomToolBar
            isAdmin={isAdmin}
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
  isAdmin: PropTypes.bool.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
};

export default TableToolBar;
