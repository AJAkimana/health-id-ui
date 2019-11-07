import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography,
  Popper,
  Button
} from '@material-ui/core';
import { supplierNoteStyle } from '../../../assets/styles/suppliers/suppliers';

const DeleteNoteConfirmationModel = (props) => {
  const {
    clickedNote,
    handleDelete,
    openConfirmationModel,
    handleDeleteConfirmationPopper,
    anchorEl
  } = props;


  return (

    <Popper
      open={openConfirmationModel}
      style={supplierNoteStyle.Popper}
      anchorEl={anchorEl}
    >
      <Paper style={supplierNoteStyle.deletePopperInner}>
        <Typography>
                        Are you sure you want to delete this supplier note?
        </Typography>
        <Grid
          container
          style={supplierNoteStyle.deletePopperButtonsBox}
          align="center"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteConfirmationPopper}
            style={supplierNoteStyle.deletePopperButton}
          >
                          No
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleDelete(clickedNote.id);
            }}
            style={supplierNoteStyle.deletePopperButton}
          >
                          Yes
          </Button>

        </Grid>
      </Paper>
    </Popper>


  );
};

DeleteNoteConfirmationModel.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  openConfirmationModel: PropTypes.bool.isRequired,
  handleDeleteConfirmationPopper: PropTypes.func.isRequired,
  clickedNote: PropTypes.instanceOf(Object).isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.shape({
    me: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }).isRequired
};

export default DeleteNoteConfirmationModel;
