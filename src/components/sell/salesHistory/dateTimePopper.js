import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Grow, Paper, Popper,
  Button, Typography, Fab
} from '@material-ui/core';
import { DateRangePicker } from 'react-date-range';
import TimeRangeSlider from 'react-time-range-slider';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../../assets/styles/salesHistory/dateTimePopper.css';
import { dateTimeStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';

const DateTimePopper = ({
  state,
  classes,
  handleClose,
  handleRangeChange,
  timeChangeHandler,
  handleSliderButtons,
  handleDateTimeDoneButton,
}) => {
  const {
    open,
    dateTimeAnchorEl,
    dateRangePicker: {
      selection,
    },
    timeValue,
  } = state;
  const start = '00:00';
  const end = '23:59';
  return (
    <Fragment>
      <Popper
        open={open}
        anchorEl={dateTimeAnchorEl}
        className={classes.popper}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.paper}>
              <DateRangePicker
                months={2}
                ranges={[selection]}
                onChange={handleRangeChange.bind(this, 'dateRangePicker')}
                className="PreviewArea"
                direction="horizontal"
              />
              <Grid container className={classes.timeGrid}>
                <Grid item xs={2}>
                  <Typography className={classes.timeTypo}>Time Range</Typography>
                </Grid>
                <Grid item container xs={10} className={classes.innerSlider}>
                  <Grid item xs={1}>
                    <Fab
                      id="slider-button-start"
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="Add"
                      style={dateTimeStyles.sliderFabStart}
                      onClick={() => handleSliderButtons(start)}
                    >
                      {timeValue.start}
                    </Fab>
                  </Grid>
                  <Grid item xs={10} className={classes.timeSlider}>
                    <TimeRangeSlider
                      disabled={false}
                      format={24}
                      maxValue="23:59"
                      minValue="00:00"
                      name="time_range"
                      onChange={timeChangeHandler}
                      step={30}
                      value={timeValue}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Fab
                      id="slider-button-end"
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="Add"
                      className={classes.sliderFabEnd}
                      style={dateTimeStyles.sliderFabEnd}
                      onClick={() => handleSliderButtons(end)}
                    >
                      {timeValue.end}
                    </Fab>
                  </Grid>
                </Grid>
                <Grid item container xs={12} style={dateTimeStyles.buttonsGrid}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    style={dateTimeStyles.mainButtons}
                    onClick={() => handleClose('calenderPopperOpen')}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={dateTimeStyles.mainButtons}
                    onClick={() => handleDateTimeDoneButton(selection, timeValue)}
                  >
                    done
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

DateTimePopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  handleClose: PropTypes.func.isRequired,
  handleDateTimeDoneButton: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  timeChangeHandler: PropTypes.func.isRequired,
  handleSliderButtons: PropTypes.func.isRequired,
};

DateTimePopper.defaultProps = {
  state: {},
  classes: {},
};

export default DateTimePopper;
