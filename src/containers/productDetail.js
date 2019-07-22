import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import PRODUCT_DETAIL_QUERY from '../queries/productDetailQuery';
import ProductDetailRender from '../components/products/productDetailRender';
import ProductLoader from '../components/products/productLoader';
import withAuth from '../components/withAuth';

export const ProductDetail = (props) => {
  const { match: { params: { id } }, session } = props;

  return (
    <Query query={PRODUCT_DETAIL_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <ProductLoader />;
        if (error) return <div>Error</div>;

        return (
          <ProductDetailRender
            product={data.product}
            session={session}
          />
        );
      }}
    </Query>
  );
};

ProductDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object)
};

ProductDetail.defaultProps = {
  session: {}
};

export default withAuth(withRouter(ProductDetail));
