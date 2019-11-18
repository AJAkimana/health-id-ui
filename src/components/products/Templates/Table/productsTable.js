import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableRow,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import { columns } from './Colums';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import TableHeader from './TableHeader';
import { ProductInfoPopup } from '../ProductInfoPopup';
import { getSortedData } from '../../filter';

const ProductsTable = React.forwardRef(({
  classes,
  handleHidePopup,
  selected,
  order,
  orderBy,
  handleSelectAllClick,
  handleRequestSort,
  rows,
  x,
  y,
  hoverdItem,
  isSelected,
  handleOnRowHover,
  handleRowSeleted,
  onRowClick
}, ref) => (
  <div className={classes.tableWrapper} ref={ref}>
    <Table
      onMouseLeave={handleHidePopup}
      className={classes.table}
      aria-labelledby="tableTitle"
    >
      <TableHeader
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={rows.length}
        headRows={columns}
      />

      {
        hoverdItem && (
          <ProductInfoPopup
            onForwardButtonClick={onRowClick}
            handleHidePopup={handleHidePopup}
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
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  onMouseEnter={e => handleOnRowHover(e, row)}
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
                        handleRowSeleted(event, row.id);
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
));
ProductsTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleHidePopup: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rows: PropTypes.instanceOf(Object).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hoverdItem: PropTypes.instanceOf(Object).isRequired,
  isSelected: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleOnRowHover: PropTypes.func.isRequired,
  handleRowSeleted: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default ProductsTable;
