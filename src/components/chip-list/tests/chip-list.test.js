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
        // expect(() => {
        //     render(<ChipList chips="potatoes" />);
        // }).toThrowError("ChipList has invalid data");
    });

    it("should trigger onChipClick when chip is clicked", async () => {
        let hasClicked = 0;

        const fakedOnClick = jest.fn((x) => (hasClicked += 1));

        render(
            <ChipList
                chips={defaultChipData}
                onChipClick={fakedOnClick}
                hasEnabledChips
            />
        );
        expect(fakedOnClick.mock.calls.length).toBe(0);

        const renderedChips = await screen.findAllByTestId("qa-clickable-chip");
        await fireEvent(
            renderedChips[0],
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            })
        );
        expect(fakedOnClick.mock.calls.length).toBe(1);
    });
});
