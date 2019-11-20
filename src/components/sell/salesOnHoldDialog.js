import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, Slide, List, ListItem,
  ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar,
  Divider, Grid, Typography, Card, CardContent, IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { addCustomerDialog } from '../../assets/css/sellScreenStyles';
import productPlaceholder from '../../assets/images/sellScreen/productPlaceholder.png';
import { RetrieveIcon, CautionIcon } from '../../assets/SvgIcons/sellScreenSvgs';

const styles = addCustomerDialog;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SalesOnHoldDialog = ({
  state: {
    openSalesOnHoldDialog,
    salesOnHold,
  },
  handleCartNoteDialogClose,
  handleReturnSaleToCart,
}) => (
  <Dialog
    open={openSalesOnHoldDialog}
    maxWidth="sm"
    fullWidth
    TransitionComponent={Transition}
    onClose={handleCartNoteDialogClose}
    aria-labelledby="add-customer-dialog"
    id="add-customer-dialog"
    BackdropProps={{
      invisible: true
    }}
  >
    <DialogTitle
      id="alert-dialog-slide-title"
      style={addCustomerDialog.dialogTitle}
    >
        Sales on Hold
      </DialogTitle>
    <DialogContent style={addCustomerDialog.dialogContent}>
      {salesOnHold.length ? (
        <Grid container>
          <Grid item xs={12} style={addCustomerDialog.dialogContentGrid}>
            <List style={addCustomerDialog.list}>
              {salesOnHold.map(({ holdSaleNote, cartItems }) => (
                <React.Fragment key={holdSaleNote}>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={() => handleReturnSaleToCart(cartItems)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={productPlaceholder}
                        src={cartItems[0].image}
                        style={addCustomerDialog.productAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <React.Fragment>
                          <Grid style={addCustomerDialog.listedHeldItems}>
                            {cartItems.slice(0, 3).map(({ id, productName, quantity }) => (
                              <Typography
                                key={id}
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {`${quantity} x ${productName}`}
                              </Typography>
                            ))}
                            {cartItems.length > 3 && '...'}
                          </Grid>
                        </React.Fragment>
                      )}
                      secondary={(
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            inline
                          >
                              Note:
                              {' '}
                          </Typography>
                          {holdSaleNote}
                        </React.Fragment>
                      )}
                    />
                    <ListItemSecondaryAction>
                      <RetrieveIcon edge="end" style={addCustomerDialog.retrieveIcon} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      ) : (
        <Card style={addCustomerDialog.cardContent}>
          <CardContent>
            <IconButton
              aria-label="caution"
              disabled
              color="primary"
            >
              <CautionIcon style={addCustomerDialog.cautionIcon} />
            </IconButton>
            <Typography color="textSecondary">
                  Nothing on Hold
                </Typography>
          </CardContent>
        </Card>
      )}
    </DialogContent>
  </Dialog>
);

SalesOnHoldDialog.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleCartNoteDialogClose: PropTypes.func.isRequired,
  handleReturnSaleToCart: PropTypes.func.isRequired,
};

SalesOnHoldDialog.defaultProps = {
  state: {}
};

export default withStyles(styles)(SalesOnHoldDialog);
