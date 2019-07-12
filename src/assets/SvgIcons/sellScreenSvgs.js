import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export const NotesIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" className="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
  </SvgIcon>
);

export const UserIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
  </SvgIcon>
);

export const TrashIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
  </SvgIcon>
);

export const ArchieveIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="archive" className="svg-inline--fa fa-archive fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V160H32v288zm160-212c0-6.6 5.4-12 12-12h104c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.3 32 0 46.3 0 64v48c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32z" />
  </SvgIcon>
);

export const PauseIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" className="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" />
  </SvgIcon>
);

export const RetrieveIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-square" className="svg-inline--fa fa-share-square fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path fill="currentColor" d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z" />
  </SvgIcon>
);

export const CautionIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="svg-inline--fa fa-exclamation-triangle fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
  </SvgIcon>
);

export const CaretUpIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" />
  </SvgIcon>
);

export const CaretDownIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="svg-inline--fa fa-caret-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
  </SvgIcon>
);

export const HistoryIcon = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
    <path d="M0,0H35V35H0Z" fill="none" opacity="0.5" />
    <path d="M13.291,17.334c1.691-3.161,4.962-5.844,8.9-5.844,5.953,0,9.774,4.406,10.186,10.309h1.579C33.817,14.511,28.658,10,22.186,10a11.476,11.476,0,0,0-10.219,6.084L10,14.209v4.633h4.689Zm8.179,5.681L17.832,26.14l1.048,1.048,4.173-3.64v-7.3H21.49v6.765Zm-9.3,2.186-.074-.092H10.533a11.971,11.971,0,0,0,10.406,8.86V32.406C17.189,31.949,14.135,29.742,12.168,25.2ZM28.235,35H35V33.436H28.235Zm0-4.173H35V29.265H28.235Zm0-5.735v1.561H35V25.092Zm-3.658,1.564h2.077V25.094H24.577Zm0,4.171h2.077V29.265H24.577Zm0,4.173h2.077V33.436H24.577Zm-3.62-1.046Z" transform="translate(-5 -5)" fill="#424242" stroke="#424242" strokeWidth="0.8px" opacity="0.5" />
  </SvgIcon>
);

export const DiscountIcon = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
    <path d="M549.546,452.141c.3-.3.45-.615.233-.832s-.532-.059-.832.24-.427.638-.227.838S549.21,452.478,549.546,452.141Z" transform="translate(-539.181 -443.482)" fill="#e8e8e8" />
    <path d="M64.559,40.193c-.342-.346-9.246-9.293-9.246-9.293l-3.859.114-1.21,1.215a15.078,15.078,0,0,1,.945,1.238,1.522,1.522,0,0,1,.722-.18,1.557,1.557,0,1,1-1.447,1.019,15.45,15.45,0,0,1-1.229-1.061l-.936.941v4l9.225,9.269a.4.4,0,0,0,.654,0c.378-.381,6.382-6.414,6.382-6.414S64.9,40.538,64.559,40.193Zm-7.766-2.133a1.344,1.344,0,0,1,1.989-.108,1.267,1.267,0,0,1-.1,1.9,1.351,1.351,0,0,1-1.994.145A1.309,1.309,0,0,1,56.793,38.061Zm-2.9-.381.519-.521,1.347,1.353-.521.519ZM59.7,43.658a1.347,1.347,0,0,1-1.989.14,1.306,1.306,0,0,1,.1-1.921,1.343,1.343,0,0,1,1.983-.114A1.267,1.267,0,0,1,59.7,43.658Zm-3.947-1.808-.422-.423L60.7,39.894l.417.418Z" transform="translate(-47.711 -30.62)" fill="#e8e8e8" />
    <path d="M607.832,669.783c-.313.305-.427.638-.233.833s.49.091.823-.242c.3-.3.45-.615.236-.829S608.126,669.487,607.832,669.783Z" transform="translate(-597.033 -657.872)" fill="#e8e8e8" />
    <path d="M13.428,16.194a.056.056,0,0,0,.032-.008c.193-.194-1-1.776-2.61-3.464a1.42,1.42,0,0,0-.24-.023.53.53,0,0,0-.418.149.593.593,0,0,0-.051.5C11.174,14.458,12.963,16.194,13.428,16.194Z" transform="translate(-10.113 -12.7)" fill="#e8e8e8" />
  </SvgIcon>
);

export const CalenderIcon = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 31 31">
    <path d="M28,11.687V3.813H23.5V1H22.375V3.813H6.625V1H5.5V3.813H1V28H28ZM2.125,4.937H5.5V7.75H6.625V4.937h15.75V7.75H23.5V4.937h3.375v5.625H2.125Zm0,21.938V11.687h24.75V26.875Z" transform="translate(-1 -1)" fill="#424242" opacity="0.8" />
    <path d="M6,35.631H27.185V24H6Zm1.115-3.489h2.23v2.326H7.115Zm15.61-1.163h-2.23V28.652h2.23Zm1.115-2.326h2.23v2.326H23.84ZM13.8,32.142h2.23v2.326H13.8ZM12.69,34.468H10.46V32.142h2.23Zm3.345-3.489H13.8V28.652h2.23Zm1.115-2.326h2.23v2.326H17.15Zm0,3.489h2.23v2.326H17.15Zm3.345,0h2.23v2.326h-2.23Zm0-4.652V25.163h2.23v2.326Zm-1.115,0H17.15V25.163h2.23Zm-3.345,0H13.8V25.163h2.23Zm-3.345,0H10.46V25.163h2.23Zm0,1.163v2.326H10.46V28.652ZM9.345,30.979H7.115V28.652h2.23ZM23.84,34.468V32.142h2.23v2.326Zm2.23-6.979H23.84V25.163h2.23ZM9.345,25.163v2.326H7.115V25.163Z" transform="translate(-3.092 -11.539)" fill="#424242" opacity="0.8" />
  </SvgIcon>
);

export const SearchIcon = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 29 29">
    <path d="M35.694,34.224l-6.01-6.01a10.527,10.527,0,1,0-1.474,1.474l6.01,6.005a1.041,1.041,0,1,0,1.474-1.469Zm-14.158-4.25a8.441,8.441,0,1,1,8.444-8.439A8.45,8.45,0,0,1,21.536,29.974Z" transform="translate(-11 -11)" fill="#424242" opacity="0.8" />
  </SvgIcon>
);

export const ResetIcon = props => (
  <SvgIcon {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo-alt" className="svg-inline--fa fa-undo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z" />
  </SvgIcon>
);
