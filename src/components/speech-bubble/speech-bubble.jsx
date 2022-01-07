import React, { useState } from "react";
import "./speech-bubble.css";

import { usePopper } from "react-popper";

export const SpeechBubble = ({
    children,
    referenceElement,
    offsetData = [50, -50],
    arrowAlignment
}) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: "arrow",
                options: { element: arrowElement }
            },
            { name: "offset", options: { offset: offsetData } },
            { name: "preventOverflow", enabled: false }
        ]
    });

    return (
        <div
            className="speech-bubble"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
        >
            {children}
            <div
                className={`speech-bubble-arrow${
                    arrowAlignment
                        ? ` speech-bubble-arrow-${arrowAlignment}`
                        : ""
                }`}
                ref={setArrowElement}
                style={styles.arrow}
            />
        </div>
    );
};
