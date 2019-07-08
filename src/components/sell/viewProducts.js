import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, IconButton, Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import viewProductsStyles from '../../assets/css/viewProductsStyles';
import { HistoryIcon } from '../../assets/SvgIcons/sellScreenSvgs';

const styles = viewProductsStyles;
export const ViewProducts = ({
  state,
  classes,
  renderSearchBar,
  switchComponentRendering,
}) => {
  const { searchValue } = state;
  return (
    <Fragment>
      <Grid container item xs={12} className={classes.iconNavWrapper}>
        <Tooltip title="Sales history">
          <IconButton color="secondary" aria-label="Add an alarm">
            <HistoryIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify="space-evenly">
            <Grid item xs={12} className={classes.search}>
              {renderSearchBar(classes, searchValue)}
            </Grid>
            {switchComponentRendering(classes)}
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

ViewProducts.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  renderSearchBar: PropTypes.func.isRequired,
  switchComponentRendering: PropTypes.func.isRequired,
};

export default withStyles(styles)(ViewProducts);