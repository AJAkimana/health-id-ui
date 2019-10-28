import React from 'react';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { selectFieldStyles } from '../../assets/styles/setup';

// NOOPTIONSMESSAGE COMPONENT
export const NoOptionsMessage = ({ selectProps, innerProps, children }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
);

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.object),
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
NoOptionsMessage.defaultProps = {
  children: '<span />',
  innerProps: {}
};

// INPUT COMPONENT
export const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;
inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

// CONTROL COMPONENT
export const Control = ({
  children,
  innerProps,
  innerRef,
  selectProps,
}) => {
  const {
    classes,
    TextFieldProps,
    specificStyles,
    disableUnderline,
    label
  } = selectProps;
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      InputLabelProps={label ? { shrink: true } : label}
      InputProps={{
        inputComponent,
        disableUnderline,
        inputProps: {
          className: `${classes.input} ${specificStyles}`,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
};

Control.propTypes = {
  children: PropTypes.node.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.any).isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

// OPTION COMPONENT
export const Option = ({
  isFocused, isSelected, innerProps, children
}) => (
  <MenuItem
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
      overflowX: 'scroll',
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.any),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

Option.defaultProps = {
  children: <span />,
  innerProps: {},
  innerRef: {},
  isFocused: false,
  isSelected: false,
};

// PLACEHOLDER COMPONENT
export const Placeholder = ({ selectProps, innerProps }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {selectProps.placeholder}
  </Typography>
);

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.object),
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

Placeholder.defaultProps = {
  children: <span />,
  innerProps: {},
};

// MENU COMPONENT
export const Menu = ({ selectProps, innerProps, children }) => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.objectOf(PropTypes.any),
  selectProps: PropTypes.objectOf(PropTypes.any),
};

Menu.defaultProps = {
  children: <span />,
  innerProps: {},
  selectProps: {},
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
};
export const SelectField = ({
  onOptionChange, classes, options, value, specificStyles, defaultValue, isLoading,
  disableUnderline, placeholder, label
}) => (
  <Select
    classes={classes}
    styles={{ Input: () => ({ width: '300em' }) }}
    specificStyles={specificStyles}
    options={options}
    value={value}
    defaultValue={defaultValue}
    components={components}
    onChange={onOptionChange}
    autoFocus
    isLoading={isLoading}
    disableUnderline={disableUnderline}
    placeholder={placeholder}
    label={label}
  />
);

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onOptionChange: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string),
  specificStyles: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  defaultValue: PropTypes.objectOf(PropTypes.string),
  isLoading: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

SelectField.defaultProps = {
  options: [{}],
  onOptionChange: () => null,
  classes: '',
  value: undefined,
  specificStyles: '',
  defaultValue: undefined,
  isLoading: false,
  disableUnderline: true,
  placeholder: '',
  label: undefined
};

export default withStyles(selectFieldStyles)(SelectField);
