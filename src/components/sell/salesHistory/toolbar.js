import React from 'react';
import {
  Tooltip, TextField, Typography, IconButton, Grid, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import { toolbarButton } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import Icon from '../../products/productIcons';
import { CalenderIcon, SearchIcon, ResetIcon } from '../../../assets/SvgIcons/sellScreenSvgs';

export const Toolbar = ({
  state,
  classes,
  title,
  handleResetSales,
  handleSearchInput,
  handleSearchToggle,
  handleSavePrintOpen,
  handleToggle,
}) => {
  const { isSearching, searchValues: { searchField } } = state;

  return (
    <Grid container className={classes.toolbarWrapper}>
      <Grid item xs={6} container justify="flex-start">
        {!isSearching ? (
          <Grid item container xs={12}>
            <Typography variant="subtitle1" className={classes.typo}>
              {title}
            </Typography>
            <Button
              style={toolbarButton.resetButton}
              size="small"
              onClick={handleResetSales}
            >
              <ResetIcon style={toolbarButton.resetIcon} />
              <Typography variant="subtitle1" style={toolbarButton.buttonsTypo}>
                Reset
              </Typography>
            </Button>
          </Grid>
        ) : (
          <>
            <TextField
              id="search-field"
              name="searchField"
              autoFocus
              value={searchField}
              className={classes.textField}
              margin="normal"
              inputProps={{ 'aria-label': 'bare' }}
              onChange={handleSearchInput}
            />
            <IconButton className={classes.clearIcon} onClick={handleSearchToggle}>
              <ClearIcon />
            </IconButton>
          </>
        )}
      </Grid>
      <Grid
        item
        xs={6}
        container
        justify="flex-end"
        className={classes.iconsWrapper}
      >
        <Tooltip title="search">
          <IconButton
            onClick={handleSearchToggle}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search Filter">
          <IconButton
            className={classes.iconButton}
            onClick={handleToggle}
          >
            <CalenderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Export List">
          <IconButton onClick={handleSavePrintOpen}>
            <Icon
              id="export"
              className={classes.exportSVG}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

Toolbar.propTypes = {
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  handleSearchInput: PropTypes.func.isRequired,
  handleSearchToggle: PropTypes.func.isRequired,
  handleSavePrintOpen: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
  state: {},
  classes: {},
  title: '',
};

export default Toolbar;
