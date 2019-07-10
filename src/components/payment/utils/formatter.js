const currencyFormatter = value => new Intl.NumberFormat(
  'en-US',
  {
    minimumFractionDigits: 2
  }
).format(value);

export default currencyFormatter;
