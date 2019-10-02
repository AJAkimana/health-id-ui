import React from 'react';
import ContentLoader from 'react-content-loader';

export const SingleSupplierPageLoader = () => (
  <ContentLoader
    height={1600}
    width={600}
    speed={1}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
  >
    <rect x="100" y="50" rx="2" ry="2" width="400" height="20" />
    <rect x="140" y="80" rx="2" ry="2" width="320" height="13" />
    <rect x="140" y="110" rx="3" ry="3" width="80" height="5" />
    <rect x="140" y="120" rx="3" ry="3" width="160" height="5" />
    <rect x="140" y="130" rx="3" ry="3" width="80" height="5" />
    <rect x="140" y="140" rx="3" ry="3" width="160" height="5" />
    <rect x="140" y="160" rx="3" ry="3" width="240" height="5" />
    <rect x="390" y="100" rx="100" ry="100" width="70" height="70" />
    <rect x="140" y="187" rx="0" ry="0" width="320" height="13" />
    <rect x="140" y="262" rx="0" ry="0" width="320" height="13" />
    <rect x="149" y="215" rx="0" ry="0" width="51" height="5" />
    <rect x="230" y="215" rx="0" ry="0" width="59" height="5" />
    <rect x="324" y="215" rx="0" ry="0" width="57" height="5" />
    <rect x="150" y="233" rx="0" ry="0" width="60" height="1" />
    <rect x="230" y="233" rx="0" ry="0" width="60" height="1" />
    <rect x="325" y="233" rx="0" ry="0" width="60" height="1" />
    <rect x="140" y="290" rx="0" ry="0" width="320" height="97" />
  </ContentLoader>
);

export default SingleSupplierPageLoader;
