import MyButton from "../components/MyButton";
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react'
describe('My Button', () => {
  it('Should render correctly', () => {
    const { toJSON } = render(
      <MyButton title="Login"/>
    );
    expect(toJSON()).toMatchSnapshot();
  })
  it('Should display given title correctly', () => {
    const { getByText } = render(
      <MyButton title="Login"/>
    );
    expect(getByText('Login')).toBeTruthy();
  })
  it('Should display logout icon when title is log out', async () => {
    
    const { queryByTestId,getByText } = render(
      <MyButton title="Log out"/>
    );
    expect(getByText('Log out')).toBeTruthy();
    await waitFor(() => {
      expect(queryByTestId("log-out-icon")).toBeTruthy();
    })
  });
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const { getByText } = render(
      <MyButton onPress={mockCallBack} title="Login"/>
    );
    fireEvent.press(getByText("Login"))
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});


