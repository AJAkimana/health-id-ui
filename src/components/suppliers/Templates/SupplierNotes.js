import React, { Fragment, Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@material-ui/core';
import Moment from 'react-moment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { CustomIconButton } from '../../stock_control/utils/utils';
import { tableStyles } from '../../../assets/styles/suppliers/supplierDetail';
import Modal from './SupplierNoteModal';
import DetailModal from './SupplierNoteDetailModal';
import withAuth from '../../withAuth';
import CREATE_SUPPLIER_NOTE from '../../../mutations/createSupplierNoteMutation';
import notify from '../../shared/Toaster';


export class SupplierNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModel: false,
      openDetailModel: false,
      note: '',
      clickedNote: {}
    };
  }

  handleopenAddModel = () => {
    this.setState(prevState => ({
      ...prevState,
      openAddModel: true
    }));
  }

  handleChange = (event) => {
    let { note } = this.state;
    note = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      note
    }));
  }

  handleSaveNote = () => {
    const { addSupplierNote } = this.props;

    const { supplier, session } = this.props;
    const { note } = this.state;
    const supplierId = supplier.id;
    const outletIds = session.me.outlets[0].id;
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


  handleRowClick = singleNote => () => {
    let { clickedNote } = this.state;
    clickedNote = singleNote;
    this.setState(prevState => ({
      ...prevState,
      clickedNote,
      openDetailModel: true
    }));
  }

  handleCloseModal = () => { this.setState({ openAddModel: false }); }

  handleCloseDetailModal = () => { this.setState({ openDetailModel: false }); }


  render() {
    const {
      classes, renderTableCell, supplier, session
    } = this.props;
    const {
      openAddModel, openDetailModel, note, clickedNote
    } = this.state;
    const notes = supplier.suppliernoteSet;

    return (
      <Fragment>
        <DetailModal
          openDetailModel={openDetailModel}
          handleCloseDetailModal={this.handleCloseDetailModal}
          clickedNote={clickedNote}
          session={session}
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
                buttonRef={(node) => {
                  this.SupplierNotes = node;
                }}
              >
                <NoteAddIcon />
              </CustomIconButton>
            </Grid>
          </Grid>

        </div>
        <Grid container spacing={8} className={classes.tableGrid}>
          {
            (notes && notes.length > 0) ? (
              <Grid item xs={12} style={tableStyles.noteHeader}>
                <Paper className={tableStyles.root}>
                  <Table className={tableStyles.table}>
                    <TableHead>
                      <TableRow style={tableStyles.noteRow}>
                        {renderTableCell('left', tableStyles.tableHeader, 'Created On')}
                        {renderTableCell('left', tableStyles.tableHeader, 'Message')}
                        {renderTableCell('left', tableStyles.tableHeader, 'Created By')}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notes && notes.map(singleNote => (
                        <TableRow
                          id="supplier-table-row"
                          key={singleNote.id}
                          style={tableStyles.noteRow}
                          onClick={this.handleRowClick(singleNote)}
                        >
                          <TableCell style={tableStyles.cell}>
                            <Moment format="DD/MM/YYYY \at h:mm a">
                              {singleNote.createdAt}
                            </Moment>
                          </TableCell>
                          <TableCell style={tableStyles.cellMiddle}>
                            {singleNote.note}
                          </TableCell>
                          <TableCell style={tableStyles.cell}>
                            {singleNote.supplier.user.firstName}
                            ,
                            {' '}
                            {singleNote.supplier.user.lastName}
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
  renderTableCell: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};


SupplierNotes.defaultProps = {
  refetch: () => { }
};

const ADD_SUPPLIER_NOTE = graphql(CREATE_SUPPLIER_NOTE, { name: 'addSupplierNote' });

export default withAuth(compose(ADD_SUPPLIER_NOTE)(SupplierNotes));
