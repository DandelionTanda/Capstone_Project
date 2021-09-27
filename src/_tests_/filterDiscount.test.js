import filterDiscount from "../utilities/filterDiscount";
import {fakeDiscounts} from "./fakeData"

const onShiftDis = [
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
  }
]
const offShiftDis = [
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
    "id": 124886241,
    "model_id": 1104624,
    "uuid": "0c0abdd2-a0c9-4242-8515-b885db8d1efb",
    "name": "Off-shift Discount - 2",
    "value": "40%",
    "onshift": false,
    "object_name": "Discount",
    "updated_at": 1629025638
  }
]

describe('filter discounts', () => {
  it('should return on-shift discounts when shift stauts is clocked in', async () => {
    expect(await filterDiscount(fakeDiscounts, true)).toStrictEqual(onShiftDis)
  })

  it('should return off-shift discounts when shift stauts is clocked out', async () => {
    expect(await filterDiscount(fakeDiscounts, false)).toStrictEqual(offShiftDis)
  })
})