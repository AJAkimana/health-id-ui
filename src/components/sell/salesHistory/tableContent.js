import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableRow, TableCell, TableBody
} from '@material-ui/core';
import TableHeader from './tableHeader';

export const TableContent = React.forwardRef(({
  classes,
  columns,
  data,
  page,
  rowsPerPage,
}, ref) => (
  <div ref={ref}>
    <Table className={classes.table} aria-labelledby="tableTitle">
      <TableHeader
        headRows={columns}
      />
      <TableBody>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            const {
              id, dateSold, timeSold, location, soldBy, receiptId, soldTo
            } = row;
            return (
              <TableRow
                role="checkbox"
                tabIndex={-1}
                key={id}
              >
                <TableCell align="left">{`${dateSold} at ${timeSold}`}</TableCell>
                <TableCell align="left">{location}</TableCell>
                <TableCell align="left">{soldBy}</TableCell>
                <TableCell align="left">{receiptId}</TableCell>
                <TableCell align="left">{soldTo}</TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  </div>
));

TableContent.propTypes = {
  classes: PropTypes.instanceOf(Object),
  columns: PropTypes.arrayOf(String),
  data: PropTypes.arrayOf(Object),
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

TableContent.defaultProps = {
  classes: {},
  columns: [],
  data: [],
  page: 0,
  rowsPerPage: 0,
};

export default TableContent;
