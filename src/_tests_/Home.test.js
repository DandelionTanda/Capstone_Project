import 'react-native'
import React from 'react'
import Home, {Item} from "../screens/Home"
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import { View, Text, Pressable } from 'react-native';
import { act } from 'react-test-renderer';
import {fakeUser_single, fakeUser_multiple, fakeDiscounts, fakeOnDiscounts, fakeOffDiscounts, fakeClockins_onShift, fakeClockins_offShift} from './fakeData'
jest.mock('@react-navigation/native');
describe('When single-job user clocked in the company having discounts and successfully fetch data', () => {
  
  beforeEach(() => {   
    global.fetch = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(
      Promise.resolve({
        ok: true,
        status: 200,       
        json: () => Promise.resolve(fakeUser_single)
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
  it('should not display drop menu', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId("switch-company-drop-menu")).toBeFalsy();   
           
    })       
  })  

  it('should not display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("Error message")).toBeFalsy();   
      expect(screen.queryByText("Refresh")).toBeFalsy();       
    })       
  })  

  it('should navigate to dscount screen after pressing first discount item', async () => {        
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
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOnDiscounts[0], user:fakeUser_single});
  });  

  it('should navigate to dscount screen after pressing last discount item', async () => {        
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Home navigation={{ navigate }} />);
    await waitFor(() => {
      
      const discount = screen.queryByTestId(`On-shift Discount - ${fakeOnDiscounts.length}`);
      fireEvent.press(discount);
    });   
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOnDiscounts[fakeOnDiscounts.length-1], user:fakeUser_single});
  });  
  
})

describe('When single-job user clocked out the company having discounts and successfully fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeUser_single)
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

  it('should not display drop menu', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId("switch-company-drop-menu")).toBeFalsy();   
           
    })       
  })  

  it('should not display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("Error message")).toBeFalsy();   
      expect(screen.queryByText("Refresh")).toBeFalsy();       
    })       
  })

  it('should navigate to dscount screen after pressing first discount item', async () => {   
  
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
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOffDiscounts[0], user:fakeUser_single});
  });  

  it('should navigate to dscount screen after pressing last discount item', async () => {        
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Home navigation={{ navigate }} />);
    await waitFor(() => {
      
      const discount = screen.queryByTestId(`Off-shift Discount - ${fakeOffDiscounts.length}`);
      fireEvent.press(discount);
    });   
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOffDiscounts[fakeOffDiscounts.length-1], user:fakeUser_single});
  });  

  
  
})

describe('When user clocked out the company having discounts and failed to fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(
        new Error('An error has occured: 400')
      )).mockImplementationOnce(() => Promise.reject(
        new Error('An error has occured: 400')
      )).mockImplementationOnce(() => Promise.reject(
        new Error('An error has occured: 400')
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

  it('should not display drop menu', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId("switch-company-drop-menu")).toBeFalsy();   
           
    })       
  })  

  it('should display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText('An error has occured: 400')).toBeTruthy();   
      expect(screen.queryByText("Refresh")).toBeTruthy();       
    })       
  })
  
})


it('Should make item in discount list be pressable', async () => {
  
    const onPress = jest.fn();
    const { getByText } = render(
      <Item item={item = { name: 'Test' }} onPress={onPress} />
    );     
    expect(getByText('Test')).toBeTruthy();
      //expect(onPress).toHaveBeenCalled();    
        
})

describe('When multiple-job user clocked out the authorized company having discounts and successfully fetch data', () => {
  beforeEach(() => {
      global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeUser_multiple)
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

  it('should display drop menu', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByTestId("switch-company-drop-menu")).toBeTruthy();   
           
    })       
  })  

  it('should store organisations in drop menu', async () => {
   
    const screen = render(<Home />);
    await waitFor(() => {    
      let dropdown = screen.queryByTestId("switch-company-drop-menu");
      let items = dropdown.props.items;
      expect(items[0].value).toBe(fakeUser_multiple.organisations[0].id);   
      expect(items[0].label).toBe(fakeUser_multiple.organisations[0].name);

      expect(items[1].value).toBe(fakeUser_multiple.organisations[1].id);        
      expect(items[1].label).toBe(fakeUser_multiple.organisations[1].name);  

      expect(items[2].value).toBe(fakeUser_multiple.organisations[2].id);      
      expect(items[2].label).toBe(fakeUser_multiple.organisations[2].name);  
      
    })       
  })  

  it('should not display error and refresh button', async () => {
    const screen = render(<Home />);
    await waitFor(() => {     
      expect(screen.queryByText("Error message")).toBeFalsy();   
      expect(screen.queryByText("Refresh")).toBeFalsy();       
    })       
  })

  it('should navigate to dscount screen after pressing first discount item', async () => {   
  
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
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOffDiscounts[0], user:fakeUser_multiple});
  });  

  it('should navigate to dscount screen after pressing last discount item', async () => {        
    // Mocking navigate method
    const navigate = jest.fn();
    // Getting element
    const screen = render(<Home navigation={{ navigate }} />);
    await waitFor(() => {
      
      const discount = screen.queryByTestId(`Off-shift Discount - ${fakeOffDiscounts.length}`);
      fireEvent.press(discount);
    });   
    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('Discount', {discount:fakeOffDiscounts[fakeOffDiscounts.length-1], user:fakeUser_multiple});
  });  

  
  
})
