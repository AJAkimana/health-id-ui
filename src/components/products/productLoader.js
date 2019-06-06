import React from 'react';
import ContentLoader from 'react-content-loader';

export const ProductLoader = () => (
  <ContentLoader
    height={1600}
    width={600}
    speed={1}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
  >
    <rect x="100" y="50" rx="2" ry="2" width="400" height="20" />
    <rect x="140" y="80" rx="2" ry="2" width="320" height="13" />
    <rect x="140" y="110" rx="3" ry="3" width="240" height="5" />
    <rect x="140" y="120" rx="3" ry="3" width="240" height="5" />
    <rect x="140" y="130" rx="3" ry="3" width="240" height="5" />
    <rect x="140" y="140" rx="3" ry="3" width="240" height="5" />
    <rect x="390" y="100" rx="5" ry="5" width="70" height="70" />
  </ContentLoader>
);

export default ProductLoader;
