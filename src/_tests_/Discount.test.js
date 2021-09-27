import Discount from '../screens/Discount'

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import {fakeUser, fakeDiscounts, fakeClockins_onShift, fakeClockins_offShift} from './fakeData'

describe('When the user clicked on discount', () => {
  
  it('Should render Discount screen correctly', () => {
    const { toJSON } = render(
      <Discount route={{params: {discount:fakeDiscounts[1], user: fakeUser}}}/>
    );
    expect(toJSON()).toMatchSnapshot();
  })
  it('Should display clicked discont information', async () => {
    const { queryByText } = render(
      <Discount route={{params: {discount:fakeDiscounts[1], user: fakeUser}}}/>
    );
    await waitFor(() => {
      expect(queryByText("On-shift Discount - 1")).toBeTruthy();
      expect(queryByText("25%")).toBeTruthy();
    })
  })
  it('Should display user information', async () => {
    const { queryByText } = render(
      <Discount route={{params: {discount:fakeDiscounts[1], user: fakeUser}}}/>
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
      <Discount route={{params: {discount:fakeDiscounts[1], user: fakeUser}}}/>
    );
    await waitFor(() => {
      expect(queryByTestId("Logo")).toBeTruthy();
      
    })
  })
})
