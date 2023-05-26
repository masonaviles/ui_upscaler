import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { expect } from "@jest/globals";
import UsageTracker from "../UsageTracker";

describe("UsageTracker", () => {
  it("increments click count and invokes handleSubmit on button click", () => {
    const handleSubmit = jest.fn(); // Create a mock handleSubmit function
    const { getByText } = render(<UsageTracker handleSubmit={handleSubmit} />);

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays access restricted message when maximum click limit is reached", () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <UsageTracker handleSubmit={handleSubmit} />
    );

    const maxClicks = 2; // Set a lower maximum click limit for testing
    const submitButton = getByText("Submit");

    for (let i = 0; i < maxClicks; i++) {
      fireEvent.click(submitButton);
    }

    expect(handleSubmit).toHaveBeenCalledTimes(maxClicks);
    expect(
      getByText("Maximum click limit reached. Access restricted.")
    ).toBeInTheDocument();
  });
});
