import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { DialogsContext } from "../../../components/dialogs/dialogs-context";
import { authSelector } from "../../../selectors/authState";
import { participantPlayerSelector } from "../../../selectors/combined-states";
import { potSelector } from "../../../selectors/pot-request-state";
import gameService from "../../../services/game-service";

function usePotRequestDialog() {
    const dialogContext = useContext(DialogsContext);
    const authState = useSelector(authSelector);
    const { data: potRequest } = useSelector(potSelector);
    const { data: participantPlayers } = useSelector(participantPlayerSelector);

    useEffect(() => {
        if (potRequest?.status !== "AWAITING") {
            return;
        }

        const requestingPlayer = participantPlayers.find(
            (p) => p.playerId === potRequest.playerId
        );
        if (!requestingPlayer || requestingPlayer.isMe) {
            return;
        }

        const isMePlayer = participantPlayers.find((p) => p.isMe);
        const myAnswer = potRequest.participantAnswers.find(
            (p) => p.playerId === isMePlayer.playerId
        );
        if (myAnswer && myAnswer.answer !== "AWAITING") {
            return;
        }

        dialogContext.onShowDialog({
            mode: "info",
            positiveButtonProp: {
                callback: () => {
                    gameService.updatePotRequest(
                        authState.authToken.token,
                        potRequest.id,
                        "OK"
                    );
                },
                content: "I accept"
            },
            negativeButtonProp: {
                callback: () => {
                    gameService.updatePotRequest(
                        authState.authToken.token,
                        potRequest.id,
                        "NO"
                    );
                },
                content: "I deny"
            },
            message: (
                <div>
                    <b>{requestingPlayer.name}</b> is requesting to receive the
                    pot.
                    <br />
                    <br />
                    <i>If approved: this will also start a new round.</i>
                </div>
            ),
            title: `${requestingPlayer.name} is requesting the pot.`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantPlayers, potRequest]);
}

export { usePotRequestDialog };
