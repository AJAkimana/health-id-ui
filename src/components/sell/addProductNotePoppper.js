import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  Button, ClickAwayListener
} from '@material-ui/core';
import { addDiscountPopper } from '../../assets/css/sellScreenStyles';

const styles = addDiscountPopper;

const AddProductNotePopper = ({
  state: {
    openNotePopper,
    productNoteAnchorEl,
    placement,
    cartItemNoteValue,
  },
  handleChange,
  handleNotePopperClickAway,
  handleNoteAddButton,
  handleNoteBackButton
}) => (
  <Popper
    open={openNotePopper}
    anchorEl={productNoteAnchorEl}
    placement={placement}
    transition
  >
    {({ TransitionProps }) => (
      <ClickAwayListener onClickAway={handleNotePopperClickAway}>
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            style={addDiscountPopper.paper}
          >
            <Grid container style={addDiscountPopper.rootGrid}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Cart item note
                </Typography>
                <Divider />
              </Grid>
              <Grid container item xs={12}>
                <TextField
                  id="outlined-name"
                  name="cartItemNoteValue"
                  label="Add a note"
                  fullWidth
                  autoFocus
                  value={cartItemNoteValue}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} align="right">
                  <Button
                    onClick={handleNoteBackButton}
                    style={addDiscountPopper.backButton}
                    color="secondary"
                    variant="contained"
                    id="back-button"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={addDiscountPopper.cartAddButton}
                    onClick={() => handleNoteAddButton(productNoteAnchorEl.id)}
                  >
                    ADD
                  </Button>
                </Grid>
                <Typography inline variant="caption" style={addDiscountPopper.noteTypo}>
                  This note will be attached to this sold item
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </ClickAwayListener>
    )}
  </Popper>
);

AddProductNotePopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  handleNotePopperClickAway: PropTypes.func.isRequired,
  handleNoteBackButton: PropTypes.func.isRequired,
  handleNoteAddButton: PropTypes.func.isRequired,
};

AddProductNotePopper.defaultProps = {
  state: {}
};

export default withStyles(styles)(AddProductNotePopper);
