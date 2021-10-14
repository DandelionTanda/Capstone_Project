import Discount from '../screens/Discount'

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {fakeUser, fakeOnDiscounts,} from './fakeData'

describe('When the user clicked on first discount item', () => {
  
  it('Should render Discount screen correctly', () => {
    const { toJSON } = render(
      <Discount route={{params: {discount:fakeOnDiscounts[0], user: fakeUser}}}/>
    );
    expect(toJSON()).toMatchSnapshot();
  })
  it('Should display clicked discont information', async () => {
    const { queryByText } = render(
      <Discount route={{params: {discount:fakeOnDiscounts[0], user: fakeUser}}}/>
    );
    await waitFor(() => {
      expect(queryByText("On-shift Discount - 1")).toBeTruthy();
      expect(queryByText("25%")).toBeTruthy();
      expect(queryByText("on-shift")).toBeTruthy();
    })
  })
  it('Should display user information', async () => {
    const { queryByText } = render(
      <Discount route={{params: {discount:fakeOnDiscounts[0], user: fakeUser}}}/>
    );
    await waitFor(() => {
      expect(queryByText("Weiran Zou")).toBeTruthy();
      expect(queryByText("zouweiran9122@gmail.com")).toBeTruthy();
      expect(queryByText("QUT Capstone - DEMO ACCOUNT")).toBeTruthy();
      expect(queryByText("1748964")).toBeTruthy();
    })
  })

  it('Should display Logo', async () => {
    const { queryByTestId } = render(
      <Discount route={{params: {discount:fakeOnDiscounts[0], user: fakeUser}}}/>
    );
    await waitFor(() => {
      expect(queryByTestId("Logo")).toBeTruthy();
      
    })
  })
})
