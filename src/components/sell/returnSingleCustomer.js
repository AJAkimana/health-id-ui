import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, ListItem, ListItemText,
  ListItemSecondaryAction, ListItemAvatar, Avatar, Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { addedItems } from '../../assets/css/sellScreenStyles';
import { TrashIcon } from '../../assets/SvgIcons/sellScreenSvgs';

const styles = addedItems;

const ReturnSingleCustomer = ({
  customer,
  isSelected,
  handleDisplaySelectedCustomer,
  stringToColor,
  getInitials,
  removeSelectedCustomer,
}) => {
  const { firstName, primaryMobileNumber } = customer;
  let { lastName } = customer;
  lastName = lastName || '';

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        button
        disableGutters={!!isSelected}
        style={{
          paddingTop: 0,
          paddingBottom: `${isSelected ? '2px' : '4px'}`,
          marginTop: `${isSelected ? 0 : '4px'}`
        }}
        onClick={() => handleDisplaySelectedCustomer(customer, isSelected)}
      >
        <ListItemAvatar>
          <Avatar
            style={{
              borderRadius: 5,
              margin: 0,
              backgroundColor: stringToColor(firstName)
            }}
          >
            {getInitials(customer)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={addedItems.listItemText}
          primary={(
            <Typography
              component="span"
              variant="body2"
              style={{ color: `${isSelected ? '#cccccc' : 'textPrimary'}` }}
            >
              {`${firstName} ${lastName}`}
            </Typography>
          )}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              style={{ color: `${isSelected ? '#cccccc' : 'textPrimary'}` }}
            >
              {primaryMobileNumber}
            </Typography>
          )}
        />
        {isSelected && (
          <ListItemSecondaryAction>
            <TrashIcon
              edge="end"
              style={addedItems.listItemTrashIcon}
              onClick={removeSelectedCustomer}
            />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

ReturnSingleCustomer.propTypes = {
  customer: PropTypes.instanceOf(Object),
  isSelected: PropTypes.string,
  handleDisplaySelectedCustomer: PropTypes.func.isRequired,
  stringToColor: PropTypes.func.isRequired,
  getInitials: PropTypes.func.isRequired,
  removeSelectedCustomer: PropTypes.func.isRequired,
};

ReturnSingleCustomer.defaultProps = {
  customer: {},
  isSelected: ''
};

export default withStyles(styles)(ReturnSingleCustomer);
