import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/components/ui/Button";

test("renders button and triggers click", () => {
  const handleClick = jest.fn();

  render(<Button label="Click Me" onClick={handleClick} />);

  const button = screen.getByText("Click Me");
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
