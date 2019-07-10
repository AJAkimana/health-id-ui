const salesDialogStyles = {
  root: {
    hideBackdrop: 'true',
    invisible: 'true'
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  listItemText: {
    display: 'flex',
    justifyItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  salesSummary: {
    textAlign: 'center'
  },
  divider: {
    marginBottom: '0.3em'
  },
  subTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 18
  },
  discountTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 16,
  },
  sumHeaders: {
    fontSize: 20,
    fontWeight: 'bolder'
  },
  discountHeaders: {
    fontSize: 16,
    fontWeight: 'bolder'
  },
  paymentHeaders: {
    fontSize: 18,
    fontWeight: 'lighter'
  },
  total: {
    color: '#702632',
    fontWeight: 'bolder'
  },
  finalSaleTotal: {
    fontWeight: 'lighter'
  },
  recieptheader: {
    fontWeight: 100,
    color: '#707070'
  },
  finalSaleSum: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 18,
  },
  totalSum: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 18,
    color: '#702632',
  },
  makeSalediv: {
    textAlign: 'center',
    paddingBottom: '0.8em',
    paddingTop: '0.8em'
  },
  makeSaleButton: {
    width: '300px',
    padding: '1em',
    backgroundColor: '#f4f142'
  },
  radioButton: {
    marginLeft: '1em',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  saleButtonDiv: {
    textAlign: 'end',
    marginTop: '1em'
  },
  saleButton: {
    border: '1px solid',
    borderRadius: '10px',
    marginRight: '2.2em',
    width: '200px',
    padding: '0.5em',
    marginBottom: '1em',
    marginTop: '0.6em'
  },
  confirmClosePaperProps: {
    width: '100%'
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  gridContainer: {
    padding: '1em'
  },
  confirmButton: {
    margin: '1em',
    border: '2px solid',
    borderRadius: '25px',
    width: '100px',
  },
  titlePaperStyle: {
    width: '100%'
  },
  dialogTitleStyle: {
    fontSize: '28px'
  },
  showNotesGridStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    justifyItems: 'center'
  },
  notesIcon: {
    marginRight: '2.5em',
    width: '10%',
    marginTop: '1em',
    color: 'gray',
    cursor: 'pointer'
  },
  arrowLabel: {
    marginLeft: '0.6em',
    marginTop: '2.5em'
  },
  notesListName: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    color: '#702632'
  },
  note: {
    paddingLeft: '1em',
    textTransform: 'capitalize'
  },
  noteList: {
    padding: 0
  },
  notesPaperProps: {
    width: '100%'
  },
  notesPopOverAnchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  notesPopOverTransformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  notesPopOverGrid: {
    width: '100%'
  },
  notesPopOverGridItem: {
    padding: '1em'
  },
  cashInput: {
    width: '120px',
    fontSize: 18,
    marginBottom: '0.4em',
    alignSelf: 'center'
  },
  cashListItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5em'
  },
  paymentMethodText: {
    paddingTop: 0,
    paddingBottom: 0
  },
  productListCell: {
    borderBottom: 0,
    fontSize: 15,
    textTransform: 'capitalize',
    padding: 0
  },
  discountedTotalCell: {
    borderBottom: 0,
    fontSize: 15,
    padding: 0,
    paddingLeft: '30px'
  },
  productMeasurementUnit: {
    color: 'gray',
    textTransform: 'capitalize'
  },
  generalProductListCell: {
    borderBottom: 0,
    fontSize: 15
  },
  productTotalListElement: {
    marginLeft: '1.5em',
    marginRight: '1.5em'
  },
  discountSpan: {
    textDecoration: 'underline',
    color: '#1C7CFF'

  },
  totalSumList: {
    marginLeft: '1.5em',
    marginRight: '1.5em'
  },
  paymentFormControl: {
    marginRight: '7em'
  },
  paymentFormControlDiv: {
    marginRight: '20em'
  },
  recieptTableRow: {
    height: 0
  },
  receiptTableCell: {
    borderBottom: 0,
    fontSize: 10,
    textTransform: 'uppercase'
  },
  receiptDiscountTotal: {
    borderBottom: 0,
    fontSize: 11
  },
  receiptContainerGrid: {
    marginTop: '2em',
    marginBottom: '2em'
  },
  receiptPaper: {
    width: '520px',
    maxHeight: '700px',
    overflow: 'auto',
    marginBottom: '0.8em'
  },
  printGridItem: {
    flexBasis: '0%'
  },
  printIconButton: {
    padding: 0
  },
  printImage: {
    width: '4em'
  },
  printText: {
    textAlign: 'center'
  },
  customTableCell: {
    borderBottom: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    padding: 0,
    paddingLeft: '8px'
  },
  totalCostTableCell: {
    borderBottom: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    padding: 0,
    paddingLeft: '30px'
  },
  tableBodyDiv: {
    overflow: 'auto',
    height: '150px',
    paddingLeft: '42px'
  },
  dialogTableColumn1: {
    width: '40%',
    padding: 0
  },
  dialogTableColumn2: {
    width: '10%',
    padding: 0
  },
  customTableCellCol2: {
    width: '10%',
    textAlign: 'center',
    padding: 0
  },
  customTableCellDiv: {
    width: '100%',
    padding: 0,
    paddingLeft: '36px'
  },
  dialogTableColumn3: {
    width: '20%',
    padding: 0
  },
  dialogTableColumn4: {
    width: '10%',
    padding: 0
  },
  dialogTableColumn5: {
    width: '20%',
    padding: 0
  },
  discountColumn: {
    width: '10%',
    padding: 0,
    textAlign: 'center'
  },
  reciepttemplateMainDiv: {
    marginTop: '1em'
  },
  reciepttemplateGridContainer: {
    paddingBottom: '10px'
  },
  businessName: {
    textTransform: 'capitalize',
    lineHeight: 1.8,
    fontSize: '14px',
    fontWeight: 'bold'
  },
  address: {
    textTransform: 'capitalize',
    lineHeight: 1.8
  },
  contactNo: {
    fontSize: '12px',
    lineHeight: 1.8
  },
  tableDiv: {
    width: '520px',
    marginTop: '10px'
  },
  tableRow1: {
    height: 0,
    padding: 0
  },
  recieptNoCell: {
    color: '#424242',
    paddingLeft: '0.5em'
  },
  redundantCell: {
    padding: 0
  },
  dateCell: {
    color: '#424242',
    paddingRight: '0.5em'
  },
  generalRowStyle: {
    height: 0
  },
  row2: {
    height: '1px',
    borderBottom: '0.4px solid gray'
  },
  row3: {
    height: '8px'
  },
  rowRedundantCell: {
    borderBottom: 0,
    padding: 0
  },
  subtotalTitleCell: {
    borderBottom: 0,
    padding: 0,
    fontSize: 10
  },
  subtotalCell: {
    borderBottom: 0,
    fontSize: 11
  },
  purchaseTotalTitleCell: {
    padding: 0,
    fontSize: 10
  },
  purchaseTotalCell: {
    fontSize: 11
  },
  amountTitleCell: {
    padding: 0,
    fontSize: 10,
    fontWeight: 'bold'
  },
  amountCell: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  changeTitleCell: {
    borderBottom: 0,
    padding: 0,
    fontSize: 10,
    fontWeight: 'bold'
  },
  changeCell: {
    borderBottom: 0,
    fontSize: 11,
    fontWeight: 'bold'
  },
  redundantRow4: {
    height: '2px'
  },
  cashierCell: {
    fontSize: 10,
    paddingLeft: '0.8em',
    textTransform: 'capitalize'
  },
  registerCell: {
    fontSize: 11,
    paddingRight: '0.8em',
    textAlign: 'end'
  },
  barcodeGrid: {
    marginTop: '1em'
  },
  barcodeDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.8em'
  },
  barcodeImage: {
    width: '200px',
    height: '55px',
    display: 'flex',
    justifyContent: 'center'
  },
  thanksText: {
    fontSize: '12px'
  }

};

export default salesDialogStyles;
