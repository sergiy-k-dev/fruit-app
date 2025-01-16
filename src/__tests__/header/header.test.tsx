import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../../components/header";

describe("Render App", () => {
  test("Render App", () => {
    render(<Header />);

    const headerElement = screen.getByText('Fruit Application');

    expect(headerElement).toBeInTheDocument();
  });
});
