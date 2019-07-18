import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import LowerDashboard from './LowerDashboard';
import logo from '../../../assets/images/ID Nav logo.png';
import dashboardStyles from '../../../assets/styles/dashboard/dashboardStyles';
import SVGIcon from './Icons';

export class Dashboard extends Component {
  state = {
    anchorEl: null,
    open: false,
    // eslint-disable-next-line react/destructuring-assignment
    isActive: this.props.isActive || 'grid1'
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogOut = () => {
    const { history } = this.props;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('rest_token');
    this.setState({ anchorEl: null, open: false });
    history.push('/');
  }

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

    const renderGrid = (id, name, imagestyle, label, link) => (
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Grid
          item
          id={id}
          onClick={this.handleOnClick}
          style={handleActiveGrid(id)}
        >
          <div style={styles.imgDiv}>
            <SVGIcon name={name} style={imagestyle} fill={handleActiveImage(id)} />
          </div>
          <Typography
            variant="overline"
            style={handleActiveText(id)}
          >
            {label}
          </Typography>
        </Grid>
      </Link>
    );

    return (
      <Grid container style={styles.appbar}>
        <Grid item>
          <img className="logo" src={logo} alt="some text" style={styles.logo} />
        </Grid>

        {renderGrid('grid1', 'Dashboard', styles.DashboardImg, 'DASHBOARD', '/')}
        {renderGrid('grid2', 'Sell', styles.innerImg, 'SELL', '/sell')}
        {renderGrid('grid3', 'Product', styles.productImg, 'PRODUCTS', '/products/approved')}
        {renderGrid('grid4', 'Suppliers', styles.suppliersImg, 'ORDERS & SUPPLIERS', '/')}
        {renderGrid('grid5', 'Cash', styles.cashImg, 'CASH & FINANCES', '/')}
        {renderGrid('grid6', 'Report', styles.ReportImg, 'REPORT', '/')}
        {renderGrid('grid7', 'Customer', styles.customersImg, 'CUSTOMERS', '/')}
        {renderGrid('grid8', 'Team', styles.teamImg, 'TEAM', '/')}
        {renderGrid('grid9', 'Settings', styles.settingsImg, 'SETUP', '/main_setup')}

      </Grid>
    );
  };

  render() {
    const { anchorEl, isActive, open } = this.state;
    // const open = Boolean(anchorEl);
    const { session: { me } } = this.props;

    return (
      <Fragment>
        {this.upperDashboard(isActive)}
        <LowerDashboard
          username={me.username}
          open={open}
          anchorEl={anchorEl}
          handleMenu={this.handleMenu}
          handleLogOut={this.handleLogOut}
          handleClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  isActive: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

Dashboard.defaultProps = {
  session: { me: {} },
  isActive: '',
  history: {},
};

export default withRouter(Dashboard);
