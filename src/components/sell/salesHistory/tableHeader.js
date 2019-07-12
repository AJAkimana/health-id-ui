import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableHead, TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { HeaderStyles, HeaderRowStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';

const TableHeader = ({
  headRows,
  classes,
}) => (
  <TableHead>
    <TableRow style={HeaderRowStyles.row}>
      {headRows.map(row => (
        <TableCell
          className={classes.headerWrapper}
          key={row.id}
          align="left"
        >
          {row.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  headRows: PropTypes.arrayOf(String),
  classes: PropTypes.instanceOf(Object),
};

TableHeader.defaultProps = {
  headRows: [],
  classes: {}
};

export default withStyles(HeaderStyles)(TableHeader);
