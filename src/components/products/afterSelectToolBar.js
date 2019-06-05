import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditICon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AfterSelectToolBarStyles } from '../../assets/css/products';

const AfterSelectToolBar = (props) => {
  const {
    displayData, selectedRows, setSelectedRows, classes
  } = props;
  const handleClickInverseSelection = () => {
    const nextSelectedRows = displayData.reduce((nextSelectedRows, _, index) => {
      if (!selectedRows.data.find(selectedRow => selectedRow.index === index)) {
        nextSelectedRows.push(index);
      }

      return nextSelectedRows;
    }, []);

    setSelectedRows(nextSelectedRows);
  };

  const handleClickDeselectAll = () => {
    setSelectedRows([]);
  };

  const { iconButton, icon, inverseIcon } = classes;
  return (
    <div className="toolbar-select">
      <Tooltip title="Edit selected">
        <IconButton className={iconButton}>
          <EditICon className={icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Selected">
        <IconButton className={iconButton}>
          <DeleteIcon className={icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deselect ALL">
        <IconButton className={iconButton} onClick={handleClickDeselectAll}>
          <IndeterminateCheckBoxIcon className={icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Inverse selection">
        <IconButton className={iconButton} onClick={handleClickInverseSelection}>
          <CompareArrowsIcon className={[icon, inverseIcon].join(' ')} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

AfterSelectToolBar.propTypes = {
  displayData: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  selectedRows: PropTypes.instanceOf(Object).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
};

export default withStyles(AfterSelectToolBarStyles)(AfterSelectToolBar);
