import React from 'react';
import PropTypes from 'prop-types';
import AdminProfile from './mainProfileAdminUser';
import NormalProfile from './mainProfileNormalUser';

const MainSetup = ({ session }) => {
  const { role } = session.me;
  return (role.name === 'Master Admin')
    ? <AdminProfile session={session} />
    : <NormalProfile session={session} data={session.me} />;
};

MainSetup.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default MainSetup;
