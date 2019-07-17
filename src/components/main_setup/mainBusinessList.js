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
import OpenInNew from '@material-ui/icons/OpenInNew';
import { MainOutletSetupStyles } from '../../assets/styles/setup';

export const MainBusinessList = (props) => {
  const { businessList } = props;

  if (businessList.length > 0) {
    return (
      <Table>
        <TableBody>
          {
            businessList.map(
              business => (
                <TableRow key={business.id}>
                  <TableCell>{business.legalName}</TableCell>
                  <TableCell>{business.email}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Link to={`/main_setup/business_information/${business.id}`} style={MainOutletSetupStyles.optionsLink}>
                        <OpenInNew />
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
  }

  return null;
};

MainBusinessList.propTypes = {
  businessList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MainBusinessList;
