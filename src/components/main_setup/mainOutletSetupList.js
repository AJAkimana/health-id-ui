import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core';
import Settings from '@material-ui/icons/Settings';
import { MainOutletSetupStyles } from '../../assets/styles/setup';

const MainOutletSetupList = (props) => {
  const { outletsList } = props;

  return (
    <Table>
      <TableBody>
        {
          outletsList.map(
            store => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.kind.name}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Link to={`/main_setup/preferences/${store.id}`} style={MainOutletSetupStyles.optionsLink}>
                      <Settings />
                    </Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )
        }
      </TableBody>
    </Table>
  );
};

MainOutletSetupList.propTypes = {
  outletsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MainOutletSetupList;
