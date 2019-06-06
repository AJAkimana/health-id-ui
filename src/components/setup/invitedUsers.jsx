import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { AddUserStyles, OutletsTable } from '../../assets/css/setup';

const InvitedUsers = (props) => {
  const { state, handleClickAddButton, sendEditInfo } = props;
  const { users, email } = state;
  return (
    <React.Fragment>
      <Grid container spacing={8} style={AddUserStyles.addGrid}>
        <Grid>
          <AddIcon onClick={handleClickAddButton} />
        </Grid>
        <Grid>
          <Typography onClick={handleClickAddButton} style={AddUserStyles.underline}>
                Add New User
          </Typography>
        </Grid>
      </Grid>
      {users
        .map(user => (
          email !== user.email && (
            <div key={user.email} style={AddUserStyles.paper}>
              <Grid container spacing={8}>
                <Grid item xs={4}>{user.email}</Grid>
                <Grid item xs={4}>{user.isActive ? 'Verified' : <em>awaiting verification</em>}</Grid>
                <Grid item xs={4}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Paper
                            className="editPaper"
                            style={AddUserStyles.edit}
                            elevation={0}
                            onClick={() => sendEditInfo(user)}
                          >
                            <EditIcon
                              style={OutletsTable.icons}
                            />
                          </Paper>
                        </td>
                        <td>
                          <Paper
                            elevation={0}
                            style={AddUserStyles.autorenew}
                          >
                            <AutorenewIcon style={OutletsTable.icons} />
                          </Paper>
                        </td>
                        <td>
                          <Paper
                            elevation={0}
                            style={AddUserStyles.delete}
                          >
                            <DeleteIcon style={OutletsTable.icons} />
                          </Paper>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </div>
          )
        ))
      }
    </React.Fragment>
  );
};

InvitedUsers.propTypes = {
  handleClickAddButton: PropTypes.func.isRequired,
  sendEditInfo: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default InvitedUsers;
