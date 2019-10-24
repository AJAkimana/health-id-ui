import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
  Grid,
  Modal,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Edit, Delete } from '@material-ui/icons';
import { supplierNoteStyle } from '../../../assets/styles/suppliers/suppliers';

const SupplierNoteDetailModal = (props) => {
  const {
    openDetailModel,
    handleCloseDetailModal,
    clickedNote,
    session
  } = props;
  return (
    <Modal
      open={openDetailModel}
      style={supplierNoteStyle.modal}
    >
      <Grid container item xs={7} style={supplierNoteStyle.modalContent}>
        <Grid item xs={12}>
          <Paper>
            <ClickAwayListener onClickAway={handleCloseDetailModal}>
              <Grid item>
                <Grid item style={supplierNoteStyle.modalTitle}>
                  <Typography style={supplierNoteStyle.titleStyle}>
                  Created on
                    {' '}
                    <Moment format="DD/MM/YYYY">
                      {clickedNote.createdAt}
                    </Moment>
                    {' '}
                  </Typography>
                  <Grid item>
                    <IconButton
                      aria-label="Edit"
                      onClick={handleCloseDetailModal}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="Close"
                      onClick={handleCloseDetailModal}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={supplierNoteStyle.noteBody}>
                {clickedNote.note}
              </Grid>
              <Grid style={supplierNoteStyle.noteFooter}>
                <Typography style={supplierNoteStyle.footerCaption}>
            Created by:
                </Typography>
                <Typography style={supplierNoteStyle.footerUser}>
                  {' '}
                  {session.me.firstName}
                  {' '}
                  {session.me.lastName}
                </Typography>
              </Grid>
            </ClickAwayListener>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};


SupplierNoteDetailModal.propTypes = {
  openDetailModel: PropTypes.bool.isRequired,
  handleCloseDetailModal: PropTypes.func.isRequired,
  clickedNote: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.shape({
    me: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }).isRequired
};

export default SupplierNoteDetailModal;
