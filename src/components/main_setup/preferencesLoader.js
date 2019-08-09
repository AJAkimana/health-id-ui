import React from 'react';
import ContentLoader from 'react-content-loader';

export const PreferencesLoader = () => (
  <ContentLoader
    height={1600}
    width={600}
    speed={1}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
  >
    <rect x="25" y="60" rx="3" ry="3" width="150" height="5" />
    <rect x="225" y="60" rx="3" ry="3" width="150" height="5" />
    <rect x="425" y="60" rx="3" ry="3" width="150" height="5" />

    <rect x="25" y="100" rx="3" ry="3" width="250" height="5" />
    <rect x="25" y="125" rx="3" ry="3" width="550" height="150" />

    <rect x="25" y="300" rx="3" ry="3" width="550" height="100" />
    <rect x="25" y="425" rx="3" ry="3" width="550" height="150" />
    <rect x="25" y="600" rx="3" ry="3" width="550" height="100" />
  </ContentLoader>
);

export default PreferencesLoader;
