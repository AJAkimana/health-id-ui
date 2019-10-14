import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import styles from '../../assets/styles/products/productsFooterStyles';

const CustomFooter = (props) => {
  const {
    handleChangePage,
    handleChangeRows,
    refetch,
    rowsCount,
    pageNumber,
    totalProductsPagesCount,
  } = props;

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={1000}>
          <Grid container style={styles.footerBox}>
            <Grid item style={styles.footerChangeRows}>
              <Typography variant="body2" style={styles.footerText}>Rows per page: </Typography>
              <Select
                value={rowsCount}
                onChange={handleChangeRows(refetch)}
                margin="none"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <Grid item>
                <IconButton disabled={pageNumber === 1}>
                  <KeyboardArrowLeft onClick={pageNumber !== 1 && handleChangePage('prev', refetch)} />
                </IconButton>
                <IconButton disabled={pageNumber === totalProductsPagesCount}>
                  <KeyboardArrowRight onClick={handleChangePage('next', refetch)} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

CustomFooter.defaultProps = {
  handleChangePage: () => { },
  handleChangeRows: () => { },
};

CustomFooter.propTypes = {
  handleChangePage: PropTypes.func,
  handleChangeRows: PropTypes.func,
  refetch: PropTypes.func.isRequired,
  rowsCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalProductsPagesCount: PropTypes.number.isRequired,
};

export default CustomFooter;
