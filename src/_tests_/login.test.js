import 'react-native'
import React from 'react'
import Login from "../screens/Login"
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native'
import { View, Text, Pressable } from 'react-native';

describe('Login setup', () => {
  it('Should render correctly', () => {
    const { toJSON } = render(
      <Login />
    );
    expect(toJSON()).toMatchSnapshot();
  })

  it('should render an email input tag', () => {
    const { getByPlaceholderText } = render(
      <Login />
    );
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });
  
  it('should render a password input tag', () => {
    const { getByPlaceholderText } = render(
      <Login />
    );
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should render a login button', () => {
    const { getByText } = render(
      <Login />
    );
    expect(getByText('Login')).toBeTruthy();
  });
  
  it('the default value for both fields should be empty', () => {
    const { getByPlaceholderText } = render(
      <Login />
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  it('Check email input', () => {
    const { getByPlaceholderText } = render(
      <Login />
    );
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(
      emailInput,
      'zouweiran9122@gmail.com'
    );
    expect(emailInput.props.value).toBe('zouweiran9122@gmail.com');
  })
  
  it('Check password input', () => {
    const { getByPlaceholderText } = render(
      <Login />
    );
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(
      passwordInput,
      '123456789'
    );
    expect(passwordInput.props.value).toBe('123456789');
  })

  it('on pressing, a press handler function should be triggered on click event',  () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <View >       
        <Pressable onPress={onPressMock}>
          <Text>Login</Text>
        </Pressable>      
      </View>
    );
    fireEvent.press(getByText('Login'));
    expect(onPressMock).toHaveBeenCalled();
  });  

})
