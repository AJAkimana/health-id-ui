import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns';
import { SalesToolBarStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import Toolbar from './toolbar';
import DateTimePopper from './dateTimePopper';
import SearchPopper from './searchPopper';
import SavePrintPopper from './savePrintPopper';
import Doc from './utils/docService';

export class SalesHistoryToolBar extends Component {
  state = {
    open: false,
    isSearching: false,
    dateTimeAnchorEl: null,
    dateRangePicker: {
      selection: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
        color: '#7D7A1F',
      },
    },
    timeValue: {
      start: '00:00',
      end: '23:59'
    },
    searchValues: {
      searchField: '',
      from: new Date(),
      to: new Date(),
      outlet: 'Transcend Pharmacy, Kampala'
    },
    searchAnchorEl: null,
    searchPopperOpen: false,
    calenderPopperOpen: false,
    calenderAnchorEl: '',
    datePicker: null,
    savePrintOpen: false
  };

  handleToggle = (event) => {
    const { currentTarget } = event;
    const { open } = this.state;
    this.setState({
      open: !open,
      dateTimeAnchorEl: currentTarget,
    });
  };

  handleSearchToggle = () => {
    const { isSearching, searchValues } = this.state;
    const { handleSalesSearch } = this.props;
    this.setState({
      isSearching: !isSearching,
      searchPopperOpen: false,
      searchValues: {
        ...searchValues,
        searchField: '',
      }
    });
    handleSalesSearch();
  }

  handleClose = (which) => {
    this.setState({
      open: false,
      [which]: false,
    });
  };

  handleRangeChange = (which, payload) => {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  handleCalenderChange = (which, payload) => {
    this.setState({
      [which]: payload,
    });
  }

  timeChangeHandler = (time) => {
    this.setState({
      timeValue: time
    });
  }

  handleSliderButtons = (point) => {
    if (point === '00:00') {
      this.setState(state => ({
        timeValue: {
          ...state.timeValue,
          start: point
        }
      }));
    } else {
      this.setState(state => ({
        timeValue: {
          ...state.timeValue,
          end: point
        }
      }));
    }
  }

  handleClickShowCalender = (event) => {
    const { currentTarget } = event;
    this.setState(state => ({
      calenderPopperOpen: !state.calenderPopperOpen,
      calenderAnchorEl: currentTarget,
    }));
  }

  handleSearchInput = (event) => {
    const { target: { value }, currentTarget } = event;
    const { handleSalesSearch } = this.props;
    handleSalesSearch(value);
    this.setState(state => ({
      searchAnchorEl: currentTarget,
      searchPopperOpen: true,
      searchValues: {
        ...state.searchValues,
        searchField: value
      }
    }));
  }

  handleSearchChange = (which, data) => {
    this.setState(state => ({
      searchValues: {
        ...state.searchValues,
        [which]: data
      }
    }));
  }

  handleDoneButton = (searchValues) => {
    const { handleSearchFilter } = this.props;
    handleSearchFilter(searchValues);
    this.setState({ searchPopperOpen: false });
  };

  handleDateTimeDoneButton = (selection, timeValue) => {
    const { handleDateTimeFilter } = this.props;
    handleDateTimeFilter(selection, timeValue);
    this.setState({ open: false });
  };

  setOutlets = (rows) => {
    const outlets = rows.map(row => row.location.split('|')[0]);
    return [...new Set(outlets)];
  }

  handleSavePrintOpen = (event) => {
    const { currentTarget } = event;
    this.setState(state => ({
      savePrintOpen: !state.savePrintOpen,
      savePrintAnchorEl: currentTarget
    }));
  };

  handlePrintButton = () => {
    this.setState(state => ({
      savePrintOpen: !state.savePrintOpen,
    }));
  }

  handleSaveButton = (html) => {
    Doc.createPdf(html);
    this.handlePrintButton();
  }

  render() {
    const {
      classes, title, rows, componentRef, handleResetSales
    } = this.props;
    return (
      <>
        <Toolbar
          state={this.state}
          classes={classes}
          title={title}
          handleResetSales={handleResetSales}
          handleSearchInput={this.handleSearchInput}
          handleSearchToggle={this.handleSearchToggle}
          handleSavePrintOpen={this.handleSavePrintOpen}
          handleToggle={this.handleToggle}
        />
        <DateTimePopper
          state={this.state}
          classes={classes}
          handleClose={this.handleClose}
          handleRangeChange={this.handleRangeChange}
          timeChangeHandler={this.timeChangeHandler}
          handleSliderButtons={this.handleSliderButtons}
          handleDateTimeDoneButton={this.handleDateTimeDoneButton}
        />
        <SearchPopper
          state={this.state}
          classes={classes}
          rows={this.setOutlets(rows)}
          handleClose={this.handleClose}
          handleSearchChange={this.handleSearchChange}
          handleDoneButton={this.handleDoneButton}
        />
        <SavePrintPopper
          state={this.state}
          classes={classes}
          componentRef={componentRef}
          handlePrintButton={this.handlePrintButton}
          handleSaveButton={this.handleSaveButton}
        />
      </>
    );
  }
}

SalesHistoryToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  rows: PropTypes.instanceOf(Array),
  handleSalesSearch: PropTypes.func.isRequired,
  handleDateTimeFilter: PropTypes.func.isRequired,
  handleSearchFilter: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
  componentRef: PropTypes.instanceOf(Object),
};

SalesHistoryToolBar.defaultProps = {
  classes: {},
  title: '',
  rows: [],
  componentRef: {},
};

export default withStyles(SalesToolBarStyles)(SalesHistoryToolBar);
