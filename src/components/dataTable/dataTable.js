import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DataTableOverride from '../../assets/styles/dataTable';

export const DataTable = (props) => {
  const {
    title, data, columns, options
  } = props;

  return (
    <MuiThemeProvider theme={DataTableOverride}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
};

export default DataTable;
