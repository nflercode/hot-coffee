import React, { useEffect, useState } from "react";
import { Logo } from "./logo-state-1";

export const LogoType = () => {
    const [showAnimation, setShowAnimation] = useState(false);
    const randomNumber = () => 5000; // Math.floor(Math.random() * (10000 - 5000) + 5000);

    const doFlickerAfterTimeout = () => {
        setShowAnimation(false);
        setTimeout(() => {
            setShowAnimation(true);
            setTimeout(() => {
                doFlickerAfterTimeout();
            }, 4000);
        }, randomNumber());
    };

    useEffect(() => {
        doFlickerAfterTimeout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <h1>
            <Logo
                className={`logotype${
                    showAnimation ? " logotype-animation" : ""
                }`}
            />
        </h1>
    );
};
