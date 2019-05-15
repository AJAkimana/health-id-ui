import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ContentWrapper, OutletsTable } from '../../assets/css/setup';

const OutletList = ({
  state,
  handleAddNewOutletButton,
  toggleRegisterDisplay,
  handleOutletEdit,
  handleOutletDelete,
}) => {
  const {
    outletSet,
    registerHidden,
    clickedOutlet,
  } = state;

  return (
    <React.Fragment>
      <form>
        <Grid container spacing={24} justify="center" style={ContentWrapper.wrapper}>
          <Grid item xs={12} container style={ContentWrapper.wrapper}>
            <Grid item xs={3}>
              <Typography variant="h6" style={ContentWrapper.bold}>
                ADDED OUTLETS
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={ContentWrapper.addRegisterStyle}
              container
              direction="row"
              alignItems="center"
              onClick={handleAddNewOutletButton}
            >
              <Grid item>
                <AddIcon />
              </Grid>
              <Grid item>
                <Typography style={ContentWrapper.underline}>
                  Add New Outlet
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={ContentWrapper.table}>
            <Grid item>
              <Table style={OutletsTable.table}>
                <TableBody>
                  {outletSet.map(item => (
                    <>
                      <TableRow
                        id="outlets-table-row"
                        key={item.id}
                        style={OutletsTable.row}
                      >
                        <TableCell component="th" scope="row" style={OutletsTable.tableCell}>
                          <Typography variant="subtitle2" style={OutletsTable.typoNormal} id={item.id} onClick={toggleRegisterDisplay}>
                            {item.name}
                            {','}
                            {item.city.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" style={OutletsTable.tableCell}>
                          <Typography variant="subtitle2" style={OutletsTable.capitalize}>
                            {item.kind.name}
                            {<br />}
                          </Typography>
                          <Typography style={OutletsTable.typoSmall}>
                            {item.registerSet.length ? item.registerSet.length : ''}
                            {' '}
                            {item.registerSet.length ? 'Registers' : ''}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" style={OutletsTable.tableCell}>
                          <div style={OutletsTable.iconsCell}>
                            <Paper
                              id="paper-edit"
                              style={OutletsTable.paperEdit}
                              onClick={() => handleOutletEdit(item)}
                            >
                              <EditIcon style={OutletsTable.icons} />
                            </Paper>
                            <Paper
                              id="paper-delete"
                              style={OutletsTable.paperDelete}
                              onClick={() => handleOutletDelete(item)}
                            >
                              <DeleteIcon style={OutletsTable.icons} />
                            </Paper>
                          </div>
                        </TableCell>
                      </TableRow>
                      {item.registerSet
                      && !registerHidden
                      && (item.id === clickedOutlet)
                      && item.registerSet.map(register => (
                        <TableRow key={item.id} id={item.id} display="none">
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2">
                              {register.name}
                              {' '}
                              {'('}
                              {register.id}
                              {')'}
                            </Typography>
                          </TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

OutletList.propTypes = {
  handleAddNewOutletButton: PropTypes.func.isRequired,
  toggleRegisterDisplay: PropTypes.func.isRequired,
  handleOutletEdit: PropTypes.func.isRequired,
  handleOutletDelete: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default OutletList;
