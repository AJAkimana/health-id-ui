import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';
import * as IconPaths from './productsSVGIconPaths';

const getIconStructure = (id) => {
  switch (id) {
  case 'expiry_icon':
    return (
      <g id="near_expiry" data-name="near expiry" transform="translate(0 -0.005)">
        <g id="Layer_1" data-name="Layer 1" transform="translate(0 0.005)">
          <path id="Path_33821" data-name="Path 33821" d={IconPaths.ManageExpirersPath.ClockFace} transform="translate(0 0.016)" />
          <path id="Path_33822" data-name="Path 33822" d={IconPaths.ManageExpirersPath.ElapsedTime} transform="translate(39.006 38.747)" />
          <path id="Path_33823" data-name="Path 33823" d={IconPaths.ManageExpirersPath.ClockSticks} transform="translate(70.565 39.01)" />
          <g id="iconfinder_product_4172167" transform="translate(255.694 61.982)">
            <path id="Path_33791" data-name="Path 33791" d={IconPaths.ManageExpirersPath.RightBoxFace} transform="translate(159.766 103.547)" />
            <path id="Path_33792" data-name="Path 33792" d={IconPaths.ManageExpirersPath.LeftBoxFace} transform="translate(-2.715 90.822)" />
            <path id="Subtraction_13" data-name="Subtraction 13" d={IconPaths.ManageExpirersPath.TopBoxFace} transform="translate(17.306 0)" />
          </g>
        </g>
      </g>
    );

  case 'export':
    return (
      <React.Fragment>
        <g id="Group_1609" data-name="Group 1609" transform="translate(120.364 0)">
          <g id="Group_1608" data-name="Group 1608" transform="translate(0 0)" fill="#757575">
            <path id="Path_33808" data-name="Path 33808" d={IconPaths.ExportListPath.Arrow} transform="translate(-132.64 -4.72)" />
          </g>
        </g>
        <g id="Group_1611" data-name="Group 1611" transform="translate(0 141.505)" fill="#757575">
          <g id="Group_1610" data-name="Group 1610" fill="#757575">
            <path id="Path_33809" data-name="Path 33809" d={IconPaths.ExportListPath.Frame} transform="translate(0 -155.28)" />
          </g>
        </g>
      </React.Fragment>
    );

  case 'eye':
    return (
      <React.Fragment>
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z" />
      </React.Fragment>
    );

  default:
    return <g />;
  }
};

const getViewBox = (id) => {
  switch (id) {
  case 'expiry_icon':
    return (
      IconPaths.ManageExpirersPath.viewBox
    );
  case 'export':
    return (
      IconPaths.ExportListPath.viewBox
    );
  case 'eye':
    return '0 0 24 24';
  default:
    return '0 0 594.449 443.735';
  }
};

const Icon = ({ id, className }) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    id={id}
    viewBox={getViewBox(id)}
    className={className}
  >
    {getIconStructure(id)}
  </SvgIcon>
);

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: ''
};

export default Icon;
