/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
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
import TableToolBar from './TableToolBar';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import DataTableLoader from '../../../dataTable/dataTableLoader';
import TableHeader from './TableHeader';
import { ProductInfoPopup } from '../ProductInfoPopup';
import { getProductInformationCardPosition } from '../../../utils/screen';
import { getSortedData } from '../../filter';

export class DataTable extends Component {
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
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isSearching) {
      return null;
    }
    return { data: props.data, rows: props.data };
  }

  isSelected = (name) => {
    const { selected } = this.state;
    return selected.indexOf(name) !== -1;
  };

  handleRowSeleted = (_, id) => {
    const { selected } = this.state;
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
    this.setState({ selected: newSelected });
  };

  handleHideSearch = () => {
    this.setState({ isSearchActive: false });
  }

  handleOnRowHover = (e, row) => {
    const { x, y } = getProductInformationCardPosition(e);
    this.setState({ hoverdItem: row, x, y });
  }

  handleHidePopup = () => {
    this.setState({ hoverdItem: undefined });
  }

  handleClickSearch = () => {
    const { isSearchActive } = this.state;
    this.setState({ isSearchActive: !isSearchActive });
  }

  handleRequestSort = (_, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: property });
  };

  handleSelectAllClick = (event) => {
    const { rows } = this.state;
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      this.setState({ selected: newSelections });
      return;
    }
    this.setState({ selected: [] });
  };


  render() {
    const {
      classes,
      columns,
      title,
      onRowClick,
      isAdmin,
      status,
      handleViewProposed,
      handleChangeRowsPerPage,
      totalCount,
      handleChangePage,
      pageNumber,
      rowsCount,
      handleSearch,
      loading,
      client,
    } = this.props;
    const {
      selected,
      hoverdItem,
      x,
      y,
      isSearchActive,
      rows,
      order,
      orderBy,
    } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <TableToolBar
            name="toolbar"
            isAdmin={isAdmin}
            title={`${title}`}
            numSelected={selected.length}
            client={client}
            handleSearchTextChange={e => handleSearch(e, client)}
            isSearchActive={isSearchActive}
            handleHideSearch={this.handleHideSearch}
            handleClickSearch={this.handleClickSearch}
            status={status}
            handleViewProposed={handleViewProposed}
          />
          {
            loading ? (<DataTableLoader />)
              : (
                <div className={classes.tableWrapper}>
                  <Table
                    onMouseLeave={this.handleHidePopup}
                    className={classes.table}
                    aria-labelledby="tableTitle"
                  >
                    <TableHeader
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={rows.length}
                      headRows={columns}
                    />
                    {
                      hoverdItem && (
                        <ProductInfoPopup
                          onForwardButtonClick={onRowClick}
                          handleHidePopup={this.handleHidePopup}
                          position={{ x, y }}
                          row={hoverdItem}
                          classes={classes}
                        />
                      )
                    }
                    <TableBody>
                      {rows.length > 0
                        ? getSortedData(rows, order, orderBy)
                          .map((row) => {
                            const isItemSelected = this.isSelected(row.id);
                            return (
                              <TableRow
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                onMouseEnter={e => this.handleOnRowHover(e, row)}
                                key={row.id}
                                style={TableStyles.tableRow}
                                selected={isItemSelected}
                                onClick={() => {
                                  onRowClick(row.id);
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      this.handleRowSeleted(event, row.id);
                                    }}
                                  />
                                </TableCell>
                                {
                                  columns.map(col => (col.options.display !== false && (<TableCell align="left">{row[col.name]}</TableCell>)))
                                }

                              </TableRow>
                            );
                          }) : (<TableRow><TableCell align="center" colSpan={14}>No Products</TableCell></TableRow>)
                      }
                    </TableBody>
                  </Table>
                </div>

              )
          }

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsCount}
            page={pageNumber - 1}
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
      </div>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.arrayOf(String).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  rowsCount: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  client: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(TableStyles)(DataTable);
