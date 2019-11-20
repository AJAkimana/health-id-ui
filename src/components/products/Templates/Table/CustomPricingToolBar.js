import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Tooltip, IconButton
} from '@material-ui/core';
import exportlogo from '../../../../assets/images/products/export.png';
import addlogo from '../../../../assets/images/products/add.png';
import searchlogo from '../../../../assets/images/products/search.png';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';
import TableSearch from '../../../stock_control/Table/TableSearch';
import { CustomIconButton } from '../../../stock_control/utils/utils';

export class CustomPricingToolBar extends Component {
  state = {
    open: false,
    addSupplierOpen: false
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleViewMenu = () => {
    const { openViewMenu } = this.state;
    this.setState({ openViewMenu: !openViewMenu });
  };

  handleClose = () => {
    this.setState({ openAddMenu: false, openViewMenu: false });
  };

  render() {
    const { openViewMenu } = this.state;
    const {
      classes,
      handleClickSearch,
      isSearchActive,
      handleHideSearch,
      handleSearchTextChange,
    } = this.props;
    return (
      <Fragment>
        {isSearchActive ? (
          <TableSearch onHide={handleHideSearch} handleTextChange={handleSearchTextChange} />
        ) : ('')}
        <Fragment>
          <Tooltip title="Search" style={{ marginRight: '25px' }}>
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
              <img src={searchlogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </Tooltip>
          <CustomIconButton
            toolTip="Add Product"
            buttonRef={(node) => {
              this.addProductElement = node;
            }}

          >
            <img src={addlogo} style={{ width: '20px' }} alt="" />
          </CustomIconButton>
          <Tooltip title="Export List" style={{ marginRight: '25px' }}>
            <IconButton>
              <img src={exportlogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </Tooltip>
        </Fragment>
      </Fragment>
    );
  }
}

CustomPricingToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  handleHideSearch: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool,
  handleSearchTextChange: PropTypes.func.isRequired,
};

CustomPricingToolBar.defaultProps = {
  isSearchActive: false
};

export default withStyles(ToolbarStyles)(CustomPricingToolBar);
