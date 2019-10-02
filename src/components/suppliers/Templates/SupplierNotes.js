import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { tableStyles } from '../../../assets/styles/suppliers/supplierDetail';

const SupplierNotes = (props) => {
  const {
    classes, renderTableCell, notes
  } = props;

  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Supplier Notes
        </Typography>
      </div>
      <Grid container spacing={24} className={classes.tableGrid}>
        {
          (notes && notes.length > 0) ? (
            <Grid item xs={12} style={tableStyles.noteHeader}>
              <Table>
                <TableHead>
                  <TableRow style={tableStyles.noteRow}>
                    {renderTableCell('left', tableStyles.tableHeader, 'Created On')}
                    {renderTableCell('left', tableStyles.tableHeader, 'Message')}
                    {renderTableCell('left', tableStyles.tableHeader, 'Created By')}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notes && notes.map(note => (
                    <TableRow
                      id="supplier-table-row"
                      key={note.id}
                      style={tableStyles.noteRow}
                    >
                      <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                        {note.createdAt}
                      </TableCell>
                      <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                        {note.note}
                      </TableCell>
                      <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                        {note.supplier.user.firstName}
                        ,
                        {' '}
                        {note.supplier.user.lastName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          ) : 'No note yet'
        }
      </Grid>
    </Fragment>
  );
};

SupplierNotes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  renderTableCell: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func
  })).isRequired,
};

export default SupplierNotes;
