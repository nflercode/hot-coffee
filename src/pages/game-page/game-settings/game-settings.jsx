import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/button/button";
import { SpeechBubble } from "../../../components/speech-bubble/speech-bubble";
import { useHistory } from "react-router";
import playerService from "../../../services/player-service";
import refreshTokenStorage from "../../../storage/refresh-token-storage";

import "./game-settings.css";

export const GameSettings = ({ isAdmin = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [referenceElement, setReferenceValue] = useState(null);
    const history = useHistory();

    const hasClickedRecently = useRef(false);

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

    const handleClickEvent = (e) => {
        if (!e.target.className.includes("game-settings-item")) {
            setIsVisible(false);
            window.removeEventListener("click", handleClickEvent);
        }
    };

    useEffect(() => {
        // Timeout to make doubleclick to work
        setTimeout(() => {
            if (isVisible) window.addEventListener("click", handleClickEvent);
            hasClickedRecently.current = false;
        }, 50);

        return () => {
            window.removeEventListener("click", handleClickEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const onLeaveTable = () => {
        async function leave() {
            await playerService.deletePlayer(authState.authToken.token);
            refreshTokenStorage.deleteRefreshToken();
            dispatch({ type: "PLAYER_LEFT_TABLE" });
            history.push("/");
        }

        leave();
    };
    return (
        <div className="gamepage-game-settings">
            <Button
                referenceElement={setReferenceValue}
                onClick={() => {
                    setIsVisible(!isVisible);
                    hasClickedRecently.current = true;
                }}
                disabled={hasClickedRecently.current === true}
            >
                <i className="fas fa-sliders-h"></i>
            </Button>
            {isVisible && (
                <SpeechBubble
                    referenceElement={referenceElement}
                    offsetData={[50, 0]}
                    arrowAlignment="top-left"
                >
                    <div className="gamepage-game-settings-list">
                        <div className="game-settings-item game-settings-item-disabled">
                            Exchange
                        </div>
                        {isAdmin && (
                            <div className="game-settings-item">Settings</div>
                        )}
                        <div
                            className="game-settings-item game-settings-item-negative"
                            onClick={onLeaveTable}
                        >
                            Leave
                        </div>
                    </div>
                </SpeechBubble>
            )}
        </div>
    );
};
