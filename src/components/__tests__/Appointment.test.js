import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from 'components/Appointment/index.js';

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment interviewers={[test]} />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  });

  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });

});
