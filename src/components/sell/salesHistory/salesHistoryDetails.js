import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';
import { salesHistoryStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import DataTable from './dataTable';

export const SalesHistoryDetails = ({
  state,
  classes,
  handleSalesSearch,
  handleDateTimeFilter,
  createColumns,
  handleSearchFilter,
  handleResetSales,
}) => {
  const { salesData } = state;
  const title = `${salesData.length} TOTAL SALES`;
  const columns = ['date sold', 'location', 'sold by', 'receipt id', 'sold to'];

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.headerGrid}
      >
        <Grid item>
          <Link to="/sell">
            <Tooltip title="Back to products">
              <IconButton>
                <BackIcon className={classes.arrowIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.arrowButtonLabel}>
            Sales History
          </Typography>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <DataTable
          state={state}
          title={title}
          columns={createColumns(columns)}
          handleSalesSearch={handleSalesSearch}
          handleDateTimeFilter={handleDateTimeFilter}
          handleSearchFilter={handleSearchFilter}
          handleResetSales={handleResetSales}
        />
      </Paper>
    </Fragment>
  );
};

SalesHistoryDetails.propTypes = {
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  handleSalesSearch: PropTypes.func.isRequired,
  handleDateTimeFilter: PropTypes.func.isRequired,
  createColumns: PropTypes.func.isRequired,
  handleSearchFilter: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
};

SalesHistoryDetails.defaultProps = {
  state: {},
  classes: {},
};

export default withStyles(salesHistoryStyles)(SalesHistoryDetails);
