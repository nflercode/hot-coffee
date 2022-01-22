import React from "react";
import { Chip } from "../chip";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Chip", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");

        //const theChip = screen.getByTestId("qa-chip");
        expect(() => render(<Chip />).toThrowError("Chip has no value"));
    });

    //it("renders with the correct themes", () => {
    //    const div = document.createElement("div");
    //    render(<Button theme="someweirdstyle">Knappisen</Button>, div);
    //
    //    const theButton = screen.getByText("Knappisen");
    //    expect(theButton.className).toBe("button button-someweirdstyle");
    //});
    //
    //it("should run onClick function when clicked", () => {
    //    const div = document.createElement("div");
    //    let timesPressed = 0;
    //    const onButtonClick = () => {
    //        timesPressed = timesPressed + 1;
    //    };
    //
    //    render(
    //        <Button onClick={onButtonClick} theme="someweirdstyle">
    //            Knappisen
    //        </Button>,
    //        div
    //    );
    //
    //    const theButton = screen.getByText("Knappisen");
    //    fireEvent(
    //        theButton,
    //        new MouseEvent("click", {
    //            bubbles: true,
    //            cancelable: true
    //        })
    //    );
    //
    //    expect(theButton.className).toBe("button button-someweirdstyle");
    //    expect(timesPressed).toBe(1);
    //});
    //
    //it("should not run onClick function when disabled", () => {
    //    const div = document.createElement("div");
    //    let timesPressed = 0;
    //    const onButtonClick = () => {
    //        timesPressed = timesPressed + 1;
    //    };
    //
    //    render(
    //        <Button disabled={true} onClick={onButtonClick}>
    //            Knappisen
    //        </Button>,
    //        div
    //    );
    //
    //    const theButton = screen.getByText("Knappisen");
    //    fireEvent(
    //        theButton,
    //        new MouseEvent("click", {
    //            bubbles: true,
    //            cancelable: true
    //        })
    //    );
    //
    //    expect(theButton.className).toBe(
    //        "button button-default button-disabled"
    //    );
    //    expect(timesPressed).toBe(0);
    //});
});
