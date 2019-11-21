/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TablePagination,
} from '@material-ui/core';
import TableToolBar from './TableToolBar';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import DataTableLoader from '../../../dataTable/dataTableLoader';
import { getProductInformationCardPosition } from '../../../utils/screen';
import ProductsTable from './productsTable';

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
      currentPath,
      handleChangeRowsPerPage,
      totalCount,
      handleChangePage,
      pageNumber,
      rowsCount,
      handleSearch,
      loading,
      client,
      session
    } = this.props;
    const {
      selected,
      hoverdItem,
      x,
      y,
      isSearchActive,
      rows,
      order,
    } = this.state;
    const componentRef = React.createRef();
    return (
      <div>
        <Paper className={classes.paper}>
          <TableToolBar
            name="toolbar"
            isAdmin={isAdmin}
            title={`${title}`}
            rows={rows}
            numSelected={selected.length}
            client={client}
            handleSearchTextChange={e => handleSearch(e, client)}
            isSearchActive={isSearchActive}
            handleHideSearch={this.handleHideSearch}
            handleClickSearch={this.handleClickSearch}
            status={status}
            handleViewProposed={handleViewProposed}
            currentPath={currentPath}
            session={session}
            componentRef={componentRef}
          />
          {
            loading ? (<DataTableLoader />)
              : (
                <ProductsTable
                  classes={classes}
                  handleHidePopup={this.handleHidePopup}
                  selected={selected}
                  handleSelectAllClick={this.handleSelectAllClick}
                  rows={rows}
                  columns={columns}
                  order={order}
                  handleOnRowHover={this.handleOnRowHover}
                  handleRowSeleted={this.handleRowSeleted}
                  ref={componentRef}
                  hoverdItem={hoverdItem}
                  isSelected={this.isSelected}
                  onRowClick={onRowClick}
                  x={x}
                  y={y}
                />
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
  client: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object).isRequired,
  currentPath: PropTypes.string.isRequired
};

export default withStyles(TableStyles)(DataTable);
