import React from 'react';
import PropTypes from 'prop-types';
import {
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';

export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const stableSort = (array, cmp) => {
  const sortedProducts = array.map((element, index) => [element, index]);
  sortedProducts.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return sortedProducts.map(element => element[0]);
};

export const getSorting = (order, orderBy) => (order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

export const CustomIconButton = ({
  toolTip, buttonRef, onClickHandler, children
}) => {
  const classes = makeStyles(ToolbarStyles)();
  return (
    <Tooltip title={toolTip}>
      <IconButton
        className={classes.IconButton}
        buttonRef={buttonRef}
        aria-owns="menu-list-grow"
        aria-haspopup="true"
        onClick={onClickHandler}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

CustomIconButton.propTypes = {
  toolTip: PropTypes.string,
  children: PropTypes.element,
  buttonRef: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func
};

CustomIconButton.defaultProps = {
  toolTip: 'class',
  children: <span />,
  onClickHandler: () => { }
};

export const RenderPopper = ({ anchorEl, onClickAway, open, children }) => {
  const classes = makeStyles(ToolbarStyles)();

  return (
    <Popper
      className={classes.popper}
      open={open}
      anchorEl={anchorEl}
      transition
      disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClickAway}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

RenderPopper.propTypes = {
  anchorEl: PropTypes.element,
  onClickAway: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
