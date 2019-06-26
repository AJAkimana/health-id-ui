import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import 'react-image-crop/dist/ReactCrop.css';
import ProfilePhoto from '../../assets/images/avatarr.png';
import profileStyles from '../../assets/styles/profile/profileStyles';
import ResizeDialog from './resizeDialogBox';

const styles = profileStyles;

const ProfileImageUpload = (props) => {
  const {
    classes,
    state,
    onSelectFile,
    onCropChange,
    handleClose,
    handleSave,
  } = props;

  const { profileImage } = state;
  return (
    <div className={classes.profilePhotoDiv}>
      { state.src ? (
        <ResizeDialog
          state={state}
          onCropChange={onCropChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      ) : (
        <div>
          {
            profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className={classes.profilePhotoContainer2}
              />
            ) : (
              <img
                src={ProfilePhoto}
                alt="profile"
                className={classes.profilePhotoContainer}
              />
            )
          }
          <p className={classes.profileHeader}>Upload png / jpg</p>
          <Dropzone
            onDrop={() => null}
            multiple={false}
            accept="image/jpg,image/jpeg, image/JPEG, image/png, image/PNG"
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div>
                  <input {...getInputProps()} onChange={onSelectFile} />
                  <Button
                    {...getRootProps()}
                    variant="contained"
                    className={classes.chooseFileButton}
                  >
            Choose file
                  </Button>

                </div>
              </section>
            )}
          </Dropzone>

        </div>
      )
      }
    </div>
  );
};

ProfileImageUpload.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfileImageUpload);
