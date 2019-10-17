import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Tooltip, IconButton, MenuList, MenuItem
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
  Export
} from '../../../../assets/images/stock/StockIcons';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';
import IconFactory from '../../../../assets/images/iconFactory/IconFactory';
import { supplyStyles } from '../../../../assets/styles/suppliers/suppliers';
import check from '../../../../assets/images/suppliers/check.png';
import TableSearch from '../../../stock_control/Table/TableSearch';
import { CustomIconButton, RenderPopper } from '../../../stock_control/utils/utils';
import Icon from '../../../products/productIcons';

export class CustomToolBar extends Component {
  state = {
    open: false,
    addSupplierOpen: false
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleAddSupplier = () => {
    const { addSupplierOpen } = this.state;
    this.setState({ addSupplierOpen: !addSupplierOpen });
  };

  handleCloseAddSupplier = (event) => {
    !this.addSupplierElement.contains(event.target) && this.setState({ addSupplierOpen: false });
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
    const { addSupplierOpen, openViewMenu } = this.state;
    const {
      classes,
      handleClickSearch,
      isSearchActive,
      handleHideSearch,
      isAdmin,
      handleTextChange,
      status,
    } = this.props;

    return (
      <Fragment>
        {isSearchActive ? (
          <TableSearch onHide={handleHideSearch} handleTextChange={handleTextChange} />
        ) : (
          ''
        )}
        <Fragment>
          <Tooltip title="Search">
            <IconButton
              className={!isSearchActive ? classes.iconButtonActive : classes.iconButton}
              buttonRef={(node) => {
                this.anchorEl = node;
              }}
              toolTip="Search"
              aria-owns={openViewMenu ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleClickSearch}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Switch table view">
            <IconButton
              className={!openViewMenu ? classes.iconButtonActive : classes.iconButton}
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
            style={{ padding: '20px' }}
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
                    <FormGroup>
                      <FormControlLabel
                        className={classes.switchFormGroupSupplier}
                        control={(
                          <Switch
                            checked={status === 'approved' || status === 'all'}
                            onChange={this.handleChangeView}
                            id="approved"
                            value="approved"
                            color="primary"
                          />
                        )}
                        label="View Approved Suppliers"
                      />
                      <FormControlLabel
                        className={classes.switchFormGroupSupplier}
                        control={(
                          <Switch
                            checked={status === 'proposed' || status === 'all'}
                            onChange={this.handleChangeView}
                            id="proposed"
                            value="proposed"
                            color="primary"
                          />
                        )}
                        label="View Proposed Suppliers"
                      />
                    </FormGroup>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          {isAdmin
            && (
              <CustomIconButton
                toolTip="Add Supplier"
                buttonRef={(node) => {
                  this.addSupplierElement = node;
                }}
                onClickHandler={() => this.handleToggleAddSupplier()}
              >
                <AddIcon />
              </CustomIconButton>
            )}
          <CustomIconButton
            toolTip="Price Check"
            onClickHandler={() => { }}
          >
            <IconFactory
              iconStyle={supplyStyles.checkImage}
              type={check}
              iconAlt="Price Check"
            />
          </CustomIconButton>
          <Tooltip title="Export List">
            <IconButton>
              <Export className={classes.svgIcon} />
            </IconButton>
          </Tooltip>
        </Fragment>
        <RenderPopper
          anchorEl={this.addSupplierElement}
          onClickAway={this.handleCloseAddSupplier}
          open={addSupplierOpen}
        >
          <MenuList>
            <MenuItem onClick={this.handleCloseAddSupplier}>
              <Link to="/suppliers/add" className={classes.menuLink}>
                Add Individual Supplier
              </Link>

            </MenuItem>
            <MenuItem onClick={this.handleCloseAddSupplier}>
              <Link
                to="/suppliers/new/import"
                style={supplyStyles.menuLink}
              >
                Import supplier csv.
              </Link>
            </MenuItem>
          </MenuList>
        </RenderPopper>
      </Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSearchActive: PropTypes.bool,
  handleTextChange: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
};

CustomToolBar.defaultProps = {
  isSearchActive: false
};

export default withStyles(ToolbarStyles)(CustomToolBar);
