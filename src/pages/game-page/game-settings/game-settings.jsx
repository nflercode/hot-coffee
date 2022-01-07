import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/button/button";
import { SpeechBubble } from "../../../components/speech-bubble/speech-bubble";
import { useHistory } from "react-router";
import playerService from "../../../services/player-service";
import refreshTokenStorage from "../../../storage/refresh-token-storage";
import "./game-settings.css";
import { useExchangeChipsDialog } from "../dialogs/use-exchange-chips-dialog";
import { authSelector } from "../../../selectors/authState";

export const GameSettings = ({ isAdmin = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExchangeChipsVisible, setIsExchangeChipsVisible] = useState(false);
    const [referenceElement, setReferenceValue] = useState(null);
    const history = useHistory();
    const authState = useSelector(authSelector);
    const hasClickedRecently = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Timeout to make doubleclick to work
        setTimeout(() => {
            if (isVisible) window.addEventListener("click", handleClickEvent);
            hasClickedRecently.current = false;
        }, 50);

        return () => window.removeEventListener("click", handleClickEvent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handleClickEvent = () => {
        setIsVisible(false);
        window.removeEventListener("click", handleClickEvent);
    };

    const onLeaveTable = () => {
        async function leave() {
            await playerService.deletePlayer(authState.authToken.token);
            refreshTokenStorage.deleteRefreshToken();
            dispatch({ type: "PLAYER_LEFT_TABLE" });
            history.push("/");
        }
        window.gtag("event", "click", {
            event_category: "button",
            event_label: "action_leave_table"
        });

        leave();
    };

    const onExchangeClick = () => {
        setIsVisible(false);
        setIsExchangeChipsVisible(true);
        window.gtag("event", "click", {
            event_category: "button",
            event_label: "action_exchange"
        });
    };

    useExchangeChipsDialog(isExchangeChipsVisible, setIsExchangeChipsVisible);

    return (
        <div className="gamepage-game-settings">
            <Button
                referenceElement={setReferenceValue}
                onClick={() => {
                    setIsVisible(!isVisible);
                    hasClickedRecently.current = true;
                    window.gtag("event", "click", {
                        event_category: "button",
                        event_label: "action_settings"
                    });
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
                        <div
                            className="game-settings-item"
                            onClick={onExchangeClick}
                        >
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
