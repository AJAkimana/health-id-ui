import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@material-ui/core';
import CustomToolBar from './CustomToolBar';
import SelectionToolBar from './SelectionToolBar';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';

export class TableToolBar extends Component {
  state = {
    selected: [],
    hoverdItem: undefined,
    x: 0,
    y: 0,
    isSearchActive: false,
    data: [],
    rows: [],
    isSearching: false,
    order: 'asc',
    orderBy: 'name',
  };

  isSelected = (name) => {
    const { selected } = this.state;
    return selected.indexOf(name) !== -1;
  };

  render() {
    const classes = ToolbarStyles;
    const {
      numSelected,
      handleSearchTextChange,
      title,
      isAdmin,
      isSearchActive,
      handleEdit,
      rows,
      componentRef,
      handleHideSearch,
      handleClickSearch,
      handleClickInverseSelection,
      handleClickDeselectAll,
      handleViewProposed,
      status,
      client,
    } = this.props;

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
            <CustomToolBar
              name="toolbar"
              isAdmin={isAdmin}
              title={`${title}`}
              rows={rows}
              handleClickSearch={handleClickSearch}
              client={client}
              isSearchActive={isSearchActive}
              handleHideSearch={handleHideSearch}
              handleSearchTextChange={handleSearchTextChange}
              handleViewProposed={handleViewProposed}
              status={status}
              componentRef={componentRef}
            />
          )}
        </div>
      </Toolbar>
    );
  }
}

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleSearchTextChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  rows: PropTypes.instanceOf(Object).isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func,
  handleHideSearch: PropTypes.func.isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  client: PropTypes.instanceOf(Object).isRequired,
  componentRef: PropTypes.instanceOf(Object).isRequired

};

TableToolBar.defaultProps = {
  handleEdit: () => {}
};

export default TableToolBar;
