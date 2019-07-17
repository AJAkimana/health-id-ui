import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

const User = ({ data }) => (
  <Table>
    <TableBody>
      {
        data.map(
          user => (
            <TableRow key={user.email}>
              <TableCell>{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="right">{user.role.name}</TableCell>
            </TableRow>
          )
        )
      }
    </TableBody>
  </Table>
);

User.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default User;
