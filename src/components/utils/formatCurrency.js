import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';

const FormatCurrency = ({ amount, currency }) => (
  <CurrencyFormat
    value={amount || 0}
    displayType="text"
    thousandSeparator
    decimalSeparator="."
    decimalScale={2}
    fixedDecimalScale
    prefix={currency}
  />
);

FormatCurrency.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
};

FormatCurrency.defaultProps = {
  amount: 0,
  currency: '',
};

export default FormatCurrency;
