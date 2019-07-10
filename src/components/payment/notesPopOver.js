import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Popover, ListItemIcon, List
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import RenderNotesList from './notesList';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const Notes = ({
  isNotesPopperOpen,
  anchorEl,
  placement,
  handleClosePopOver,
  products,
  mainCartNote
}) => (
  <Popover
    id={1}
    open={isNotesPopperOpen}
    anchorEl={anchorEl}
    placement={placement}
    onClose={handleClosePopOver}
    PaperProps={salesDialogStyles.notesPaperProps}
    anchorOrigin={salesDialogStyles.notesPopOverAnchorOrigin}
    transformOrigin={salesDialogStyles.notesPopOverTransformOrigin}
  >
    <Grid container style={salesDialogStyles.notesPopOverGrid}>
      <Grid
        item
        xs={12}
        style={salesDialogStyles.notesPopOverGridItem}
      >
        <RenderNotesList products={products} mainCartNote={mainCartNote} />

        {
          mainCartNote && (
            <List key="main-cart-note" style={salesDialogStyles.noteList}>
              <ListItemIcon>
                <Fragment>
                  <span>
                    <CommentIcon />
                  </span>
                  {' '}
                  <span style={salesDialogStyles.notesListName}>General</span>
                  <span style={salesDialogStyles.note}>{mainCartNote}</span>
                </Fragment>
              </ListItemIcon>
            </List>
          )
        }

      </Grid>
    </Grid>
  </Popover>
);

Notes.propTypes = {
  isNotesPopperOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  placement: PropTypes.string.isRequired,
  handleClosePopOver: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  mainCartNote: PropTypes.string.isRequired,
};

export default Notes;
