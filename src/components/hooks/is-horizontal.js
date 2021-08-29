import { useState, useEffect } from "react";

var mql = window.matchMedia("(orientation: portrait)");

const useIsHorizontal = () => {
    const [orientation, setOrientation] = useState(mql.matches === false);

    const updateOrientation = (event) => {
        setOrientation(mql.matches === false);
    };

    useEffect(() => {
        mql.addListener(updateOrientation);
        return () => {
            mql.removeListener(updateOrientation);
        };
    }, []);

    return orientation;
};

export default useIsHorizontal;
