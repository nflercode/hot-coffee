import React, { useEffect, useState, useRef } from "react";
import { Logo } from "./logo-state-1";

export const LogoType = () => {
    const [showAnimation, setShowAnimation] = useState(false);
    const randomNumber = () => 5000; // Math.floor(Math.random() * (10000 - 5000) + 5000);
    const currentTimeout = useRef(null);

    const doFlickerAfterTimeout = () => {
        setShowAnimation(false);
        currentTimeout.current = setTimeout(() => {
            setShowAnimation(true);
            setTimeout(() => {
                doFlickerAfterTimeout();
            }, 4000);
        }, randomNumber());
    };

    useEffect(() => {
        doFlickerAfterTimeout();
        return () => {
            clearTimeout(currentTimeout.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Logo
            className={`logotype${showAnimation ? " logotype-animation" : ""}`}
        />
    );
};
