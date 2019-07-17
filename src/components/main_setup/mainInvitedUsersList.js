import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import User from './usersLists';
import { MainInvitedUsersStyles } from '../../assets/styles/setup';

const MainInvitedUsersList = ({ session }) => {
  const { me } = session;
  const { outlets } = me;

  return (
    outlets.map(
      outlet => (
        <Grid key={outlet.id} style={MainInvitedUsersStyles.category}>
          <Typography variant="h6">
            {outlet.name}
          </Typography>
          <User data={outlet.users} />
        </Grid>
      )
    )
  );
};

export default MainInvitedUsersList;
