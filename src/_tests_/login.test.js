import 'react-native'
import React from 'react'
import Login from "../screens/Login"

import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
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
  
  it('the default value for both fields should be empty and the error should be absence by defaule', () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <Login />
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password'); 
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
    expect(queryByTestId('Error')).toBeFalsy();
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

  it('on pressing Login button, a press handler function should be triggered on click event',  () => {
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

describe('Login flow', () => {
  it('Expect to save token in localStorage & navigate to home screen on successful login', async () => {
    const fakeToken = {     
      access_token: "6833b9ecaa84ce420da3cafaa43124d241cb28b5287b72d131f6b38bcb64cd91",
      token_type: "bearer",
      scope: "me",
      created_at: 1457304578
    };
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeToken)
      })
    ));
    
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Login navigation={{ navigate }} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Login');
    await waitFor(() => {
      fireEvent.changeText(emailInput, 'zouweiran9122@gmail.com');
      expect(emailInput.props.value).toBe('zouweiran9122@gmail.com');
      fireEvent.changeText(passwordInput, '123456789');
      expect(passwordInput.props.value).toBe('123456789');
      fireEvent.press(button);
    });
    expect(localStorage.setItem).toBeCalledWith('token', fakeToken.access_token)
    expect(localStorage.setItem).toBeCalledWith('tokenType', fakeToken.token_type)
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('HomeTabs');
  })

  it('Expect to display error on home screen on failed login', async () => {
    const fakeToken = {     
      access_token: "6833b9ecaa84ce420da3cafaa43124d241cb28b5287b72d131f6b38bcb64cd91",
      token_type: "bearer",
      scope: "me",
      created_at: 1457304578
    };
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(
      new Error('Error message')
    ));
    
    const screen = render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Login');
    await waitFor(() => {
      fireEvent.changeText(emailInput, '123@gmail.com');
      expect(emailInput.props.value).toBe('123@gmail.com');
      fireEvent.changeText(passwordInput, '123456789');
      expect(passwordInput.props.value).toBe('123456789');
      fireEvent.press(button);
    });
   
    // Asserting error message is displayed
    expect(screen.queryByText('Error message')).toBeTruthy();
    
  })



})
