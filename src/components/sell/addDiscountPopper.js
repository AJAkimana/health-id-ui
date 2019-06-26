import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  InputAdornment, Button, ClickAwayListener
} from '@material-ui/core';
import { addDiscountPopper } from '../../assets/css/sellScreenStyles';

const styles = addDiscountPopper;

const AddDiscountPopper = ({
  state: {
    openDicountPopper,
    discountAnchorEl,
    placement,
    discountValue,
  },
  handleChange,
  handleDiscountPopperClickAway,
  handleDiscountButton
}) => (
  <Popper
    open={openDicountPopper}
    anchorEl={discountAnchorEl}
    placement={placement}
    transition
    modifiers={{
      offset: {
        enabled: true,
        offset: '-90px, 62px',
      },
      flip: {
        enabled: true,
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: 'scrollParent',
      }
    }}
  >
    {({ TransitionProps }) => (
      <ClickAwayListener onClickAway={handleDiscountPopperClickAway}>
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            style={addDiscountPopper.paper}
          >
            <Grid container style={addDiscountPopper.gridWrapper}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Add Discount
                </Typography>
                <Divider />
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-name"
                    name="discountValue"
                    label="Add Percentage"
                    style={addDiscountPopper.textField}
                    value={discountValue}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4} style={addDiscountPopper.addDiscountButtonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={addDiscountPopper.addDiscountButton}
                    onClick={handleDiscountButton}
                  >
                    <Typography inline variant="h6">
                      ADD
                    </Typography>
                  </Button>
                </Grid>
                <Typography inline variant="caption" style={addDiscountPopper.typo}>
                  This discount is applied to the Total Sale
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </ClickAwayListener>
    )}
  </Popper>
);

AddDiscountPopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  handleDiscountPopperClickAway: PropTypes.func.isRequired,
  handleDiscountButton: PropTypes.func.isRequired,
};

AddDiscountPopper.defaultProps = {
  state: {}
};

export default withStyles(styles)(AddDiscountPopper);
