/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ToolBarStyles } from '../../assets/styles/products/products';
import Icon from '../products/productIcons';

export class ToolBar extends Component {
  state = {
    open: false,
    openView: false,
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleView = () => {
    const { openView } = this.state;
    this.setState({ openView: !openView });
  };

  handleClose = () => {
    this.setState({ open: false, openView: false });
  };

  handleChangeView = () => {
    const { handleViewOrders } = this.props;
    const statusObject = {
      open: document.querySelector('#open').checked,
      closed: document.querySelector('#closed').checked
    };
    handleViewOrders(statusObject);
  };

  render() {
    const { classes, status } = this.props;
    const { open, openView } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="Switch table view">
          <IconButton
            className={openView ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleView}
          >
            <Icon id="eye" />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openView}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <FormGroup className={classes.switchFormGroup}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={status === 'open' || status === 'all'}
                          onChange={this.handleChangeView}
                          id="open"
                          value="open"
                          color="primary"
                        />
                      )}
                      label="View Open Orders"
                    />
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={status === 'closed' || status === 'all'}
                          onChange={this.handleChangeView}
                          id="closed"
                          value="closed"
                          color="primary"
                        />
                      )}
                      label="View Closed Orders"
                    />
                  </FormGroup>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Add product">
          <IconButton
            className={open ? classes.iconButtonActive : classes.iconButton}
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
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>
                      Initiate New Order
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      View Supplier Order Forms
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Stock Control">
          <IconButton
            className={classes.iconButton}
          >
            <Icon id="warehouse" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Export List">
          <IconButton
            className={classes.iconButton}
          >
            <Icon id="export" className={classes.exportSVG} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

ToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleViewOrders: PropTypes.func.isRequired,
  isOrderOpen: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(ToolBarStyles)(ToolBar);
