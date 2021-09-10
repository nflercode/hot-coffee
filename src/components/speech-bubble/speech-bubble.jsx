import React, { useState } from "react";
import "./speech-bubble.css";

import { usePopper } from "react-popper";

export const SpeechBubble = ({ children, referenceElement }) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: "arrow",
                options: { element: arrowElement }
            },
            { name: "offset", options: { offset: [50, -55] } },
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
                className="speech-bubble-arrow"
                ref={setArrowElement}
                style={styles.arrow}
            />
        </div>
    );
};
