import React from "react";
import "./style.css";

// Maybe this should be exported as constants..
const chipClasses = {
    WHITE: "white",
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    BLACK: "black"
};

// TODO: should be "isDisabled" instead, it's more commonly used
// TODO: Chip should use the button component(but with no style), it is a button
const Chip = ({ chip, isEnabled, isLarger, onClick }) => {
    if (!chip || Object.keys(chip).length <= 0) {
        throw new Error("Chip has invalid data");
    }

    if (!chipClasses[chip.type]) {
        throw new Error("Chip has invalid type");
    }

    return (
        <div className="fc-white f-center" data-testid="qa-chip">
            <div className="padding-bottom-half">{chip.value}$</div>
            <div
                data-testid="qa-clickable-chip"
                className={`chip chip-${chipClasses[chip.type]}${
                    isLarger ? " chip-larger" : ""
                }`}
                onClick={() => isEnabled && onClick(chip)}
            >
                <b>{chip.amount}</b>
            </div>
        </div>
    );
};

export { Chip };
