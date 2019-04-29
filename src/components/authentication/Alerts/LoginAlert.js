import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DialogActions, Typography } from '@material-ui/core';
import {
  DialogTitle, DialogContent, Dialog,
} from '../../../assets/styles/authentication/AlertStyle';
import errorImg from '../../../assets/images/error/error-sm.png';
import successImg from '../../../assets/images/success/success-sm.png';
import '../../../assets/styles/style.css';

const LoginAlert = (props) => {
  const {
    open, onClose, success,
  } = props;
  const img = success ? successImg : errorImg;
  const title = success ? 'Login Successful!' : 'ERROR!';
  const titleColor = success ? 'successMsg' : 'errorMsg';
  const text = success ? (
    <div>
      <Typography className="dialog-message">
      You have successfully logged into your account.
      </Typography>
    </div>
  ) : (
    <Typography className="dialog-message">
        Something went wrong, we could not log you into your account.
      <br />
        Please check the details you have entered correctly to access your account.
    </Typography>
  );
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          <div className="align-title-items">
            <img alt="Success!!" src={img} className="dialog-image" />
            <h1 className={titleColor}>
              {title}
            </h1>
          </div>
        </DialogTitle>
        <DialogContent>
          {text}
        </DialogContent>
        <DialogActions className="bottom-actions">
          <Typography align="center">
            <Link to="/help" className="dialog-footer">
              Need Help?
            </Link>
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LoginAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default LoginAlert;
