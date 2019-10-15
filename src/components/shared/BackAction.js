import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import { BackActionStyles } from '../../assets/styles/products/addProductStyles';


const BackAction = (props) => {
  const { header, link } = props;
  return (
    <div style={BackActionStyles.topDiv}>
      <div>
        <Link to={link}>
          <IconButton>
            <BackArrowIcon style={BackActionStyles.backIcon} />
          </IconButton>
        </Link>
      </div>
      <div>
        <h3 style={BackActionStyles.header}>{header}</h3>
      </div>
    </div>
  );
};

BackAction.propTypes = {
  link: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};

export default BackAction;
