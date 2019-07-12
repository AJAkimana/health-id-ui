import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  MenuList, MenuItem, Tooltip, IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import ProposedEdits from '../../../container/stock/ProposedEdits';
import {
  StockCount,
  LowQuantityNotification,
  Export,
  ApproveStockIcon
} from '../../../assets/images/stock/StockIcons';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';
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

  handleCloseStock = (event) => {
    !this.StockElement.contains(event.target) && this.setState({ stockOpen: false });
  };

  render() {
    const {
      classes,
      handleClickSearch,
      isSearchActive,
      handleHideSearch,
      isAdmin,
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
          {isAdmin
            && (
              <CustomIconButton
                toolTip="Approve"
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                onClickHandler={() => this.handleToggle()}
              >
                <ApproveStockIcon />
              </CustomIconButton>
            )}
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
              <Export className={classes.svgIcon} />
            </IconButton>
          </Tooltip>
        </Fragment>
        <RenderPopper
          anchorEl={this.StockElement}
          onClickAway={this.handleCloseStock}
          open={stockOpen}
        >
          <MenuList>
            <MenuItem onClick={this.handleCloseStock}>Initiate Stock count</MenuItem>
            <MenuItem onClick={this.handleCloseStock}>Reconcile Stock Differences</MenuItem>
            <MenuItem onClick={this.handleCloseStock}>View Previous Stock Count</MenuItem>
          </MenuList>
        </RenderPopper>
        <RenderPopper
          anchorEl={this.anchorEl}
          open={open}
          className="approve-products"
          popperPlacement="bottom"
        >
          <ProposedEdits />
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
