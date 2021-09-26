import 'react-native'
import React from 'react'
import Home from "../screens/Home"

import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import { View, Text, Pressable } from 'react-native';
import { act } from 'react-test-renderer';

describe('Home flow', () => {
  
  it('Display clocked in and on-shift discounts', async () => {
    const fakeClockins = [
      {
        "id": 6108,
        "user_id": 123456,
        "device_id": 1234,
        "time": 1459296192,
        "type": "false",
        "latitude": null,
        "longitude": null,
        "photo": null,
        "department_id": null,
        "shift_id": null,
        "removed": false
      },
      {
        "id": 6108,
        "user_id": 123456,
        "device_id": 1234,
        "time": 1459296192,
        "type": "start",
        "latitude": null,
        "longitude": null,
        "photo": null,
        "department_id": null,
        "shift_id": null,
        "removed": false
      }
    ]
    const fakeDiscounts = [
      {
          "id": 125572990,
          "model_id": 1104624,
          "uuid": "dcec8241-5e5f-4a5c-b88c-0245f11407ff",
          "name": "Off-shift Discount - 1",
          "value": "35%",
          "onshift": false,
          "object_name": "Discount",
          "updated_at": 1629331565
      },
      {
          "id": 124987341,
          "model_id": 1104624,
          "uuid": "1dc0fa90-8076-43a7-b7cb-c537466f0d72",
          "name": "On-shift Discount - 1",
          "value": "25%",
          "onshift": true,
          "object_name": "Discount",
          "updated_at": 1629077363
      },
      {
          "id": 124978219,
          "model_id": 1104624,
          "uuid": "e443043b-91e6-49b4-a269-2d9e2f9c8598",
          "name": "On-shift Discount - 2",
          "value": "35%",
          "onshift": true,
          "object_name": "Discount",
          "updated_at": 1629075239
      },
      {
          "id": 124886241,
          "model_id": 1104624,
          "uuid": "0c0abdd2-a0c9-4242-8515-b885db8d1efb",
          "name": "Off-shift Discount - 2",
          "value": "40%",
          "onshift": false,
          "object_name": "Discount",
          "updated_at": 1629025638
      },    
    ]
    const fakeUser = {
      "user_ids": [
          1748964
      ],
      "organisations": [
          {
              "name": "QUT Capstone - DEMO ACCOUNT",
              "id": 153575,
              "locale": "en-AU",
              "country": "Australia",
              "user_id": 1748964
          }
      ],
      "email": "zouweiran9122@gmail.com",
      "id": 1748964,
      "name": "Weiran Zou",
      "photo": "https://s3.amazonaws.com/PayAus/logins/photos/214/946/904/icon/bd8b9cf053c843329b270cd902dd1cb8.jpeg",
      "time_zone": "Australia/Brisbane",
      "utc_offset": 36000,
      "organisation": "QUT Capstone - DEMO ACCOUNT",
      "organisation_id": 153575,
      "permissions": [
          "employee",
          "manager",
          "organisation_admin",
          "partner",
          "payroll_officer",
          "roster_manager"
      ],
      "platform_role_ids": [
          814082,
          764301,
          764302,
          764303,
          764304,
          764305
      ],
      "valid_subscription": true,
      "locale": "en-AU",
      "country": "Australia",
      "updated_at": 1632096085
    }
    
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
        json: () => Promise.resolve(fakeClockins)
      })
    ));     
   
    const screen = render(<Home />);
            
          // expect(loading).toBeTruthy();
          
          //expect(discount).toBeTruthy();         
    await waitFor(() => {
          //const discount = screen.getByText('On-shift Discount - 1');
      expect(screen.queryByText("clocked in")).toBeTruthy(); 
      expect(screen.queryByText("clocked out")).toBeFalsy();
    })
    
    
  })

  it('Display clocked out and off-shift discounts', async () => {
    const fakeClockins = [
      {
        "id": 6108,
        "user_id": 123456,
        "device_id": 1234,
        "time": 1459296192,
        "type": "start",
        "latitude": null,
        "longitude": null,
        "photo": null,
        "department_id": null,
        "shift_id": null,
        "removed": false
      },
      {
        "id": 6108,
        "user_id": 123456,
        "device_id": 1234,
        "time": 1459296192,
        "type": "finish",
        "latitude": null,
        "longitude": null,
        "photo": null,
        "department_id": null,
        "shift_id": null,
        "removed": false
      }
    ]
    const fakeDiscounts = [
      {
          "id": 125572990,
          "model_id": 1104624,
          "uuid": "dcec8241-5e5f-4a5c-b88c-0245f11407ff",
          "name": "Off-shift Discount - 1",
          "value": "35%",
          "onshift": false,
          "object_name": "Discount",
          "updated_at": 1629331565
      },
      {
          "id": 124987341,
          "model_id": 1104624,
          "uuid": "1dc0fa90-8076-43a7-b7cb-c537466f0d72",
          "name": "On-shift Discount - 1",
          "value": "25%",
          "onshift": true,
          "object_name": "Discount",
          "updated_at": 1629077363
      },
      {
          "id": 124978219,
          "model_id": 1104624,
          "uuid": "e443043b-91e6-49b4-a269-2d9e2f9c8598",
          "name": "On-shift Discount - 2",
          "value": "35%",
          "onshift": true,
          "object_name": "Discount",
          "updated_at": 1629075239
      },
      {
          "id": 124886241,
          "model_id": 1104624,
          "uuid": "0c0abdd2-a0c9-4242-8515-b885db8d1efb",
          "name": "Off-shift Discount - 2",
          "value": "40%",
          "onshift": false,
          "object_name": "Discount",
          "updated_at": 1629025638
      },    
    ]
    const fakeUser = {
      "user_ids": [
          1748964
      ],
      "organisations": [
          {
              "name": "QUT Capstone - DEMO ACCOUNT",
              "id": 153575,
              "locale": "en-AU",
              "country": "Australia",
              "user_id": 1748964
          }
      ],
      "email": "zouweiran9122@gmail.com",
      "id": 1748964,
      "name": "Weiran Zou",
      "photo": "https://s3.amazonaws.com/PayAus/logins/photos/214/946/904/icon/bd8b9cf053c843329b270cd902dd1cb8.jpeg",
      "time_zone": "Australia/Brisbane",
      "utc_offset": 36000,
      "organisation": "QUT Capstone - DEMO ACCOUNT",
      "organisation_id": 153575,
      "permissions": [
          "employee",
          "manager",
          "organisation_admin",
          "partner",
          "payroll_officer",
          "roster_manager"
      ],
      "platform_role_ids": [
          814082,
          764301,
          764302,
          764303,
          764304,
          764305
      ],
      "valid_subscription": true,
      "locale": "en-AU",
      "country": "Australia",
      "updated_at": 1632096085
    }
    
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
        json: () => Promise.resolve(fakeClockins)
      })
    ));     
   
    const screen = render(<Home />);
            
          // expect(loading).toBeTruthy();
          
          //expect(discount).toBeTruthy();         
    await waitFor(() => {
          //const discount = screen.getByText('On-shift Discount - 1');
      expect(screen.queryByText("clocked out")).toBeTruthy(); 
      expect(screen.queryByText("clocked in")).toBeFalsy();
    })
    
    
  })
})