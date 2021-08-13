import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Comment Search/i);
  expect(linkElement).toBeInTheDocument();
});

//getting Header Text by using another method below
test("should render comment searcher header", () => {
  const { getByText } = render(<App />);
  const element = getByText(/Comment Search/i);
  expect(element).toBeInTheDocument();
});
