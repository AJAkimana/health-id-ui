import React from 'react';
import ContentLoader from 'react-content-loader';

export const FormLoader = () => (
  <ContentLoader
    height={1600}
    width={600}
    speed={0.5}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
  >

    <rect x="100" y="50" rx="2" ry="2" width="380" height="20" />
    <rect x="100" y="100" rx="2" ry="2" width="180" height="2" />
    <rect x="300" y="100" rx="2" ry="2" width="180" height="2" />

    <rect x="100" y="120" rx="2" ry="2" width="180" height="2" />
    <rect x="300" y="120" rx="2" ry="2" width="180" height="2" />

    <rect x="100" y="140" rx="2" ry="2" width="380" height="2" />
    <rect x="100" y="160" rx="2" ry="2" width="380" height="2" />

    <rect x="100" y="180" rx="2" ry="2" width="180" height="2" />
    <rect x="300" y="180" rx="2" ry="2" width="180" height="2" />

    <rect x="100" y="200" rx="2" ry="2" width="180" height="2" />
    <rect x="390" y="200" rx="5" ry="5" width="10" height="10" />
    <rect x="430" y="200" rx="5" ry="5" width="10" height="10" />


    <rect x="100" y="220" rx="2" ry="2" width="180" height="40" />
    <rect x="300" y="220" rx="2" ry="2" width="180" height="40" />

  </ContentLoader>
);

export default FormLoader;
