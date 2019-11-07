import React, { Fragment, Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import Moment from 'react-moment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { CustomIconButton } from '../../stock_control/utils/utils';
import { tableStyles } from '../../../assets/styles/suppliers/supplierDetail';
import Modal from './SupplierNoteModal';
import withAuth from '../../withAuth';
import CREATE_SUPPLIER_NOTE from '../../../mutations/createSupplierNoteMutation';
import DELETE_SINGLE_SUPPLIER_NOTE from '../../../mutations/deleteSupplierNoteMutation';
import UPDATE_SINGLE_SUPPLIER_NOTE from '../../../mutations/updateSupplierNoteMutation';
import notify from '../../shared/Toaster';
import DeleteNoteConfirmationModel from './DeleteNoteConfirmationModel';


export class SupplierNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModel: false,
      openConfirmationModel: false,
      openDetailModel: false,
      note: '',
      noteId: '',
      hoveredNoteId: '',
      anchorEl: '',
      clickedNote: {}
    };
  }

  handleopenAddModel = (singleNote) => {
    let { noteId, note } = this.state;
    if (noteId) {
      noteId = singleNote.id;
      note = singleNote.note;
    } else {
      noteId = '';
      note = '';
    }
    this.setState(prevState => ({
      ...prevState,
      noteId,
      note,
      openAddModel: true
    }));
  }

  handleopenConfirmationModel = () => {
    this.setState(prevState => ({
      ...prevState,
      openConfirmationModel: true
    }));
  }

  handleChange = (event) => {
    let { note } = this.state;
    note = event.target.value;
    this.setState({ note });
  }

  handleSaveNote = () => {
    const { addSupplierNote, updateSupplierNote } = this.props;

    const { supplier, session } = this.props;
    const { note, noteId } = this.state;
    const supplierId = supplier.id;
    const outletIds = session.me.outlets[0].id;
    if (noteId) {
      updateSupplierNote({
        variables: {
          id: noteId,
          note,
          outletIds,
          supplierId
        }
      }).then(() => {
        const { refetch } = this.props;
        notify('Note updated successfully');
        this.handleCloseModal();
        refetch();
      })
        .catch((err) => {
          const { message } = err.graphQLErrors[0];
          notify(message);
        });
    } else {
      addSupplierNote({
        variables: {
          note,
          outletIds,
          supplierId
        }
      }).then(() => {
        const { refetch } = this.props;
        notify('Note created successfully');
        this.handleCloseModal();
        refetch();
      })
        .catch((err) => {
          const { message } = err.graphQLErrors[0];
          notify(message);
        });
    }
  }


  handleCloseModal = () => { this.setState({ openAddModel: false }); }

  handleDeleteConfirmationPopper = () => { this.setState({ openConfirmationModel: false }); }


  handleDelete = (id) => {
    const { deleteSupplierNote, refetch } = this.props;

    return deleteSupplierNote({
      variables: {
        id,
      }
    }).then(
      () => {
        notify('Supplier Note has been deleted successfully');
        refetch();
        this.setState(
          {
            openAddModel: false,
            openDetailModel: false,
            note: '',
            clickedNote: {}
          }
        );
        this.handleDeleteConfirmationPopper();
      }
    ).catch((err) => {
      const { message } = err.graphQLErrors[0];
      notify(message);
    });
  }

  handleOnRowHover = (singleNote, event) => {
    let {
      hoveredNoteId, noteId, clickedNote, anchorEl
    } = this.state;
    hoveredNoteId = event.currentTarget.id;
    noteId = singleNote.id;
    clickedNote = singleNote;
    anchorEl = event.currentTarget;
    this.setState(prevState => ({
      ...prevState,
      hoveredNoteId,
      noteId,
      clickedNote,
      anchorEl
    }));
  }

  handleMouseLeave=() => {
    const { hoveredNoteId } = this.state;
    this.setState({ hoveredNoteId: '' });
    if (hoveredNoteId) {
      this.setState(prevState => ({
        ...prevState,
        hoveredNoteId: ''
      }));
    }
  }

  render() {
    const {
      classes, renderTableCell, supplier,
    } = this.props;
    const {
      openAddModel, note, hoveredNoteId, clickedNote, openConfirmationModel, anchorEl
    } = this.state;
    const notes = supplier.suppliernoteSet;
    return (
      <Fragment>
        <DeleteNoteConfirmationModel
          openConfirmationModel={openConfirmationModel}
          clickedNote={clickedNote}
          handleDelete={this.handleDelete}
          handleDeleteConfirmationPopper={this.handleDeleteConfirmationPopper}
          anchorEl={anchorEl}
        />
        <Modal
          openAddModel={openAddModel}
          handleCloseModal={this.handleCloseModal}
          handleChange={this.handleChange}
          handleSaveNote={this.handleSaveNote}
          note={note}
        />
        <div className={classes.dividerDiv}>
          <Grid
            container
            justify="space-between"
            spacing={16}
            style={tableStyles.header}
          >
            <Grid item xs={4}>
              <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
                Supplier Notes
              </Typography>
            </Grid>
            <Grid item xs={1} style={tableStyles.logo}>
              <CustomIconButton
                toolTip="Add supplier note"
                onClickHandler={this.handleopenAddModel}
              >
                <NoteAddIcon />
              </CustomIconButton>
            </Grid>
          </Grid>

        </div>
        <Grid container spacing={8} className={classes.tableGrid} style={{ borderBottom: 'none !important' }}>
          {
            (notes && notes.length > 0) ? (
              <Grid item xs={12} style={tableStyles.noteHeader}>
                <Paper className={tableStyles.root}>
                  <Table className={tableStyles.table}>
                    <TableHead>
                      <TableRow style={tableStyles.noteRow}>
                        {renderTableCell('left', tableStyles.tableHeader, 'Created On')}
                        {renderTableCell('left', tableStyles.tableHeaderCenter, 'Message')}
                        {renderTableCell('left', tableStyles.tableHeaderCenter, 'Created By')}
                        {renderTableCell('center', tableStyles.tableHeaderCenter, '')}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notes && notes.map(singleNote => (
                        <TableRow
                          hover
                          id={singleNote.id}
                          key={singleNote.id}
                          style={tableStyles.noteRow}
                          onMouseEnter={event => this.handleOnRowHover(singleNote, event)}
                          onMouseLeave={this.handleMouseLeave}
                        >
                          <TableCell style={tableStyles.cell}>
                            <Moment format="DD/MM/YYYY \at h:mm a">
                              {singleNote.createdAt}
                            </Moment>
                          </TableCell>
                          <TableCell style={tableStyles.cellMiddle}>
                            {singleNote.note}
                          </TableCell>
                          <TableCell style={tableStyles.cellRight}>
                            {singleNote.supplier.user.firstName}
                            {' '}
                            {singleNote.supplier.user.lastName}
                          </TableCell>
                          <TableCell style={tableStyles.cellButtonRight}>
                            <Grid style={tableStyles.cellIcon}>
                              {hoveredNoteId === singleNote.id ? (
                                <Fragment>
                                  <IconButton
                                    aria-label="Edit"
                                    onClick={() => this.handleopenAddModel(singleNote)}
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    aria-label="Close"
                                    onClick={this.handleopenConfirmationModel}
                                    style={tableStyles.iconButtons}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Fragment>
                              )
                                : (
                                  <Fragment>
                                    <IconButton />
                                    <IconButton />
                                  </Fragment>
                                )
                              }
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            ) : 'No note yet'
          }
        </Grid>
      </Fragment>
    );
  }
}

SupplierNotes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object).isRequired,
  addSupplierNote: PropTypes.func.isRequired,
  deleteSupplierNote: PropTypes.func.isRequired,
  updateSupplierNote: PropTypes.func.isRequired,
  renderTableCell: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};


SupplierNotes.defaultProps = {
  refetch: () => { }
};

const ADD_SUPPLIER_NOTE = graphql(CREATE_SUPPLIER_NOTE, { name: 'addSupplierNote' });
const DELETE_SUPPLIER_NOTE = graphql(DELETE_SINGLE_SUPPLIER_NOTE, { name: 'deleteSupplierNote' });
const UPDATE_SUPPLIER_NOTE = graphql(UPDATE_SINGLE_SUPPLIER_NOTE, { name: 'updateSupplierNote' });


export default withAuth(
  compose(ADD_SUPPLIER_NOTE, DELETE_SUPPLIER_NOTE, UPDATE_SUPPLIER_NOTE)(SupplierNotes)
);
