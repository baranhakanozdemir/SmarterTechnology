import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("shows the default classification", () => {
    render(<App />);

    expect(screen.getByTestId("stack-result")).toHaveTextContent("STANDARD");
  });

  it("updates the verdict when the package becomes rejected", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Width (cm)"), {
      target: { value: "150" }
    });
    fireEvent.change(screen.getByLabelText("Height (cm)"), {
      target: { value: "150" }
    });
    fireEvent.change(screen.getByLabelText("Length (cm)"), {
      target: { value: "60" }
    });
    fireEvent.change(screen.getByLabelText("Mass (kg)"), {
      target: { value: "20" }
    });

    expect(screen.getByTestId("stack-result")).toHaveTextContent("REJECTED");
    expect(screen.getByText("Bulky: Yes")).toBeInTheDocument();
    expect(screen.getByText("Heavy: Yes")).toBeInTheDocument();
  });
});
