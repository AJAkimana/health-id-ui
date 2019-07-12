import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FormControl, InputLabel, Input, DialogActions, Button, Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  DialogTitle, DialogContent, Dialog,
} from '../../../assets/styles/authentication/AlertStyle';
import errorImg from '../../../assets/images/error/error-sm.png';

const ForgotPasswordAlert = (props) => {
  const {
    open, onClose, email, handleEmailChange, EmailError,
    helperEmailText, handlePasswordReset, loading, disabled,
  } = props;

  const button = loading ? (
    <CircularProgress
      key="loader"
      color="primary"
      className="alert-loader"
    />
  )
    : (
      <Button
        key="button"
        disabled={disabled}
        className="alert-button"
        type="submit"
        onClick={handlePasswordReset}
      >
        SEND
      </Button>
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
            <img alt="Success!!" src={errorImg} className="dialog-image" />
            <h1 className="forgotMsg">
              Forgot Password?
            </h1>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography className="dialog-message">
          Please enter the email address you registered with. You will be sent a
          link to reset your password.
          </Typography>
          <FormControl
            error={EmailError}
            required
            className="email-field"
          >
            <InputLabel htmlFor="adornment-email">Email</InputLabel>
            <Input
              required
              label="Email"
              type="email"
              name="email"
              defaultValue={email}
              id="adornment-email"
              onChange={handleEmailChange}
              endAdornment={(
                [button]
              )}
            />
            {helperEmailText}
          </FormControl>
          <Typography className="dialog-warning">
          The link expires 24 hours after you have received it.
          </Typography>
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

ForgotPasswordAlert.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  email: PropTypes.string,
  handleEmailChange: PropTypes.func.isRequired,
  EmailError: PropTypes.bool,
  helperEmailText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handlePasswordReset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ForgotPasswordAlert.defaultProps = {
  open: false,
  disabled: true,
  email: '',
  EmailError: false,
  helperEmailText: '',
  loading: false,
};

export default ForgotPasswordAlert;
