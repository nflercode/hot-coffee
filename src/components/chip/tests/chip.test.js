import React from "react";
import { Chip } from "../chip";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Chip", () => {
    const defaultChipData = {
        type: "BLUE",
        value: 1337,
        amount: 666
    };

    it("throws appropiate error when there is no chip-data", () => {
        expect(() => {
            render(<Chip />);
        }).toThrowError("Chip has invalid data");
    });

    it("throws appropiate error when the chip data has invalid type", () => {
        expect(() => {
            render(
                <Chip
                    chip={{
                        ...defaultChipData,
                        type: "Never gonna give you up"
                    }}
                />
            );
        }).toThrowError("Chip has invalid type");
    });

    it("renders with correct className", () => {
        const div = document.createElement("div");

        // eslint-disable-next-line no-empty-function
        const { rerender } = render(
            <Chip chip={defaultChipData} onClick={() => {}} />,
            div
        );

        const theChipContainer = screen.getByTestId("qa-chip");
        const theChip = screen.getByTestId("qa-clickable-chip");

        expect(theChipContainer.className).toBe("fc-white f-center");
        expect(theChip.className).toBe("chip chip-blue");

        rerender(
            <Chip
                chip={defaultChipData}
                // eslint-disable-next-line no-empty-function
                onClick={() => {}}
                isLarger={true}
            />,
            div
        );

        const theOtherChipContainer = screen.getByTestId("qa-chip");
        const theOtherChip = screen.getByTestId("qa-clickable-chip");

        expect(theOtherChipContainer.className).toBe("fc-white f-center");
        expect(theOtherChip.className).toBe("chip chip-blue chip-larger");
    });

    it("renders when there is chipdata", () => {
        const div = document.createElement("div");

        // eslint-disable-next-line no-empty-function
        render(<Chip chip={defaultChipData} onClick={() => {}} />, div);

        const theChipContainer = screen.getByTestId("qa-chip");
        expect(theChipContainer.textContent).toBe("1337$666");
    });

    it("runs onclickFunction properly", () => {
        const div = document.createElement("div");
        let timesClicked = 0;

        let onClick = () => {
            timesClicked = timesClicked + 1;
        };

        // eslint-disable-next-line no-empty-function
        const { rerender } = render(
            <Chip chip={defaultChipData} onClick={onClick} isEnabled={false} />
        );

        const theChip = screen.getByTestId("qa-clickable-chip");

        fireEvent(
            theChip,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            })
        );

        expect(timesClicked).toBe(0);

        rerender(
            <Chip chip={defaultChipData} onClick={onClick} isEnabled={true} />
        );

        const theChipAgain = screen.getByTestId("qa-clickable-chip");

        fireEvent(
            theChipAgain,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            })
        );

        expect(timesClicked).toBe(1);
    });
});
