import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableRow, TableCell, TableBody
} from '@material-ui/core';
import TableHeader from './TableHeader';

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
              id, productName, category, loyaltyWeight, manufacturer, measurementUnit
            } = row;
            return (
              <TableRow
                role="checkbox"
                tabIndex={-1}
                key={id}
              >
                <TableCell align="left">{productName}</TableCell>
                <TableCell align="left">{category}</TableCell>
                <TableCell align="left">{manufacturer}</TableCell>
                <TableCell align="left">{measurementUnit}</TableCell>
                <TableCell align="left">{loyaltyWeight}</TableCell>
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
