import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import {
  Grid, Grow, Paper, Popper, IconButton, Typography,
} from '@material-ui/core';
import print from '../../../assets/images/sellScreen/print.png';
import save from '../../../assets/images/sellScreen/save.png';

const SavePrintPopper = (props) => {
  const {
    state,
    classes,
    componentRef,
    handlePrintButton,
    handleSaveButton,
  } = props;
  const {
    savePrintOpen,
    savePrintAnchorEl
  } = state;

  return (
    <Fragment>
      <Popper
        open={savePrintOpen}
        anchorEl={savePrintAnchorEl}
        className={classes.popper}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.savePrintPaper}>
              <Grid container justify="center">
                <Grid item container justify="space-evenly">
                  <Grid item xs={6} style={{ flexBasis: 0 }}>
                    <ReactToPrint
                      trigger={() => (
                        <IconButton>
                          <img src={print} alt="" className={classes.printButton} />
                        </IconButton>
                      )}
                      content={() => componentRef.current}
                      onBeforePrint={handlePrintButton}
                    />
                    <Typography variant="h6" className={classes.savePrintTypo}>Print</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      className={classes.saveButton}
                      onClick={() => handleSaveButton(componentRef.current)}
                    >
                      <img src={save} alt="" className={classes.saveButtonImg} />
                    </IconButton>
                    <Typography variant="h6" className={classes.savePrintTypo}>Save to computer</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

SavePrintPopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  componentRef: PropTypes.instanceOf(Object),
  handlePrintButton: PropTypes.func.isRequired,
  handleSaveButton: PropTypes.func.isRequired,
};

SavePrintPopper.defaultProps = {
  state: {},
  classes: {},
  componentRef: {},
};

export default SavePrintPopper;
