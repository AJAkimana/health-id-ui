import React from 'react';
import { TextField } from '@material-ui/core';

const renderTextField = (style, name, label, value) => (
  <TextField
    className={style}
    id={name}
    name={name}
    label={label}
    value={value}
    fullWidth
    InputProps={{ disableUnderline: true, readOnly: true }}
  />
);
export default renderTextField;
