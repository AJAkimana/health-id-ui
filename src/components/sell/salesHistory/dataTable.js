import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from '@material-ui/core';
import { format } from 'date-fns';
import SalesHistoryToolBar from './salesHistoryToolBar';
import TableContent from './tableContent';

export const DataTable = ({
  state, title, columns, handleSalesSearch, handleDateTimeFilter,
  handleSearchFilter, handleResetSales,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const data = state.salesData.map(({
    id, dateSold, timeSold, location, soldBy, receiptId, soldTo
  }) => (
    {
      id,
      dateSold: format(dateSold, 'dd/MM/yyyy'),
      timeSold,
      location,
      soldBy,
      receiptId,
      soldTo
    }
  ));

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const componentRef = React.createRef();

  return (
    <>
      <SalesHistoryToolBar
        title={title}
        rows={data}
        handleSalesSearch={handleSalesSearch}
        handleDateTimeFilter={handleDateTimeFilter}
        handleSearchFilter={handleSearchFilter}
        handleResetSales={handleResetSales}
        componentRef={componentRef}
      />
      <TableContent
        ref={componentRef}
        columns={columns}
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 200]}
        component="div"
        count={data.length}
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
    </>
  );
};

DataTable.propTypes = {
  state: PropTypes.instanceOf(Object),
  columns: PropTypes.arrayOf(String),
  title: PropTypes.string.isRequired,
  handleSalesSearch: PropTypes.func.isRequired,
  handleDateTimeFilter: PropTypes.func.isRequired,
  handleSearchFilter: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
  state: {},
  columns: [],
};

export default DataTable;
