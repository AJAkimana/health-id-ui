import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_PRODUCT_BY_ID } from '../../components/products/productQueries';
import ApproveProduct from '../../components/products/approveProduct';
import ProductLoader from '../../components/products/productLoader';
import withAuth from '../../components/withAuth';

export const ApproveProductDetail = (props) => {
  const { match: { params: { id } }, session } = props;
  return (
    <Query query={GET_PRODUCT_BY_ID} variables={{ id }}>
      {({
        data, loading, error, refetch
      }) => {
        if (loading) return <ProductLoader />;
        if (error) return <div>Error</div>;
        return (
          <ApproveProduct
            product={data.product}
            refetch={refetch}
            session={session}
          />
        );
      }}
    </Query>
  );
};

ApproveProductDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object)
};

ApproveProductDetail.defaultProps = {
  session: {}
};

export default withAuth(session => session && session.me.role.name === 'Master Admin')(withRouter(ApproveProductDetail));
