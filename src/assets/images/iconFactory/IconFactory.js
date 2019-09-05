import React from 'react';
import PropTypes from 'prop-types';

const IconFactory = (props) => {
  const {
    iconStyle, type, iconClass, iconAlt
  } = props;
  return (
    <img
      className={iconClass}
      src={type}
      alt={iconAlt}
      style={iconStyle}
    />
  );
};

IconFactory.propTypes = {
  iconClass: PropTypes.string,
  iconAlt: PropTypes.string,
  iconStyle: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired
};

IconFactory.defaultProps = {
  iconClass: '',
  iconAlt: ''
};

export default IconFactory;
