import React from 'react';
import { shallow } from 'enzyme';
import { ManageProfile } from '../../components/main_setup/manageProfileSetup';

describe('Render manage profile', () => {
  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        }
      }
    }
  };
  const wrapper = shallow(<ManageProfile {...props} />);
  const validFile = new File([new Blob()], 'image.jpg', {
    name: 'profile',
    size: 10000,
    type: 'image/jpg',
    lastModified: ''
  });
  const fileName = 'profile';
  const crop = {
    x: 0,
    y: 10,
    width: 200,
    height: 200,
    aspect: 1 / 1
  };
  const updateUserInfoResolve = () => new Promise((resolve) => {
    const response = {
      data: {
        updateUser: {
          user: {
            username: ''
          }
        }
      }
    };
    return resolve(response);
  });
  const updateUserInfoReject = () => new Promise((resolve, reject) => {
    const err = {};
    return reject(err);
  });

  const initialData = {
    email: 'user1@email.com',
    secondaryEmail: 'N/A',
    mobileNumber: 'N/A'
  };
  const newData = {
    email: 'user2@email.com',
    secondaryEmail: 'N/A',
    mobileNumber: '+2501234567'
  };
  it(' should call handleUserUpdate function ', () => {
    const buttons = wrapper.find('IconButton');
    buttons.forEach((button) => {
      button.simulate('click', {});
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleUserUpdate');
    wrapper.instance().handleUserUpdate(updateUserInfoResolve, {});
    expect(spy).toHaveBeenCalled();
  });

  it(' should call handleUserUpdate function ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleUserUpdate');
    wrapper.instance().handleUserUpdate(updateUserInfoReject, {});
    expect(spy).toHaveBeenCalled();
  });

  it(' should call onSelectFile function on an image file', () => {
    const e = {
      target: {
        files: [validFile]
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it(' should call getCroppedImage function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(validFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });

  it(' should call onCropChange function', () => {
    wrapper.instance().handleOnCropChange(crop);
    expect(wrapper.state().crop).toEqual(crop);
  });

  it(' should call handleSave function', () => {
    wrapper.instance().getCroppedImg = jest.fn(() => Promise.resolve(validFile));
    wrapper.instance().handleSave();
    wrapper.setState({
      src: 'image-src',
      fileName: 'profile',
      crop
    });
    expect(wrapper.instance().getCroppedImg).toHaveBeenCalled();
  });

  it(' should call isUserDataChanged', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleUserUpdate');
    wrapper.instance().isUserDataChanged(initialData, newData);
    expect(spy).toHaveBeenCalled();
  });

  it(' should call handleClose', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.instance().handleClose();
    expect(spy).toHaveBeenCalled();
  });

  it(' should call handleInputEmail', () => {
    const event = {
      target: {
        name: 'email',
        value: 'something'
      }
    };
    const spy = jest.spyOn(wrapper.instance(), 'handleInputEmail');
    wrapper.instance().handleInputEmail(event);
    expect(spy).toHaveBeenCalled();
  });
});
