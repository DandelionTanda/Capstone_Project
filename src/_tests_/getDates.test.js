import getDates from "../utilities/getDates";

it('should return current date and 31 dates before current date', async () => {
  expect(getDates()).toStrictEqual(["2021-08-30", "2021-09-30"])
  // expect(getDates()).toStrictEqual(["2021-08-29", "2021-09-29"])
})