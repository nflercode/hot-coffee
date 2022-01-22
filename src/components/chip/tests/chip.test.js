import React from "react";
import { Chip } from "../chip";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Chip", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");

        //const theChip = screen.getByTestId("qa-chip");
        expect(() => render(<Chip />).toThrowError("Chip has no value"));
    });
});
