import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton, Typography,
  ListItemText, Divider, ListItem, List
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { ApproveStockIcon } from '../../assets/images/stock/StockIcons';
import { ProposedProductStyles } from '../../assets/styles/stock/stock';

export const ProposedProducts = ({ classes, handleClick }) => {
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          disableTypography
          primary="Amoxicillin"
          secondary={(
            <Fragment>
              <div> ID044</div>
              <div component="div" variant="body2" className={classes.inline} color="textPrimary">
                Quantity change from 30 to
                {' '}
                <b>69</b>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ApproveStockIcon />
                  </IconButton>
                </div>
              </div>
              <div>Changed by: Sophia</div>
            </Fragment>
          )}
        />
      </ListItem>
      <Divider variant="inset" className={classes.divider} component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          disableTypography
          primary="Panadol"
          secondary={(
            <Fragment>
              <div> ID064</div>
              <Typography
                component="div"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Quantity change from 100 to
                {' '}
                <b>93</b>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ApproveStockIcon />
                  </IconButton>
                </div>
              </Typography>
              <div>Changed by: Joseph</div>
            </Fragment>
          )}
        />
      </ListItem>
      <Divider variant="inset" className={classes.divider} component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          disableTypography
          primary="Polio vaccine"
          secondary={(
            <Fragment>
              <div> ID0654</div>
              <Typography
                component="div"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Quantity change from 9 to
                {' '}
                <b>63</b>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ClearIcon />
                  </IconButton>
                </div>
                <div className={classes.iconWrapper}>
                  <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                    <ApproveStockIcon />
                  </IconButton>
                </div>
              </Typography>
              <div>Changed by: Stanley</div>
            </Fragment>
          )}
        />
      </ListItem>
    </List>
  );
};

ProposedProducts.propTypes = {
  classes: PropTypes.objectOf(Object).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default withStyles(ProposedProductStyles)(ProposedProducts);
