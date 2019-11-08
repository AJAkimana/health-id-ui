import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Popper, Paper, Grow, ClickAwayListener, Tooltip, IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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

export const CustomIconButton = withStyles(ToolbarStyles)(
  ({
    toolTip, buttonRef, onClickHandler, children, classes
  }) => (
    <Tooltip title={toolTip} style={{ marginRight: '25px' }}>
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
  )
);

CustomIconButton.propTypes = {
  toolTip: PropTypes.string,
  children: PropTypes.element,
  buttonRef: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func
};

CustomIconButton.defaultProps = {
  toolTip: 'class',
  children: <span />,
  onClickHandler: () => {}
};

export const RenderPopper = withStyles(ToolbarStyles)(
  ({
    anchorEl, onClickAway, open, children, classes, className, popperPlacement
  }) => (
    <Popper
      className={clsx(classes.popper, className && className)}
      open={open}
      placement={popperPlacement}
      anchorEl={anchorEl}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
);

RenderPopper.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  onClickAway: PropTypes.func,
  children: PropTypes.element,
  popperPlacement: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired
};

RenderPopper.defaultProps = {
  onClickAway: () => null,
  anchorEl: <span />,
  popperPlacement: 'bottom',
  children: <span />,
  className: 'class'
};
