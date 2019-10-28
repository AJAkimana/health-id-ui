import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, Popper, Fade, ClickAwayListener,
  List,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { addCustomerPopper } from '../../assets/css/sellScreenStyles';

const styles = addCustomerPopper;

export const AddCustomerPopper = ({
  state: {
    openCustomerPopper,
    customerAnchorEl,
    placement,
    filteredCustomers,
    firstName
  },
  handleAddNewCustomer,
  renderSingleCustomer,
  handleCustomerPopperClickAway,
}) => (
  <Popper
    open={openCustomerPopper}
    anchorEl={customerAnchorEl}
    placement={placement}
    transition
  >
    {({ TransitionProps }) => (
      <ClickAwayListener onClickAway={handleCustomerPopperClickAway}>
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            style={addCustomerPopper.rootPaper}
          >
            {filteredCustomers.length !== 0 && (
              <Grid container>
                <Grid item xs={12} style={addCustomerPopper.zeroBottomPadding}>
                  <List style={addCustomerPopper.listedCustomers}>
                    {filteredCustomers.map(customer => (
                      renderSingleCustomer(customer)
                    ))}
                  </List>
                </Grid>
              </Grid>
            )}
            <Grid container style={addCustomerPopper.typoWrapper}>
              <AddCircle style={addCustomerPopper.addCircleIcon} />
              <Typography
                variant="subtitle2"
                onClick={handleAddNewCustomer}
                style={addCustomerPopper.typo}
              >
                  Add &apos;
                {firstName}
                  &apos; as a new customer
              </Typography>
            </Grid>
          </Paper>
        </Fade>
      </ClickAwayListener>
    )}
  </Popper>
);

AddCustomerPopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleCustomerPopperClickAway: PropTypes.func.isRequired,
  handleAddNewCustomer: PropTypes.func.isRequired,
  renderSingleCustomer: PropTypes.func.isRequired,
};

AddCustomerPopper.defaultProps = {
  state: {}
};

export default withStyles(styles)(AddCustomerPopper);
