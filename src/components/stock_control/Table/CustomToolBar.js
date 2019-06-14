import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  MenuList,
  MenuItem,
  Tooltip,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import ProposedProducts from '../ProposedProduct';
import {
  StockCount,
  LowQuantityNotification,
  Export,
  ApproveStockIcon
} from '../../../assets/images/stock/StockIcons';
import { ToolbarStyles } from '../../../assets/css/stock';
import { CustomIconButton, RenderPopper } from '../utils/utils';
import TableSearch from './TableSearch';

export class CustomToolBar extends Component {
  state = {
    open: false,
    stockOpen: false
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleStock = () => {
    const { stockOpen } = this.state;
    this.setState({ stockOpen: !stockOpen });
  };

  handleClose = (event) => {
    !this.anchorEl.contains(event.target) ? this.setState({ open: false }) : '';
  };

  handleCloseStock = (event) => {
    !this.StockElement.contains(event.target) ? this.setState({ stockOpen: false }) : '';
  };

  render() {
    const {
      classes,
      handleClickSearch,
      isSearchActive,
      handleHideSearch,
      handleTextChange
    } = this.props;
    const { open, stockOpen } = this.state;
    return (
      <Fragment>
        {isSearchActive ? (
          <TableSearch onHide={handleHideSearch} handleTextChange={handleTextChange} />
        ) : (
          ''
        )}
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
          <CustomIconButton
            toolTip="Approve"
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            onClickHandler={() => this.handleToggle()}
          >
            <ApproveStockIcon />
          </CustomIconButton>
          <Tooltip title="Low quantity">
            <IconButton>
              <LowQuantityNotification />
            </IconButton>
          </Tooltip>
          <CustomIconButton
            toolTip="Stock count"
            buttonRef={(node) => {
              this.StockElement = node;
            }}
            onClickHandler={() => this.handleToggleStock()}
          >
            <StockCount />
          </CustomIconButton>
          <Tooltip title="Export List">
            <IconButton>
              <Export className={classes.svg} />
            </IconButton>
          </Tooltip>
        </Fragment>
        <RenderPopper
          anchorEl={this.StockElement}
          onClickAway={this.handleCloseStock}
          open={stockOpen}>
          <MenuList>
            <MenuItem onClick={this.handleCloseStock}>Initiate Stock count</MenuItem>
            <MenuItem onClick={this.handleCloseStock}>Reconcile Stock Differences</MenuItem>
            <MenuItem onClick={this.handleCloseStock}>View Previous Stock Count</MenuItem>
          </MenuList>
        </RenderPopper>
        <RenderPopper anchorEl={this.anchorEl} onClickAway={this.handleClose} open={open}>
          <ProposedProducts handleClick={this.handleToggle} />
        </RenderPopper>
      </Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleClickSearch: PropTypes.func.isRequired
};

export default withStyles(ToolbarStyles)(CustomToolBar);
