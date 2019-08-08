import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createFilter } from 'react-search-input';
import { Query } from 'react-apollo';
import GET_SALES_HISTORY from '../queries/salesHistoryQuery';
import withAuth from '../components/withAuth';
import Dashboard from '../components/shared/Dashboard/Dashboard';
import SalesHistoryDetails from '../components/sell/salesHistory/salesHistoryDetails';
import DataTableLoader from '../components/dataTable/dataTableLoader';

export class SalesHistory extends Component {
  state = {
    initialData: null,
    salesData: '',
    openSearchPopper: false,
    searchPopperAnchorEl: null,
  };

  handleDateTimeFilter = (selection, timeValue) => {
    const { initialData } = this.state;
    const { startDate, endDate } = selection;
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const { start, end } = timeValue;
    const startTime = start.length === 4 ? `0${start}` : start;
    const endTime = end.length === 4 ? `0${end}` : end;
    const filteredSales = initialData.filter((data) => {
      const { dateSold, timeSold } = data;
      return dateSold >= startDate && dateSold <= endDate
        && timeSold >= startTime && timeSold <= endTime;
    });
    this.setState({
      salesData: filteredSales,
    });
  };

  handleSalesSearch = (value) => {
    const KEYS_TO_FILTER = ['soldBy', 'soldTo', 'receiptId', 'customer.firstName', 'customer.lastName'];
    if (value) {
      const { initialData } = this.state;
      const filteredSales = initialData.filter(createFilter(value, KEYS_TO_FILTER));
      this.setState({
        salesData: filteredSales
      });
    } else this.handleResetSales();
  };

  handleSearchFilter = (searchValue) => {
    const { salesData } = this.state;
    const startDate = searchValue.from;
    const endDate = searchValue.to;
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const filteredSales = salesData.filter((data) => {
      const { dateSold } = data;
      return dateSold >= startDate && dateSold <= endDate;
    });
    this.setState({
      salesData: filteredSales,
      openSearchPopper: false
    });
  };

  handleResetSales = () => {
    const { initialData } = this.state;
    this.setState({
      salesData: initialData
    });
  };

  createColumns = headers => headers.map(header => ({
    id: header.replace(/ +/g, ''),
    label: header.toUpperCase()
  }));

  setInitialData = (data) => {
    const salesData = data.map(({
      id, createdAt, salesPerson, receipt, customer, outlet, amountToPay,
    }) => {
      const date = new Date(createdAt);
      const timeSold = String(date).slice(16, 21);
      const dateSold = date;
      dateSold.setHours(0, 0, 0, 0);
      return ({
        id,
        dateSold,
        timeSold,
        location: `${outlet.name}, ${outlet.city.name} | Register 1`,
        soldBy: salesPerson ? `${salesPerson.firstName} ${salesPerson.lastName}` : 'No Record',
        receiptId: receipt ? receipt.receiptNo : 'No Record',
        soldTo: customer ? `${customer.firstName || ''} ${customer.lastName || ''}` : 'No Record',
        amount: amountToPay,
      });
    });
    this.setState({ salesData, initialData: salesData });
  }

  render() {
    const { session } = this.props;
    const { id } = session.me.outlets[0];
    return (
      <Fragment>
        <Dashboard isActive="grid2" session={session} />
        <Query
          query={GET_SALES_HISTORY}
          variables={{ id }}
          onCompleted={data => this.setInitialData(data.outletSalesHistory)}
        >
          {({ loading, error }) => {
            if (loading) return <DataTableLoader />;
            if (error) return `Error! ${error}`;

            return (
              <SalesHistoryDetails
                state={this.state}
                handleSalesSearch={this.handleSalesSearch}
                handleDateTimeFilter={this.handleDateTimeFilter}
                createColumns={this.createColumns}
                handleSearchFilter={this.handleSearchFilter}
                handleResetSales={this.handleResetSales}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

SalesHistory.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
};

SalesHistory.defaultProps = {
  session: {},
};

export default withAuth(SalesHistory);
