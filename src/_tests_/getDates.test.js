import getDates from "../utilities/getDates";

it('should return current date and 31 dates before current date', async () => {
  expect(getDates()).toStrictEqual(["2021-09-13", "2021-10-14"])
  // expect(getDates()).toStrictEqual(["2021-08-29", "2021-09-29"])
})