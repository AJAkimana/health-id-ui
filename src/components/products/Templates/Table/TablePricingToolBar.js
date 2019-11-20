import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@material-ui/core';
import CustomPricingToolBar from './CustomPricingToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export const TablePricingToolBar = (props) => {
  const classes = ToolbarStyles;
  const {
    numSelected,
    handleSearchTextChange,
    title,
    isSearchActive,
    handleEdit,
    handleHideSearch,
    handleClickSearch,
    handleClickInverseSelection,
    handleClickDeselectAll,
    handleViewProposed,
    status,
    client,
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
          <Typography variant="body1" id="tableTitle">
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
          <CustomPricingToolBar
            handleClickSearch={handleClickSearch}
            client={client}
            isSearchActive={isSearchActive}
            handleHideSearch={handleHideSearch}
            handleSearchTextChange={handleSearchTextChange}
            handleViewProposed={handleViewProposed}
            status={status}
          />
        )}
      </div>
    </Toolbar>
  );
};

TablePricingToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleSearchTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  client: PropTypes.instanceOf(Object).isRequired
};

TablePricingToolBar.defaultProps = {
  handleEdit: () => {}
};

export default TablePricingToolBar;
