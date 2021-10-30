import React from "react";
import "./style.css";

const chipClasses = {
    WHITE: "white",
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    BLACK: "black"
};

const Chip = ({ chip, isEnabled, isLarger, onClick }) => {
    return (
        <div className="fc-white f-center">
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
