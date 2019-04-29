import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const Dialog = withStyles(() => ({
  paper: {
    width: '85%',
    height: '75%',
    backgroundColor: '#424242',
  }
}))(MuiDialog);

export const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#424242',
    margin: 0,
    padding: theme.spacing.unit * 4,
    height: '47%'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.primary.main,
  },
}))((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles(() => ({
  root: {
    margin: 0,
    backgroundColor: '#535353',
    color: '#E8E8E8',
  },
}))(MuiDialogContent);
