import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DialogsContext } from "../../../components/dialogs/dialogs-context";
import useIsHorizontal from "../../../components/hooks/is-horizontal";
import { myParticipantSelector } from "../../../selectors/game-state";
import { potSelector } from "../../../selectors/pot-request-state";
import { playerMeSelector } from "../../../selectors/table-state";

function useMyTurnDialog() {
    const dialogContext = useContext(DialogsContext);
    const potRequestState = useSelector(potSelector);
    const playerMe = useSelector(playerMeSelector);
    const myParticipant = useSelector((state) =>
        myParticipantSelector(state, playerMe?.id)
    );
    const isHorizontal = useIsHorizontal();

    const hasBeenShown = useRef(false);

    useEffect(() => {
        if (
            myParticipant?.isCurrentTurn &&
            potRequestState.status !== "AWAITING" &&
            isHorizontal &&
            !hasBeenShown.current
        ) {
            dialogContext.onShowDialog({
                type: "ALERT",
                title: "Det är din tur!",
                icon: "fa-dice"
            });
            hasBeenShown.current = true;
        } else if (!myParticipant?.isCurrentTurn) hasBeenShown.current = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myParticipant, dialogContext, potRequestState.status]);
}

export { useMyTurnDialog };
