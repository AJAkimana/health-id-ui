import React from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel, Checkbox, TableRow, TableHead, TableCell } from '@material-ui/core';

import sortAscendingIcon from '../../../assets/images/stock/sort_ascending_icon.png';
import sortDescendingIcon from '../../../assets/images/stock/sort_descending_icon.png';
import stockControlStyles, { TableHeaderStyles } from '../../../assets/css/stock';

const TableHeader = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headRows
  } = props;

  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };

  const classes = TableHeaderStyles();

  const renderSortIcon = (sortType) => {
    if (sortType === 'asc') {
      return (
        <img
          className="sort_icons"
          src={sortAscendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    if (sortType === 'desc') {
      return (
        <img
          className="sort_icons"
          src={sortDescendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerWrapper} padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onClick={onSelectAllClick}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            className={classes.headerWrapper}
            key={row.id}
            align="left"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
              hideSortIcon
              IconComponent={() => (order === 'desc' || 'asc' ? renderSortIcon(order) : <span />)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headRows: PropTypes.arrayOf(String).isRequired
};

export default TableHeader;
