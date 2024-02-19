import React from "react";
import { render } from "@testing-library/react";
import Applyforjob from "../pages/auth-pages/apply-for-job";

test("renders learn react link", () => {
  const { getByText } = render(<Applyforjob />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
