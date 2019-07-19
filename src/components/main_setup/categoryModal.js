import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
  Modal,
  Paper,
  Typography,
  IconButton,
  Popper,
  Button,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import { MainPreferencesStyles } from '../../assets/styles/setup';

const CategoryModal = (props) => {
  const {
    openModal,
    handleCloseModal,
    handleChange,
    handleDelete,
    handleConfirmChanges,
    stateData,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  function handleCloseBoth() {
    setAnchorEl(null);
    handleCloseModal();
  }

  const open = Boolean(anchorEl);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseBoth}
      style={MainPreferencesStyles.modal}
    >
      <Grid container item xs={7} style={MainPreferencesStyles.modalContent}>
        <Grid item xs={12}>
          <Paper style={MainPreferencesStyles.modalBody}>
            <Grid item style={MainPreferencesStyles.modalTitle}>
              <Grid item style={MainPreferencesStyles.modalSection}>
                <Typography variant="subtitle2">Category</Typography>
                <TextField
                  type="text"
                  value={stateData.name}
                  margin="none"
                  onChange={handleChange({ field: 'name', category: stateData.id })}
                  style={MainPreferencesStyles.modalTitleInput}
                />
              </Grid>
              <Grid item style={MainPreferencesStyles.modalSection}>
                <IconButton
                  aria-label="Done"
                  style={MainPreferencesStyles.categoryIcons}
                  onClick={handleConfirmChanges}
                >
                  <Done />
                </IconButton>
                <IconButton
                  aria-label="Done"
                  style={MainPreferencesStyles.categoryIcons}
                  onClick={handleClick}
                >
                  <Delete />
                </IconButton>
                <Popper open={open} anchorEl={anchorEl} style={MainPreferencesStyles.deletePopper}>
                  <Paper style={MainPreferencesStyles.deletePopperInner}>
                    <Typography>
                      Are you sure you want to delete this category?
                    </Typography>
                    <Grid container style={MainPreferencesStyles.deletePopperButtonsBox} align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleDelete(stateData.id);
                          handleCloseBoth();
                        }
                        }
                        style={MainPreferencesStyles.deletePopperButton}
                      >
                        Yes
                      </Button>
                      <Button variant="contained" color="secondary" onClick={handleClick}>No</Button>
                    </Grid>
                  </Paper>
                </Popper>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              style={MainPreferencesStyles.categoryRow}
            >
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">Default Sales Markup (%)</Typography>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    value={stateData.markup}
                    onChange={handleChange({ field: 'markup', category: stateData.id })}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">VAT Applicable</Typography>
                <TextField
                  select
                  value={stateData.isVatApplicable || false}
                  onChange={handleChange({ field: 'isVatApplicable', category: stateData.id })}
                  margin="normal"
                >
                  <MenuItem value>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">Loyalty Calculator</Typography>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    value={stateData.loyaltyWeight}
                    onChange={handleChange({ field: 'loyaltyWeight', category: stateData.id })}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

CategoryModal.defaultProps = {
  stateData: {
    id: '',
    name: '',
    markup: 0,
    isVatApplicable: false,
    loyaltyWeight: 0,
  }
};

CategoryModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleConfirmChanges: PropTypes.func.isRequired,
  stateData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    markup: PropTypes.number,
    isVatApplicable: PropTypes.bool,
    loyaltyWeight: PropTypes.number,
  })
};

export default CategoryModal;
