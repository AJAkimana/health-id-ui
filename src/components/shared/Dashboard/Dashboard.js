import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import LowerDashboard from './LowerDashboard';
import logo from '../../../assets/images/ID Nav logo.png';
import dashboardStyles from '../../../assets/styles/dashboard/dashboardStyles';
import SVGIcon from './Icons';

import { StateContext } from '../../../providers/stateProvider';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { isActive } = this.props;
    this.state = {
      anchorEl: null,
      isActive: isActive || 'grid1'
    };
  }

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
    localStorage.removeItem('outletId');
    this.setState({ anchorEl: null, open: false });
    history.push('/');
  }

  handleOnClick = (event) => {
    const [, dispatch] = Object.values(this.context);
    const { isActive } = this.state;

    if (isActive) {
      this.setState({
        isActive: ''
      });
    }

    switch (event.currentTarget.id) {
    case 'grid1':
      dispatch({
        type: 'changeGrid',
        grid: 'grid1'
      });
      break;
    case 'grid2':
      dispatch({
        type: 'changeGrid',
        grid: 'grid2'
      });
      break;
    case 'grid3':
      dispatch({
        type: 'changeGrid',
        grid: 'grid3'
      });
      break;
    case 'grid4':
      dispatch({
        type: 'changeGrid',
        grid: 'grid4'
      });
      break;
    case 'grid5':
      dispatch({
        type: 'changeGrid',
        grid: 'grid5'
      });
      break;
    case 'grid6':
      dispatch({
        type: 'changeGrid',
        grid: 'grid6'
      });
      break;
    case 'grid7':
      dispatch({
        type: 'changeGrid',
        grid: 'grid7'
      });
      break;
    case 'grid8':
      dispatch({
        type: 'changeGrid',
        grid: 'grid8'
      });
      break;
    case 'grid9':
      dispatch({
        type: 'changeGrid',
        grid: 'grid9'
      });
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

        {renderGrid('grid1', 'Dashboard', styles.DashboardImg, 'DASHBOARD', '/comingsoon')}
        {renderGrid('grid2', 'Sell', styles.innerImg, 'SELL', '/sell')}
        {renderGrid('grid3', 'Product', styles.productImg, 'PRODUCTS', '/products/approved')}
        {renderGrid('grid4', 'Suppliers', styles.suppliersImg, 'ORDERS & SUPPLIERS', '/orders/open')}
        {renderGrid('grid5', 'Cash', styles.cashImg, 'CASH & FINANCES', '/comingsoon')}
        {renderGrid('grid6', 'Report', styles.ReportImg, 'REPORT', '/comingsoon')}
        {renderGrid('grid7', 'Customer', styles.customersImg, 'CUSTOMERS', '/comingsoon')}
        {renderGrid('grid8', 'Team', styles.teamImg, 'TEAM', '/comingsoon')}
        {renderGrid('grid9', 'Settings', styles.settingsImg, 'SETUP', '/main_setup')}

      </Grid>
    );
  };

  static contextType = StateContext;

  render() {
    const [{ grid: { isActive } }, dispatch] = Object.values(this.context);
    const { anchorEl, open } = this.state;
    const { session: { me } } = this.props;
    if (_.isEmpty(me)) {
      return null;
    }
    const { activeOutlet } = me;

    return (
      <Fragment>
        {this.upperDashboard(isActive, dispatch)}
        <LowerDashboard
          username={me.username}
          activeOutlet={activeOutlet}
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
