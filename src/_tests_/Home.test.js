import 'react-native'
import React from 'react'
import Home from "../screens/Home"
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import { View, Text, Pressable } from 'react-native';
import { act } from 'react-test-renderer';
import {fakeUser, fakeDiscounts, fakeClockins_onShift, fakeClockins_offShift} from './fakeData'

describe('When user clocked in the company having discounts and successfully fetch data', () => {
  
  beforeEach(() => {   
    global.fetch = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeUser)
      })
    )).mockImplementationOnce(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeDiscounts)
      })
    )).mockImplementationOnce(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeClockins_onShift)
      })
    ));        
        
  });

  it('should render properly', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.toJSON()).toMatchSnapshot();
      
    })
        
  })

  it('should render discount list', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId('discount-list')).toBeTruthy();
      
    })
        
  })

  it('should display clocked in', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("clocked in")).toBeTruthy();      
      expect(screen.queryByText("clocked out")).toBeFalsy();
      
    })       
  })

  it('should display on-shift discounts', async () => {
    const screen = render(<Home />);
    await waitFor(() => {    
      expect(screen.queryByTestId("On-shift Discount - 1")).toBeTruthy(); 
      expect(screen.queryByTestId("On-shift Discount - 2")).toBeTruthy(); 
      expect(screen.queryByTestId("Off-shift Discount - 1")).toBeFalsy(); 
      expect(screen.queryByTestId("Off-shift Discount - 2")).toBeFalsy();
    })
        
  })
  /*
  it('should make items in discount list pressable', async () => {
    const onPress = jest.fn();
    await waitFor(() => {     
      screen.queryByTestId('On-shift Discount - 1');
      
    })
        
  })
  */
  it('should not display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("Error message")).toBeFalsy();   
      expect(screen.queryByText("Refresh")).toBeFalsy();       
    })       
  })

  it('should navigate to dscount screen after pressing discount item', async () => {        
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Home navigation={{ navigate }} />);
    await waitFor(() => {
      
      const discount = screen.queryByTestId('On-shift Discount - 1');
      fireEvent.press(discount);
    });   
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeDiscounts[1], user:fakeUser});
  });  
})

describe('When user clocked out the company having discounts and successfully fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeUser)
        })
      )).mockImplementationOnce(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeDiscounts)
        })
      )).mockImplementationOnce(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeClockins_offShift)
        })
      ));     
    
       
  })  
  it('should render properly', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.toJSON()).toMatchSnapshot();
      
    })
        
  })

  it('should render discount list', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId('discount-list')).toBeTruthy();
      
    })
        
  })

  it('should display clocked out', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("clocked in")).toBeFalsy();   
      expect(screen.queryByText("clocked out")).toBeTruthy(); 
      
    })       
  })

  it('should display off-shift discounts', async () => {
    const screen = render(<Home />);
    await waitFor(() => {    
      expect(screen.queryByTestId("On-shift Discount - 1")).toBeFalsy();
      expect(screen.queryByTestId("On-shift Discount - 2")).toBeFalsy();
      expect(screen.queryByTestId("Off-shift Discount - 1")).toBeTruthy(); 
      expect(screen.queryByTestId("Off-shift Discount - 2")).toBeTruthy(); 
    })
        
  })
  /*
  it('should make items in discount list pressable', async () => {
    const onPress = jest.fn();
    await waitFor(() => {     
      screen.queryByTestId('On-shift Discount - 1');
      
    })
        
  })
  */
  it('should not display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("Error message")).toBeFalsy();   
      expect(screen.queryByText("Refresh")).toBeFalsy();       
    })       
  })

  it('should navigate to dscount screen after pressing discount item', async () => {   
  
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Home navigation={{ navigate }} />);
    await waitFor(() => {
      
      const discount = screen.queryByTestId('Off-shift Discount - 1');
      fireEvent.press(discount);
    });
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeDiscounts[0], user:fakeUser});
  });  
})

describe('When user clocked out the company having discounts and failed to fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(
        new Error('Error message')
      )).mockImplementationOnce(() => Promise.reject(
        new Error('Error message')
      )).mockImplementationOnce(() => Promise.reject(
        new Error('Error message')
      ));
       
  })  
  it('should render properly', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.toJSON()).toMatchSnapshot();
      
    })
        
  })

  it('should not render discount list', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId('discount-list')).toBeFalsy();
      
    })
        
  })

  it('should not display clocked in/out', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("clocked in")).toBeFalsy();   
      expect(screen.queryByText("clocked out")).toBeFalsy(); 
      
    })       
  })

  it('should display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("ooops, there is an error from server")).toBeTruthy();   
      expect(screen.queryByText("Refresh")).toBeTruthy();       
    })       
  })

  /*
  it('should make refresh button pressable', async () => {
    const onPress = jest.fn();
    await waitFor(() => {     
      screen.screen.queryByText("Refresh");
      
    })
        
  })
  */
  
})