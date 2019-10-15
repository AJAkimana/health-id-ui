import React from 'react';
import SeparatorStyles from '../../assets/styles/shared/separator';

const Separator = () => (
  <div id="separator" style={SeparatorStyles.mainDiv}>
    <div style={SeparatorStyles.subDiv1}>
      <span>
        <hr style={SeparatorStyles.horizontalLine} />
      </span>
    </div>
    <div style={SeparatorStyles.subDiv2}><span>OR</span></div>
    <div style={SeparatorStyles.subDiv1}>
      <span>
        <hr style={SeparatorStyles.horizontalLine} />
      </span>
    </div>
  </div>
);

export default Separator;
