import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import LowerDashboard from './LowerDashboard';
import logo from '../../../assets/images/ID Nav logo.png';
import dashboardStyles from '../../../assets/css/dashboardStyles';
import SVGIcon from './Icons';


class Dashboard extends Component {
  state = {
    anchorEl: null,
    isActive: 'grid1'
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOnClick = (event) => {
    const { isActive } = this.state;

    if (isActive) {
      this.setState({
        isActive: ''
      });
    }

    switch (event.currentTarget.id) {
    case 'grid1':
      this.setState({ isActive: 'grid1' });
      break;
    case 'grid2':
      this.setState({ isActive: 'grid2' });
      break;
    case 'grid3':
      this.setState({ isActive: 'grid3' });
      break;
    case 'grid4':
      this.setState({ isActive: 'grid4' });
      break;
    case 'grid5':
      this.setState({ isActive: 'grid5' });
      break;
    case 'grid6':
      this.setState({ isActive: 'grid6' });
      break;
    case 'grid7':
      this.setState({ isActive: 'grid7' });
      break;
    case 'grid8':
      this.setState({ isActive: 'grid8' });
      break;
    case 'grid9':
      this.setState({ isActive: 'grid9' });
      break;
    default:
      break;
    }
  }

  upperDashboard = (isActive) => {
    const styles = dashboardStyles();

    const handleActiveGrid = (gridId) => {
      let style = styles.gridItem;
      if (isActive === gridId) {
        style = styles.activeGridItem;
      }
      return style;
    };

    const handleActiveText = (gridId) => {
      let style = styles.typographyText;
      if (isActive === gridId) {
        style = styles.ActiveTypographyText;
      }
      return style;
    };

    const handleActiveImage = (gridId) => {
      let fill = 'white';
      if (isActive === gridId) {
        fill = '';
      }
      return fill;
    };

    return (
      <Grid container style={styles.appbar}>
        <Grid item>
          <img className="logo" src={logo} alt="some text" style={styles.logo} />
        </Grid>

        <Grid
          item
          id="grid1"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid1')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Dashboard" style={styles.innerImg} fill={handleActiveImage('grid1')} />
          </div>
          <Typography
            variant="overline"
            style={handleActiveText('grid1')}
          >
            DASHBOARD
          </Typography>
        </Grid>

        <Grid
          item
          id="grid2"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid2')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Sell" style={styles.innerImg} fill={handleActiveImage('grid2')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid2')}>SELL</Typography>
        </Grid>

        <Grid
          item
          id="grid3"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid3')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Product" style={styles.productImg} fill={handleActiveImage('grid3')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid3')}>PRODUCTS</Typography>
        </Grid>

        <Grid
          item
          id="grid4"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid4')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Suppliers" style={styles.suppliersImg} fill={handleActiveImage('grid4')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid4')}>ORDERS & SUPPLIERS</Typography>
        </Grid>

        <Grid
          item
          id="grid5"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid5')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Cash" style={styles.suppliersImg} fill={handleActiveImage('grid5')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid5')}>CASH & FINANCES</Typography>
        </Grid>

        <Grid
          item
          id="grid6"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid6')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Report" style={styles.innerImg} fill={handleActiveImage('grid6')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid6')}>REPORT</Typography>
        </Grid>

        <Grid
          item
          id="grid7"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid7')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Customer" style={styles.customersImg} fill={handleActiveImage('grid7')} />

          </div>
          <Typography variant="overline" style={handleActiveText('grid7')}>CUSTOMERS</Typography>
        </Grid>

        <Grid
          item
          id="grid8"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid8')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Team" style={styles.innerImg} fill={handleActiveImage('grid8')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid8')}>TEAM</Typography>
        </Grid>

        <Grid
          item
          id="grid9"
          onClick={this.handleOnClick}
          style={handleActiveGrid('grid9')}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name="Settings" style={styles.innerImg} fill={handleActiveImage('grid9')} />
          </div>
          <Typography variant="overline" style={handleActiveText('grid9')}>SETUP</Typography>
        </Grid>

      </Grid>
    );
  };

  render() {
    const { anchorEl, isActive } = this.state;
    const open = Boolean(anchorEl);
    const { session: { me } } = this.props;

    return (
      <Fragment>
        {this.upperDashboard(isActive)}
        <LowerDashboard
          username={me.username}
          open={open}
          anchorEl={anchorEl}
          handleMenu={this.handleMenu}
          handleClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
};

Dashboard.defaultProps = {
  session: { me: {} },
};

export default Dashboard;
