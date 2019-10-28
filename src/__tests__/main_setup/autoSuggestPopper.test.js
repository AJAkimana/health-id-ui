import React from 'react';
import { mount } from 'enzyme';
import {
  SelectField, NoOptionsMessage, Control, Option, Menu
} from '../../components/main_setup/autoSuggestPopper';

describe('autoSuggestPopper', () => {
  describe('SelectField', () => {
    const props = {
      onOptionChange: jest.fn(),
      classes: {},
      options: {},
      value: '',
      specificStyles: {},
      defaultValue: '',
      isLoading: false,
      disableUnderline: {},
      placeholder: '',
      label: ''
    }

    const wrapper = mount(<SelectField {...props} />)
    it('renders Select', () => {
      expect(wrapper.find('Select').length).toEqual(1)
    })
  })

  describe('NoOptionsMessage', () => {
    const props = {
      selectProps: { classes: { noOptionsMessage: '' } },
      innerProps: {},
      children: []
    }

    const wrapper = mount(<NoOptionsMessage {...props} />)
    it('renders Typography', () => {
      expect(wrapper.find('Typography').length).toEqual(1)
    })
  })

  describe('Control', () => {
    const props = {
      children: [],
      innerProps: {},
      innerRef: {},
      selectProps: {
        classes: { input: '' },
        TextFieldProps: {},
        specificStyles: {},
        disableUnderline: {},
        label: []
      },
    }

    const wrapper = mount(<Control {...props} />)
    it('renders TextField', () => {
      expect(wrapper.find('TextField').length).toEqual(1)
    })
  })

  describe('Option', () => {
    const props = {
      isFocused: {},
      isSelected: {},
      innerProps: {},
      children: []
    }

    const wrapper = mount(<Option {...props} />)
    it('renders MenuItem at fontWeight 500', () => {
      expect(wrapper.find('MenuItem').length).toEqual(1)
    })

    it('renders MenuItem at fontWeight 400', () => {
      wrapper.setProps({ isSelected: null })
      expect(wrapper.find('MenuItem').length).toEqual(1)
    })
  })

  describe('Menu', () => {
    const props = {
      selectProps: { classes: { paper: '' } },
      innerProps: {},
      children: []
    }

    const wrapper = mount(<Menu {...props} />)
    it('renders Paper', () => {
      expect(wrapper.find('Paper').length).toEqual(1)
    })
  })

})
