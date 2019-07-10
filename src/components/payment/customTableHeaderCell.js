import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';

const CustomTableHeaderCell = ({ label, style }) => (
  <TableCell
    key={label}
    align="left"
    style={style}
  >
    {label}

  </TableCell>
);

CustomTableHeaderCell.propTypes = {
  label: PropTypes.string,
  style: PropTypes.instanceOf(Object),
};

CustomTableHeaderCell.defaultProps = {
  label: '',
  style: {}
};

export default CustomTableHeaderCell;
