import React from 'react';
import PropTypes from 'prop-types';

import AdminProfile from './mainProfileAdminUser';
import NormalProfile from './mainProfileNormalUser';
import withAuth from '../withAuth';

export const MainSetup = ({ session }) => {
  const { role } = session.me;
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
