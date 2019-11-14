import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

export const renderDetailsTypo = (heading, data, styles) => (
  <Fragment>
    <Typography variant="caption" style={styles}>
      {heading}
    </Typography>
    <Typography variant="caption">
      {data || 'not available'}
    </Typography>
  </Fragment>
);

export default renderDetailsTypo;
