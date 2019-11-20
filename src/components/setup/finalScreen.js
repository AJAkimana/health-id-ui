import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import dot from '../../assets/images/Complete-success icon@2x.png';
import register from '../../assets/images/Set up register illustration@2x.png';
import supplier from '../../assets/images/Create supplier list ilustration@2x.png';
import product from '../../assets/images/Create product list illustration@2x.png';
import { FinalScreenStyle } from '../../assets/styles/setup';
import { useStateValue } from '../../providers/stateProvider';

export const FinalScreen = ({ history }) => {
  const [route, setRoute] = useState('');
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    if (route) {
      history.push(route);
      dispatch({
        type: 'hideNavbar',
        payload: false
      });
    }
  }, [route]);

  const renderButton = (name, style, page) => (
    <Button
      variant="outlined"
      style={style}
      onClick={() => setRoute(page)}
    >
      {name}
    </Button>
  );

  return (
    <React.Fragment>
      <div>
        <Grid container style={FinalScreenStyle.container} alignItems="baseline">
          <Grid item style={FinalScreenStyle.main}>
            <div className="modalText" style={FinalScreenStyle.imageText}>
              <h1> You&#700;re all set</h1>
              <p>You have completed the basic setup and can now use HealthID</p>
            </div>
            <img className="logo" src={dot} alt="some text" style={FinalScreenStyle.logo} />
            <div>
              {renderButton('Open Dashboard', FinalScreenStyle.button, '/sell')}
            </div>
          </Grid>

          <Grid item xs={12} sm={4} lg={4} style={FinalScreenStyle.item}>
            <img className="product" src={product} alt="some text" style={FinalScreenStyle.productListImage} />
            <h6 style={FinalScreenStyle.modalTextBig}>CREATE PRODUCT LIST</h6>
            <p style={FinalScreenStyle.modalText}>
              Add individual products or import .csv list of products
            </p>
            {renderButton('ADD PRODUCT', FinalScreenStyle.productButton, '/product/add')}
          </Grid>

          <Grid item xs={12} sm={4} lg={4} style={FinalScreenStyle.item}>
            <img className="supplier" src={supplier} alt="some text" style={FinalScreenStyle.supplierListImage} />
            <h6 style={FinalScreenStyle.modalTextBig}>CREATE SUPPLIER LIST</h6>
            <p style={FinalScreenStyle.modalText}>
              Add individual products or import .csv list of suppliers
            </p>
            {renderButton('ADD SUPPLIER', FinalScreenStyle.productButton, '/suppliers/add')}
          </Grid>

          <Grid item xs={12} sm={4} lg={4} style={FinalScreenStyle.item}>
            <img className="register" src={register} alt="some text" style={FinalScreenStyle.registerImage} />
            <h6 style={FinalScreenStyle.modalTextBig}>SETUP REGISTERS</h6>
            <p style={FinalScreenStyle.modalText}>
              Add a new register and assign to a store attendant
            </p>
            {renderButton('ADD REGISTER', FinalScreenStyle.productButton, '/main_setup/outlets_registers/new')}
          </Grid>

        </Grid>
      </div>
    </React.Fragment>
  );
};

FinalScreen.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

FinalScreen.defaultProps = {
  history: {}
};

export default withRouter(FinalScreen);
