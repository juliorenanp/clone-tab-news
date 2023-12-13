const calculator = require("../../models/calculator");

test("add 2 plus 2 should be 4", () => {
  expect(calculator.addNumbers(2, 2)).toBe(4);
});
