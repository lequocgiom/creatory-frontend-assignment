import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders intro quote...", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/A blank canva/i);
  expect(linkElement).toBeInTheDocument();
});
