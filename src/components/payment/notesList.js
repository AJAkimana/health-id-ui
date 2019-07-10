import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon, List } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const RenderNotesList = ({ products, mainCartNote }) => {
  let ProductsWithNotes;
  if (products.length > 0) {
    ProductsWithNotes = products.filter(product => (product.note !== ''));
  }
  if (ProductsWithNotes.length > 0) {
    return ProductsWithNotes.map(product => (
      <List key={product.productName} style={salesDialogStyles.noteList}>
        <ListItemIcon>
          <Fragment>
            <span>
              <CommentIcon />
            </span>
            {' '}
            <span style={salesDialogStyles.notesListName}>{`${product.productName}`}</span>
            <span style={salesDialogStyles.note}>{`${product.note}`}</span>
          </Fragment>
        </ListItemIcon>
      </List>
    ));
  }
  if (ProductsWithNotes.length === 0 && !mainCartNote) {
    return <span>No Notes Available</span>;
  }

  return null;
};

RenderNotesList.propTypes = {
  products: PropTypes.arrayOf(Object).isRequired,
  mainCartNote: PropTypes.string.isRequired
};


export default RenderNotesList;
