import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ToolBarStyles } from '../../assets/css/products';
import Icon from './productIcons';

export class ToolBar extends Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="Add product">
          <IconButton
            className={classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Popper className={classes.popper} open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>Add Individual Product</MenuItem>
                    <MenuItem onClick={this.handleClose}>Import Product List</MenuItem>
                    <MenuItem onClick={this.handleClose}>View Proposed Products</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Manage Expirers">
          <IconButton>
            <Icon id="expiry_icon" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Export List">
          <IconButton>
            <Icon
              id="export"
              className={classes.exportSVG}
            />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

ToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(ToolBarStyles)(ToolBar);
