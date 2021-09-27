import {fetchUser, fecthDiscount, fetchClock} from '../networking/Api'
import {fakeUser, fakeDiscounts, fakeClockins_onShift, fakeClockins_offShift} from './fakeData'

describe('fetch user', () => {
  it('should return user on successful fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeUser)
        })
      ))
    
    expect(await fetchUser()).toBe(fakeUser);
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('Error message')
        )
      )
    const result = await fetchUser()
    expect(typeof result).toBe(typeof new Error());
  })
})

describe('fetch clock', () => {
  it('should return true on successful fetch and shift status is clocked in', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeClockins_onShift)
        })
      ))
    
    expect(await fetchClock(1748964)).toBe(true);
  })
  it('should return false on successful fetch and shift status is clocked out', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeClockins_offShift)
        })
      ))
    
      expect(await fetchClock(1748964)).toBe(false);
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('Error message')
        )
      )
    const result = await fetchClock(1748964)
    expect(typeof result).toBe(typeof new Error());
  })
})

describe('fetch discount', () => {
  it('should return discount on successful fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeDiscounts)
        })
      ))
    
    expect(await fetchUser()).toBe(fakeDiscounts);
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('Error message')
        )
      )
    const result = await fetchUser()
    expect(typeof result).toBe(typeof new Error());
  })
})