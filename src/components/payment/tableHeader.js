import React from 'react';
import {
  TableHead, TableRow, Table
} from '@material-ui/core';
import CustomTableHeaderCell from './customTableHeaderCell';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const RenderTableHeader = () => (
  <div style={salesDialogStyles.customTableCellDiv}>
    <Table>
      <colgroup>
        <col style={salesDialogStyles.dialogTableColumn1} />
        <col style={salesDialogStyles.customTableCellCol2} />
        <col style={salesDialogStyles.dialogTableColumn3} />
        <col style={salesDialogStyles.dialogTableColumn4} />
        <col style={salesDialogStyles.dialogTableColumn5} />
      </colgroup>
      <TableHead>
        <TableRow>
          <CustomTableHeaderCell label="ITEM" style={salesDialogStyles.customTableCell} />
          <CustomTableHeaderCell label="QTY" style={salesDialogStyles.customTableCell} />
          <CustomTableHeaderCell label="UNIT COST" style={salesDialogStyles.customTableCell} />
          <CustomTableHeaderCell label="DISCOUNT" style={salesDialogStyles.customTableCell} />
          <CustomTableHeaderCell label="TOTAL COST" style={salesDialogStyles.totalCostTableCell} />
        </TableRow>
      </TableHead>
    </Table>
  </div>
);

export default RenderTableHeader;
