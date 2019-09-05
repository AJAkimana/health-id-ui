import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Tooltip, IconButton, MenuList, MenuItem
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {
  Export
} from '../../../../assets/images/stock/StockIcons';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';
import IconFactory from '../../../../assets/images/iconFactory/IconFactory';
import { supplyStyles } from '../../../../assets/styles/suppliers/suppliers';
import check from '../../../../assets/images/suppliers/check.png';
import TableSearch from '../../../stock_control/Table/TableSearch';
import { CustomIconButton, RenderPopper } from '../../../stock_control/utils/utils';

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

  render() {
    const { addSupplierOpen } = this.state;
    const {
      classes,
      handleClickSearch,
      isSearchActive,
      handleHideSearch,
      isAdmin,
      handleTextChange
    } = this.props;

    return (
      <Fragment>
        {isSearchActive ? (
          <TableSearch onHide={handleHideSearch} handleTextChange={handleTextChange} />
        ) : ('')}
        <Fragment>
          <CustomIconButton
            toolTip="Search"
            buttonRef={(node) => {
              this.search = node;
            }}
            onClickHandler={handleClickSearch}
          >
            <SearchIcon />
          </CustomIconButton>
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
            <MenuItem onClick={this.handleCloseAddSupplier}>Add individual supplier</MenuItem>
            <MenuItem onClick={this.handleCloseAddSupplier}>Import supplier csv.</MenuItem>
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
  handleTextChange: PropTypes.func.isRequired
};

CustomToolBar.defaultProps = {
  isSearchActive: false
};

export default withStyles(ToolbarStyles)(CustomToolBar);
