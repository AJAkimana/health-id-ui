import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  Popper, Fade, Paper, withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';

import { validateEmail, validatePasswordLength } from '../../utils/authentication/Validation';
import { initialState } from './Container';
import SwitchAccountStyles from '../../assets/styles/authentication/SwitchAccountStyles';
import { EMAIL_LOGIN_MUTATION, MOBILE_LOGIN_MUTATION } from './mutations/mutations';
import Login from './Login';
import notify from '../shared/Toaster';

export class SwitchAccount extends Component {
  state = { ...initialState };

  handlePasswordChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ password: value });
    const array = validatePasswordLength(value);
    this.setState({
      helperPasswordText: array[0],
      passwordError: array[1]
    });
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleEmailChange = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
    const array = validateEmail(value);
    this.setState({
      helperEmailText: array[0],
      EmailError: array[1]
    });
  };

  handlePhoneChange = (value) => {
    this.setState({
      phone: value
    });
  };

  handleCheckbox = (event) => {
    const { checked } = event.target;
    this.setState({ checked });
  };

  handleSubmit = (event, loginWithEmail, loginWithPhone) => {
    event.preventDefault();
    const { inputType, phone } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    let values;
    if (inputType === 'email') {
      values = {
        email: event.target.email.value,
        password: event.target.password.value
      };
      loginWithEmail({
        variables: values
      })
        .then((results) => {
          const { token, restToken, message } = results.data.loginUser;
          if (message === 'Login Successful') {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('rest_token', restToken);
            history.go(0);
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          notify(error.message.split(':')[1]);
          this.setState({ loading: false });
        });
    }
    if (inputType === 'phone') {
      values = {
        password: event.target.password.value,
        mobileNumber: phone
      };
      loginWithPhone({
        variables: values
      })
        .then((results) => {
          const { token, restToken, message } = results.data.loginUser;
          if (message === 'Login Successful') {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('rest_token', restToken);
            history.go(0);
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          notify(error.message.split(':')[1]);
          this.setState({ loading: false });
        });
    }
  };

  handleChangeInput = (event) => {
    const value = event.target.id.split('-')[0];
    this.setState({ inputType: value });
  };

  render() {
    const {
      open, handleClose, anchorEl, classes
    } = this.props;
    return (
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Mutation mutation={MOBILE_LOGIN_MUTATION}>
              {loginWithPhone => (
                <Mutation mutation={EMAIL_LOGIN_MUTATION}>
                  {loginWithEmail => (
                    <Paper className={classes.paper} elevation={10}>
                      <div className={classes.buttonWrapper}>
                        <ClearIcon className={classes.button} onClick={() => handleClose()} />
                      </div>
                      <div className={classes.loginWrapper}>
                        <Login
                          state={this.state}
                          switchAccount
                          handlePasswordChange={this.handlePasswordChange}
                          handlePasswordVisibility={this.handlePasswordVisibility}
                          handleEmailChange={this.handleEmailChange}
                          handlePhoneChange={this.handlePhoneChange}
                          handleCheckbox={this.handleCheckbox}
                          handleSubmit={event => this.handleSubmit(
                            event,
                            loginWithEmail,
                            loginWithPhone
                          )}
                          handleChangeInput={this.handleChangeInput}
                        />
                      </div>
                    </Paper>
                  )}
                </Mutation>
              )}
            </Mutation>
          </Fade>
        )}
      </Popper>
    );
  }
}

SwitchAccount.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool,
  history: PropTypes.instanceOf(Object),
  anchorEl: PropTypes.instanceOf(Object),
  handleClose: PropTypes.func.isRequired
};

SwitchAccount.defaultProps = {
  history: {},
  open: false,
  anchorEl: ''
};

export default withStyles(SwitchAccountStyles)(withRouter(SwitchAccount));
