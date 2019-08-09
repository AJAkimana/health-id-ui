import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { MainPreferencesStyles } from '../../assets/styles/setup';

export const CategoryInput = (props) => {
  const { handleChange } = props;
  const { stateData } = props;
  const error = stateData.name.length < 1;

  return (
    <Grid
      container
      item
      xs={12}
      style={MainPreferencesStyles.categoryRow}
    >
      <Grid item xs={3} style={MainPreferencesStyles.categoryNameCell}>
        <TextField
          error={error}
          type="text"
          value={stateData.name}
          onChange={handleChange('name')}
          margin="dense"
          variant="filled"
          helperText="Required"
        />
      </Grid>
      <Grid item xs={3} style={MainPreferencesStyles.categoryCell} align="center">
        <TextField
          type="number"
          value={stateData.salesMarkup}
          onChange={handleChange('salesMarkup')}
          margin="dense"
          variant="filled"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
      </Grid>
      <Grid item xs={3} style={MainPreferencesStyles.categoryCell} align="center">
        <TextField
          select
          value={stateData.isVat || false}
          onChange={handleChange('isVat')}
          margin="dense"
          variant="filled"
        >
          <MenuItem value>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3} style={MainPreferencesStyles.categoryCell} align="center">
        <TextField
          type="number"
          value={stateData.loyalty}
          onChange={handleChange('loyalty')}
          margin="dense"
          variant="filled"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
      </Grid>
    </Grid>
  );
};

CategoryInput.defaultProps = {
  stateData: {
    name: '',
    salesMarkup: 0,
    isVat: false,
    loyalty: 0,
  },
};

CategoryInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  stateData: PropTypes.shape({
    name: PropTypes.string,
    salesMarkup: PropTypes.number,
    isVat: PropTypes.bool,
    loyalty: PropTypes.number,
  }),
};

export default CategoryInput;
