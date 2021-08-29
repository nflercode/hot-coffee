import { useState, useEffect } from "react";

const getOrientation = () => window.screen.orientation.type;

const useIsHorizontal = () => {
    const [orientation, setOrientation] = useState(
        getOrientation() === "landscape-primary"
    );

    const updateOrientation = (event) => {
        setOrientation(getOrientation() === "landscape-primary");
    };

    useEffect(() => {
        window.addEventListener("orientationchange", updateOrientation);
        return () => {
            window.removeEventListener("orientationchange", updateOrientation);
        };
    }, []);

    return orientation;
};

export default useIsHorizontal;
