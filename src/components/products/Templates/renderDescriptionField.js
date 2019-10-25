import React from 'react';
import {
  TextField
} from '@material-ui/core';

const renderDescriptionField = (style, name, label, value) => (
  <TextField
    className={style}
    id={name}
    name={name}
    label={label}
    value={value}
    fullWidth
    InputProps={{ disableUnderline: true, readOnly: true }}
    multiline
    rows={4}
  />
);
export default renderDescriptionField;
