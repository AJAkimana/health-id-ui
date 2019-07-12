import React from 'react';
import PropTypes from 'prop-types';
import { DialogActions, Typography } from '@material-ui/core';
import {
  DialogTitle, DialogContent, Dialog,
} from '../../../assets/styles/authentication/AlertStyle';
import errorImg from '../../../assets/images/error/error-sm.png';
import successImg from '../../../assets/images/success/success-sm.png';

const RegisterAlert = (props) => {
  const {
    open, onClose, email, success, registerErrors
  } = props;

  const img = success ? successImg : errorImg;

  const title = success ? 'Registration Successful!' : 'ERROR!';

  const titleColor = success ? 'successMsg' : 'errorMsg';

  const text = success ? (
    <div>
      <Typography className="dialog-message">
      A HealthID account has been created for you.
      Please verify your account via the
        <br />
      email sent to
        <span className="email-highlight">
        &nbsp;
          {email}
        &nbsp;
        </span>
      to set up your account.
      </Typography>
      <Typography className="dialog-email-msg">
        The link expires 24 hours after you have received it.&nbsp;
        <a href="/resend" className="resend-link">RESEND?</a>
      </Typography>
    </div>
  ) : (
    <div>
      <Typography className="dialog-message">
        Something went wrong, a HealthID account could not be created for you.
        <br />
        Please check the details you have entered to register your account.
      </Typography>
      <div className="error-section">
        <ul className="alert-error">
          <li>
            {registerErrors}
          </li>
        </ul>
      </div>
    </div>
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
            <a href="/help" className="dialog-footer">Need Help?</a>
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RegisterAlert.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string,
  success: PropTypes.arrayOf(PropTypes.string),
  registerErrors: PropTypes.string,
};

RegisterAlert.defaultProps = {
  open: false,
  email: '',
  success: [],
  registerErrors: ''
};

export default RegisterAlert;
