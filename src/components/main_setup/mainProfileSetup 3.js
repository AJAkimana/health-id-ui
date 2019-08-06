import React from 'react';
import PropTypes from 'prop-types';
import AdminProfile from './mainProfileAdminUser';
import NormalProfile from './mainProfileNormalUser';

const MainSetup = ({ session }) => {
  const { role } = session.me;
  return (role.name === 'Master Admin')
    ? <AdminProfile session={session} />
    : <NormalProfile session={session} />;
};

MainSetup.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      role: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  }).isRequired,
};

export default MainSetup;
