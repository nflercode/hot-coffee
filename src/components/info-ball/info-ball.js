import React from 'react';
import "./info-ball.css";

export const InfoBall = ({icon, title, isLightMode}) => {
    if(!title || !icon) {
        console(new Error("No title or no icon supplied to info balls"));

        return null;
    }
    return (<div className={`info-ball${isLightMode ? ' info-ball-light': ''}`}>
        <div className="info-ball-ball">
            <i className={`fas ${icon}`} />
        </div>
        <div className="info-ball-title">
            {title}
        </div>
    </div>

    )
};