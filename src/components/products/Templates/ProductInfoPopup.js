import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,

  Grid,
  Chip,
  Tooltip,
  IconButton
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';
import { forwardIcon } from '../productIcons';

export class ProductInfoPopup extends Component {
  state = {
    defaultIcon: 'https://res.cloudinary.com/dojaopytm/image/upload/v1558444184/productPlaceholder.png',
  }

  render() {
    const { defaultIcon } = this.state;
    const {
      row: {
        productName, description, image, tags, id
      },
      position: { x, y },
      classes,
      handleHidePopup,
      onForwardButtonClick
    } = this.props;
    return (
      <div
        id="product_popup_informati"
      >
        <Popper
          style={{
            width: '500px', position: 'absolute', left: `${x}px`, top: `${y}px`
          }}
          open
          transition
          disablePortal
        >
          <Paper>
            <ClickAwayListener onClickAway={handleHidePopup}>
              <Grid
                style={ToolbarStyles.pipmain}
              >
                <Grid xs>
                  <p style={ToolbarStyles.piptitle}>{productName}</p>
                </Grid>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid item xs={image === defaultIcon || image === 'none' ? 11 : 9}>
                    <span
                      style={ToolbarStyles.pipdescription}
                    >
                      {description}
                    </span>
                  </Grid>
                  {
                    (image !== defaultIcon) && (
                      <Grid
                        item
                        xs
                      >
                        <img
                          style={{ width: '100px', height: '100px' }}
                          src={image}
                          alt=""
                        />
                      </Grid>
                    )
                  }
                </Grid>
                <Grid
                  style={{ marginTop: `${image === defaultIcon || image === 'none' ? '20px' : '0px'}` }}
                  container
                  spacing={2}
                >
                  <Grid item xs={10}>
                    <Paper elevation={0} className={classes.tagsRoot}>
                      {tags.map(tag => (
                        <Chip
                          style={ToolbarStyles.piptags}
                          key={tags.indexOf(tag)}
                          label={tag}
                          id="tag-chip"
                        />
                      ))}
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Tooltip title="View Product Detail">
                      <IconButton
                        className={classes.iconButton}
                        aria-haspopup="true"
                        onClick={() => {
                          onForwardButtonClick(id);
                        }}
                      >
                        <img
                          alt=""
                          style={ToolbarStyles.pippicon}
                          src={forwardIcon}
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </ClickAwayListener>
          </Paper>

        </Popper>

      </div>
    );
  }
}
ProductInfoPopup.propTypes = {
  row: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  position: PropTypes.instanceOf(Object).isRequired,
  handleHidePopup: PropTypes.func.isRequired,
  onForwardButtonClick: PropTypes.func.isRequired

};
export default withStyles(ToolbarStyles)(ProductInfoPopup);
