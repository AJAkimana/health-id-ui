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

  case 'warehouse':
    return (
      <React.Fragment>
        <g id="warehouse" transform="translate(9.998 1)">
          <path id="Path_33895" data-name="Path 33895" d="M82,292.952a28.814,28.814,0,0,0,28.815-28.815V145.365A51.926,51.926,0,0,1,162.681,93.5H281.452a28.812,28.812,0,1,0,0-57.623H162.681A109.611,109.611,0,0,0,53.191,145.365V264.137A28.813,28.813,0,0,0,82,292.952Zm0,0" transform="translate(53.198 31.045)" fill="#757575" />
          <path id="Path_33896" data-name="Path 33896" d="M538.186,313.469a28.812,28.812,0,0,0-28.808,28.815V461.055a51.921,51.921,0,0,1-51.868,51.86H338.74a28.815,28.815,0,0,0,0,57.63H457.51A109.616,109.616,0,0,0,567,461.055V342.284A28.814,28.814,0,0,0,538.186,313.469Zm0,0" transform="translate(263.121 264.742)" fill="#757575" />
          <g id="Group_1819" data-name="Group 1819" transform="translate(138.001 669.438)">
            <path id="Path_33898" data-name="Path 33898" d="M60.75,422.265h60.817V624.872H60.75Zm0,0" transform="translate(-60.75 -422.265)" fill="#757575" />
            <path id="Path_33899" data-name="Path 33899" d="M125.059,422.265h60.817V624.872H125.059Zm0,0" transform="translate(-10.9 -422.265)" fill="#757575" />
          </g>
          <path id="Path_33903" data-name="Path 33903" d="M474.661,4.552,244.608,199.488a9.663,9.663,0,0,0,6.2,17.039h37.331V459.566a19.272,19.272,0,0,0,19.232,19.319h26.52V242.018a28.911,28.911,0,0,1,28.847-28.978H611.381a28.912,28.912,0,0,1,28.847,28.978V478.884h26.52a19.28,19.28,0,0,0,19.231-19.319V216.528H723.31a9.664,9.664,0,0,0,6.2-17.039L499.46,4.552a19.16,19.16,0,0,0-24.8,0ZM515.615,152.06h-57.1a28.978,28.978,0,0,1,0-57.956h57.1a28.978,28.978,0,0,1,0,57.956Zm0,0" transform="translate(-251.171 393.159)" fill="#424242" />
          <path id="Path_33904" data-name="Path 33904" d="M474.661,4.552,244.608,199.488a9.663,9.663,0,0,0,6.2,17.039h37.331V459.566a19.272,19.272,0,0,0,19.232,19.319h26.52V242.018a28.911,28.911,0,0,1,28.847-28.978H611.381a28.912,28.912,0,0,1,28.847,28.978V478.884h26.52a19.28,19.28,0,0,0,19.231-19.319V216.528H723.31a9.664,9.664,0,0,0,6.2-17.039L499.46,4.552a19.16,19.16,0,0,0-24.8,0ZM515.615,152.06h-57.1a28.978,28.978,0,0,1,0-57.956h57.1a28.978,28.978,0,0,1,0,57.956Zm0,0" transform="translate(204.925 -1)" fill="#424242" />
          <path id="Path_33901" data-name="Path 33901" d="M322.742,207.98H513.49V301.1H322.742Zm0,0" transform="translate(275.135 175.934)" fill="#757575" />
          <path id="Path_33902" data-name="Path 33902" d="M322.742,146.3H513.49V202.28H322.742Zm0,0" transform="translate(275.135 124.012)" fill="#757575" />
        </g>
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
  case 'warehouse':
    return '0 0 947.869 873.045';
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
