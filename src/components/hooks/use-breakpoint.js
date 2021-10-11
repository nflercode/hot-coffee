import { useState, useEffect } from "react";
import useIsHorizontal from "../../components/hooks/is-horizontal";

const getDeviceConfig = (width) => {
    if (width <= 320) {
        return "xs";
    } else if (width >= 321 && width < 720) {
        return "sm";
    } else if (width >= 720 && width < 1024) {
        return "md";
    } else if (width >= 1024) {
        return "lg";
    }
};

const getDeviceHorizontalConfig = (height) => {
    if (height <= 320) {
        return "xs";
    } else if (height >= 321 && height < 720) {
        return "sm";
    } else if (height >= 720 && height < 1024) {
        return "md";
    } else if (height >= 1024) {
        return "lg";
    }
};
export const useBreakpoint = () => {
    const [brkPnt, setBrkPnt] = useState(() =>
        getDeviceConfig(window.innerWidth)
    );
    const isHorizontal = useIsHorizontal();

    useEffect(() => {
        const calcInnerWidth = () => {
            var mql = window.matchMedia("(orientation: portrait)");
            const calcInnerWidth = setBrkPnt(
                isHorizontal
                    ? getDeviceHorizontalConfig(window.innerHeight)
                    : getDeviceConfig(window.innerWidth)
            );
        };
        calcInnerWidth();
        window.addEventListener("resize", calcInnerWidth);
        return () => window.removeEventListener("resize", calcInnerWidth);
    }, [isHorizontal]);

    return brkPnt;
};

export const breakoointConstants = {
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg"
};
