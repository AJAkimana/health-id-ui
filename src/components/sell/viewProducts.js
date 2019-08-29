import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid, Paper, IconButton, Tooltip, AppBar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import viewProductsStyles from '../../assets/css/viewProductsStyles';
import { HistoryIcon } from '../../assets/SvgIcons/sellScreenSvgs';

const styles = viewProductsStyles;
export const ViewProducts = ({ state, renderSearchBar, switchComponentRendering }) => {
  const { searchValue } = state;
  return (
    <Fragment>
      <Grid container item xs={12} style={styles.iconNavWrapper}>
        <Link to="/sell/history">
          <Tooltip title="Sales history">
            <IconButton>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Grid>
      <Grid container item xs={12}>
        <Paper style={styles.paper}>
          <AppBar position="sticky" color="default" style={styles.search}>
            {renderSearchBar(searchValue)}
          </AppBar>
          {switchComponentRendering()}
        </Paper>
      </Grid>
    </Fragment>
  );
};

ViewProducts.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  renderSearchBar: PropTypes.func.isRequired,
  switchComponentRendering: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(ViewProducts));
