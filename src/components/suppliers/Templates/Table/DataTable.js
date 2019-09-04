import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Paper,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import NoteIcon from '@material-ui/icons/Note';
import { supplyStyles } from '../../../../assets/styles/suppliers/suppliers';
import Rating from '../Rating';
import TableHeader from '../../../stock_control/Table/TableHeader';
import TableToolBar from './TableToolBar';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import { stableSort, getSorting } from '../../../stock_control/utils/utils';

export const DataTable = ({
  classes, columns, data, title, onRowClick, isAdmin
}) => {
  const [setAnchorEl] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [prevSearchValue, setPrevSearchValue] = useState('');
  const [openPopper, setOpenPopper] = useState(false);
  const [order, setOrder] = useState('asc');
  const [rows, setRows] = useState(data);
  const [setHoveredItem] = useState({});
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (_, property) => {
    const isDesc = orderBy === property && order === 'desc';

    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  useEffect(() => {
    setRows(data);
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      setSelected(newSelections);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const handleTextChange = (event) => {
    let searchResults = [];
    const searchText = event.target.value;
    const searchMatch = new RegExp(searchText, 'i');

    if (searchText !== prevSearchValue && searchText.length > 0) {
      setPrevSearchValue(searchText);
      searchResults = data.filter(row => searchMatch.test(row.name) || searchMatch.test(row.sku));
      setRows(searchResults);
    } else {
      setRows(data);
      setPrevSearchValue('');
    }
  };

  const handlePopperClick = (event) => {
    const hoverData = rows.find(value => value.name === event.currentTarget.innerText);

    setAnchorEl(event.currentTarget);
    setHoveredItem(hoverData);
    setOpenPopper(true);
  };

  const handleClickInverseSelection = () => {
    const newSelected = [];

    rows.forEach((row) => {
      if (!selected.find(selectedId => selectedId === row.id)) {
        newSelected.push(row.id);
      }
    });
    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const handleNotes = (notes) => {
    const notesCount = notes.length;
    if (notesCount >= 1) {
      return (<NoteIcon style={supplyStyles.noteStyle} />);
    }
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar
          name="toolbar"
          isAdmin={isAdmin}
          title={`${rows.length} ${title}`}
          numSelected={selected.length}
          handleTextChange={handleTextChange}
          handleClickDeselectAll={() => {
            setSelected([]);
          }}
          isSearchActive={isSearchActive}
          handleHideSearch={() => {
            setIsSearchActive(false);
            setRows(data);
            setPrevSearchValue('');
          }}
          handleClickSearch={() => setIsSearchActive(!isSearchActive)}
          handleClickInverseSelection={() => handleClickInverseSelection()}
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headRows={columns}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  const {
                    id, name, rating, tier, notes
                  } = row;
                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isItemSelected}
                      onClick={() => {
                        onRowClick(id);
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">
                        <span
                          onMouseEnter={(event) => {
                            event.stopPropagation();
                            handlePopperClick(event);
                          }}
                          onMouseLeave={(event) => {
                            event.stopPropagation();
                            setOpenPopper(!openPopper);
                          }}
                          className={classes.name}
                        >
                          {name}
                        </span>
                      </TableCell>
                      <TableCell align="left">{tier}</TableCell>
                      <TableCell align="left"><Rating rating={rating} /></TableCell>
                      <TableCell align="left">
                        {handleNotes(notes)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination for the table */}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Use popper here, and also view detail */}
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.arrayOf(String).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default withStyles(TableStyles)(DataTable);
