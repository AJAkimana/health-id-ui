import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Input } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { withStyles } from '@material-ui/core/styles';
import { tableQuantityStyles } from '../../assets/css/sellScreenStyles';

const styles = tableQuantityStyles;

export const ReturnQuantity = ({
  item,
  handleQuantityButtons,
  handleQuantityOnChange,
  classes,
}) => {
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <div className={classes.iconsCell}>
      <Input
        name="quantity"
        value={item.quantity}
        className={classes.paperInput}
        onChange={event => handleQuantityOnChange(event, item)}
        disableUnderline
      />
      <Paper
        className={classes.paperIcon}
        elevation={0}
      >
        <Grid container className={classes.iconsGrid}>
          <Icon
            className={clsx(classes.icon, 'fas fa-caret-up')}
            onClick={() => handleQuantityButtons(item, 'add')}
          />
          <Icon
            className={clsx(classes.icon, 'fas fa-caret-down')}
            onClick={() => handleQuantityButtons(item, 'remove')}
          />
        </Grid>
      </Paper>
    </div>
  );
};

ReturnQuantity.propTypes = {
  item: PropTypes.instanceOf(Object),
  handleQuantityButtons: PropTypes.func.isRequired,
  handleQuantityOnChange: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object)
};

ReturnQuantity.defaultProps = {
  item: {},
  classes: {},
};

export default withStyles(styles)(ReturnQuantity);
