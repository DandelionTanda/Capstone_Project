import {fetchUser, fetchDiscount, fetchClock, getOrgToken} from '../networking/Api'
import {fakeUser_single, fakeDiscounts, fakeClockins_onShift, fakeClockins_offShift, fakeToken} from './fakeData'

describe('fetch user', () => {
  it('should return user on successful fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeUser_single)
        })
      ))
    
    expect(await fetchUser()).toBe(fakeUser_single);
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('An error has occured: 400')
        )
      )
    const result = await fetchUser()
    expect(typeof result).toBe(typeof new Error());
    expect(result.message).toBe('An error has occured: 400');
  })
})

describe('fetch clock', () => {
  it('should return true on successful fetch and the last clockins’s type is not finished', async () => {
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
  it('should return false on successful fetch and and the last clockins’s type is finished.', async () => {
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
        new Error('An error has occured: 400')
        )
      )
    const result = await fetchClock(1748964)
    expect(typeof result).toBe(typeof new Error());
    expect(result.message).toBe('An error has occured: 400');
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
    
    expect(await fetchDiscount()).toBe(fakeDiscounts);
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('An error has occured: 400')
        )
      )
    const result = await fetchDiscount()
    expect(typeof result).toBe(typeof new Error());
    expect(result.message).toBe('An error has occured: 400');
  })
})

describe('switch company', () => {
  it('should save orgnaisation token in localStorage on successful fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(
        Promise.resolve({
          ok: true,
          status: 200,       
          json: () => Promise.resolve(fakeToken)
        })
      ))
    await getOrgToken(162048)
    expect(localStorage.setItem).toBeCalledWith('org_token', fakeToken.access_token)
    expect(localStorage.setItem).toBeCalledWith('org_tokenType', fakeToken.token_type)
  })
  it('should return error on falied fetch', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(
        new Error('An error has occured: 400')
        )
      )
    const result = await getOrgToken(162048)
    expect(typeof result).toBe(typeof new Error());
    expect(result.message).toBe('An error has occured: 400');
  })
})