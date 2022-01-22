import React from "react";
import "./style.css";

const chipClasses = {
    WHITE: "white",
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    BLACK: "black"
};

// TODO: should be "isDisabled" instead, it's more commonly used
const Chip = ({ chip, isEnabled, isLarger, onClick }) => {
    if (!chip || Object.keys(chip).length <= 0)
        throw new Error("Chip has no value");

    return (
        <div className="fc-white f-center" data-testid="qa-chip">
            <div className="padding-bottom-half">{chip.value}$</div>
            <div
                className={`chip chip-${chipClasses[chip.type]} ${
                    isLarger ? "chip-larger" : ""
                }`}
                onClick={() => isEnabled && onClick(chip)}
            >
                <b>{chip.amount}</b>
            </div>
        </div>
    );
};

export { Chip };
