import React from "react";
import { ChipList } from "../chip-list";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ChipList", () => {
    const defaultChipData = [
        {
            type: "BLUE",
            value: 1337,
            amount: 666
        }
    ];

    it("renders", () => {
        render(<ChipList chips={defaultChipData} />);
    });

    it("throws appropiate error when there is no chips-data", () => {
        expect(() => {
            render(<ChipList chips="potatoes" />);
        }).toThrowError("ChipList has invalid data");
    });

    it("throws appropiate error when there is no chips-data", () => {
        render(<ChipList chips={defaultChipData} />);
    });
});
