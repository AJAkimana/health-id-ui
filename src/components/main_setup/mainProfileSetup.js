import React from 'react';
import PropTypes from 'prop-types';

import AdminProfile from './mainProfileAdminUser';
import NormalProfile from './mainProfileNormalUser';
import withAuth from '../withAuth';
import { useStateValue } from '../../providers/stateProvider';

export const MainSetup = ({ session }) => {
  const { role } = session.me;
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }, []);

  return (role.name === 'Master Admin')
    ? <AdminProfile session={session} />
    : <NormalProfile session={session} data={session.me} />;
};

MainSetup.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      role: PropTypes.shape({
        name: PropTypes.string,
      })
    }),
  }).isRequired,
};

export default withAuth(MainSetup);
