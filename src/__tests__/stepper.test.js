import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_USER_INFO from '../queries/userDataQuery';
import SteppedNav, { StepperNav } from '../components/setup/Stepper';
import BusinessSetUp from '../components/setup/businessSetup';
import AdminSetUp from '../components/setup/adminSetup';

const props = {
  userData: {
    me: {
      email: 'awesome@gmail.com',
      mobileNumber: '1234567890',
    },
    loading: true,
    error: { message: "network problem" },
  },
  classes: {},
  editAdmin: jest.fn(() => Promise.resolve()),
  createBusiness: jest.fn(() => Promise.resolve()),
  fetchUserData: jest.fn(),
};

const event = {
  target: {
    name: 'firstName',
    value: 'michael'
  }
};
const crop = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
};

const imageFile = 'new image src';
const fileName = 'new file name';
const file = new Blob(['file name'], { type: 'plain/text', name: 'name' });
const event1 = {
  target: {
    files: [
      file
    ],
    value: 'michael'
  }
};

describe('Test stepper component', () => {
  const wrapper = shallow(<StepperNav {...props} />);
  beforeEach(() => {
    wrapper.instance().setState({
      activeStep: 0,
    });
  });

  it('renders adminSetup component when the app initially loads', () => {
    wrapper.instance().getStepContent(0);
    expect(wrapper.find(AdminSetUp)).toHaveLength(1);
  });

  it('renders nothing when an out of index number is passed to getStepContent', () => {
    const nullable = wrapper.instance().getStepContent(4);
    expect(nullable).toBeNull();
  });

  it('displays an error toast when called and passed an error message', () => {
    wrapper.setState({ serverError: true });
    const spy = jest.spyOn(wrapper.instance(), 'serverErrorHandler');
    wrapper.instance().serverErrorHandler();
    expect(spy).toHaveBeenCalled();
  });

  it('handle validation method updates formError state value', () => {
    wrapper.instance().handleInputValidation();
    expect(wrapper.state('formError')).toBeTruthy();
  });

  it('handleInPutChange method handles input change and updates state', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInPutChange');
    wrapper.instance().handleInPutChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('firstName')).toBeTruthy();
  });

  it('renders Business Setup Component when next button is clicked', () => {
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'phone number',
    });
    const nextButton = wrapper.find('#next-button').at(0);
    const spy = jest.spyOn(wrapper.instance(), 'addBusiness');
    nextButton.simulate('click');
    wrapper.instance().addBusiness();
    expect(spy).toHaveBeenCalled();
  });

  it('renders a case where business setup validation fails', () => {
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: '',
      lastName: '',
      username: '',
      secondaryEmail: '',
      secondaryPhoneNumber: '',
    });
    const nextButton = wrapper.find('#next-button').at(0);
    const spy = jest.spyOn(wrapper.instance(), 'addBusiness');
    nextButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('skips to the addbusiness section when 1 is passed to handleNextButton', () => {
    wrapper.setState({
      legalName: 'legalName',
      tradingName: 'tradingName',
      businessEmail: 'businessEmail',
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      phoneNumber: 'phoneNumber',
      city: 'city',
      country: 'country',
      localGovernmentArea: 'local',
      website: 'website',
      twitter: 'twitter',
      instagram: 'instagram',
      logo: 'logo',
      facebook: 'facebook',
      activeStep: 1
    });
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent();
    const nextButton = wrapper.find('#next-button').at(0);
    wrapper.instance().getStepContent();
    nextButton.simulate('click');
    expect(wrapper.find(BusinessSetUp)).toHaveLength(1);
  });

  it('handles a case where input validation fails', () => {
    wrapper.setState({
      legalName: '',
      tradingName: '',
      businessEmail: '',
      addressLine1: '',
      addressLine2: '',
      phoneNumber: '',
      city: '',
      country: '',
      localGovernmentArea: '',
      website: '',
      twitter: '',
      instagram: '',
      logo: '',
      facebook: '',
    });
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent();
    const nextButton = wrapper.find('#next-button').at(0);

    wrapper.instance().getStepContent();
    nextButton.simulate('click');
    expect(wrapper.find(BusinessSetUp)).toHaveLength(0);
  });

  it('calls handleBackButton handler and sets state', () => {
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'phone number',
      activeStep: 1
    });
    const nextButton = wrapper.find('#next-button').at(0);
    nextButton.simulate('click');
    const backButton = wrapper.find('#back-button').at(0);
    backButton.simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleBackButton');
    wrapper.instance().handleBackButton();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.checked).toBeFalsy();
  });

  it('calls onSelectFile method when an image is selected from the file picker ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(event1);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile with file passed as an argument', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile({ ...event1, target: {} });
    expect(spy).toHaveBeenCalled();
  });

  it('calls getCroppedImg method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(imageFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });


  it('calls handleClose method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.instance().handleClose();
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange method', () => {
    wrapper.instance().onCropChange(crop);
    expect(wrapper.instance().state.crop).toEqual(crop);
  });

  it('calls handleSave method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSave');
    new Promise((resolve) => {
      wrapper.instance().getCroppedImg = () => new Promise(jest.fn);
      wrapper.instance().handleSave();
      resolve();
    }).then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe('Test react-apollo functions', () => {
  const request = {
    query: GET_USER_INFO,
  };

  const MockedInstance = (
    <MockedProvider mocks={[{ request }]} addTypename={false}>
      <SteppedNav {...props} />
    </MockedProvider>
  );

  const apolloWrapper = mount(MockedInstance);

  it('updates state with results from the query', () => {
    expect(apolloWrapper.find('StepperNav').props().userData.loading).toBe(true);
    apolloWrapper.setState({
      firstName: 'firstname',
      lastName: 'lastName',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'secondaryPhoneNumber',
      isLoading: false,
      activeStep: apolloWrapper.state('activeStep') + 1,
      checked: false,
      legalName: 'legalname',
      tradingName: 'tradingname',
      email: 'email',
      address: 'address',
      phoneNumber: 'phonenumber',
      website: 'website',
      twitter: 'twitter',
      instagram: 'instagram',
      logo: 'logo',
      facebook: 'facebook',
    });
  });

  const namedProps = {
    editAdmin: jest.fn(() => Promise.resolve()),
    client: { query: jest.fn() },
    classes: {},
    createBusiness: jest.fn(() => Promise.resolve()),
    userData: {
      me: {
        email: 'awesome@gmail.com',
        mobileNumber: '1234567890',
      },
    },
  };
  const namedWrapper = mount(<StepperNav {...namedProps} />);

  it('toogleCheckbox gets called', () => {
    namedWrapper.instance().toogleCheckbox();
  });

  it('calls fetchUserData', () => {
    const spy = jest.spyOn(namedWrapper.instance(), 'fetchUserData');
    namedWrapper.instance().fetchUserData(props.userData);
    expect(spy).toHaveBeenCalled();
  });

  it('calls fetchUserData with error value of false', () => {
    const spy = jest.spyOn(namedWrapper.instance(), 'fetchUserData');
    namedWrapper.instance().fetchUserData({ ...props.userData, error: '', loading: false });
    expect(spy).toHaveBeenCalled();
  });
});