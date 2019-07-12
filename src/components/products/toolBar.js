import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ToolBarStyles } from '../../assets/styles/products/products';
import Icon from './productIcons';

export class ToolBar extends Component {
  state = {
    openAddMenu: false,
    openViewMenu: false,
  };

  handleToggleAddMenu = () => {
    const { openAddMenu } = this.state;
    this.setState({ openAddMenu: !openAddMenu });
  };

  handleToggleViewMenu = () => {
    const { openViewMenu } = this.state;
    this.setState({ openViewMenu: !openViewMenu });
  };

  handleClose = () => {
    this.setState({ openAddMenu: false, openViewMenu: false });
  };

  handleChangeView = () => {
    const { handleViewProposed } = this.props;
    const statusObject = {
      approved: document.querySelector('#approved').checked,
      proposed: document.querySelector('#proposed').checked
    };
    handleViewProposed(statusObject);
  };

  render() {
    const { classes, status } = this.props;
    const {
      openViewMenu, openAddMenu
    } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="Switch table view">
          <IconButton
            className={classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={openViewMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleViewMenu}
          >
            <Icon
              id="eye"
            />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openViewMenu}
          anchorEl={this.anchorEl}
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
                <ClickAwayListener onClickAway={this.handleClose}>
                  <FormGroup className={classes.switchFormGroup}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={status === 'approved' || status === 'all'}
                          onChange={this.handleChangeView}
                          id="approved"
                          value="approved"
                          color="primary"
                        />
                      )}
                      label="View Approved Products"
                    />
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={status === 'proposed' || status === 'all'}
                          onChange={this.handleChangeView}
                          id="proposed"
                          value="proposed"
                          color="primary"
                        />
                      )}
                      label="View Proposed Products"
                    />
                  </FormGroup>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Tooltip title="Add product">
          <IconButton
            className={classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={openAddMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleAddMenu}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openAddMenu}
          anchorEl={this.anchorEl}
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
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>
                      <Link
                        to="/product/add"
                        className={classes.menuLink}
                      >
                            Add Individual Product
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <Link
                        to="/product/import"
                        className={classes.menuLink}
                      >
                        Import Product List
                      </Link>
                    </MenuItem>
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
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string,
};

ToolBar.defaultProps = {
  status: ''
};

export default withStyles(ToolBarStyles)(ToolBar);
