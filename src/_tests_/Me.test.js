import 'react-native'
import React from 'react'
import Me from "../screens/Me"
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {fakeUser} from './fakeData'
jest.mock('@react-navigation/native', () => {
  return {
    useIsFocused: () => true
  };
});
describe('Me when successful fetch data', () => {
  beforeEach(() => {   
    global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeUser)
      })
    )); 
        
  });
  it('Should render correctly', async () => {
    const { toJSON } = render(
      <Me />
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    })
  })

  it('Should display user information', async () => {
    const { queryByText } = render(
      <Me />
    );
    await waitFor(() => {
      expect(queryByText("Weiran Zou")).toBeTruthy();
      expect(queryByText("zouweiran9122@gmail.com")).toBeTruthy();
      expect(queryByText("QUT Capstone - DEMO ACCOUNT")).toBeTruthy();
      expect(queryByText("1748964")).toBeTruthy();
    })
  })

  it('should render a logout button', async () => {
    const { getByText } = render(
      <Me/>
    );
    await waitFor(() => {
      expect(getByText('Log out')).toBeTruthy();
    })
  });
  
  
  it('Expect to clear token in localStorage & navigate to login screen after clicking on log out button', async () => {
    // Mocking navigate method
    const navigate = jest.fn();
   
    const { getByText } = render(
      <Me navigation={{ navigate }}/>
    );
    await waitFor(() => {
      fireEvent.press(getByText('Log out'));
    })
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
   // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Login');
  });  
})

describe('Me when failed to fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('An error has occured: 400')
      ))
       
  }) 
  it('should render properly', async () => {
    const screen = render(<Me />);
    await waitFor(() => {     
      expect(screen.toJSON()).toMatchSnapshot();
      
    })
        
  })
  it('Should not display user information', async () => {
    const { queryByText } = render(
      <Me />
    );
    await waitFor(() => {
      expect(queryByText("Weiran Zou")).toBeFalsy();
      expect(queryByText("zouweiran9122@gmail.com")).toBeFalsy();
      expect(queryByText("QUT Capstone - DEMO ACCOUNT")).toBeFalsy();
      expect(queryByText("1748964")).toBeFalsy();
    })
  })

  it('should not render a logout button', async () => {
    const screen = render(
      <Me/>
    );
    await waitFor(() => {
      expect(screen.queryByText('Log out')).toBeFalsy();
    })
  });

  it('should display error and refresh button', async () => {
    const screen = render(<Me />);
    await waitFor(() => {     
      expect(screen.queryByText("An error has occured: 400")).toBeTruthy();   
      expect(screen.queryByText("Refresh")).toBeTruthy();       
    })       
  })
  
})