import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogsContext } from "../../../components/dialogs/dialogs-context";
import { useBettingChipsState } from "../../../components/hooks/use-betting-chips-state";
import { authSelector } from "../../../selectors/authState";
import { chipSelector } from "../../../selectors/chip-state";
import { participantPlayerSelector } from "../../../selectors/combined-states";
import { playerMeSelector } from "../../../selectors/table-state";
import { exchangeChips } from "../../../store/actions/exchanging-chips-action";
import { ExchangingChipsContainer } from "../game-settings/exchanging-chips-container";

export const useExchangeChipsDialog = (
    isExchangeChipsVisible,
    setIsExchangeChipsVisible
) => {
    const [
        exchangingChipsState,
        increaseExchangingChips,
        decreaseExchangingChips,
        _,
        setExchangingChips
    ] = useBettingChipsState();

    const { data: chips } = useSelector(chipSelector);
    const playerMe = useSelector(playerMeSelector);
    const { data: participantPlayers } = useSelector(participantPlayerSelector);
    const authState = useSelector(authSelector);

    const dialogContext = useContext(DialogsContext);
    const dispatch = useDispatch();

    const participantPlayerMe = participantPlayers.find(
        (p) => p.playerId === playerMe.id
    );

    useEffect(() => {
        if (chips?.length > 0 && exchangingChipsState.chips.length === 0) {
            const initState = chips.map((chip) => ({
                ...chip,
                amount: 0
            }));

            setExchangingChips(initState, 0);
        }
    }, [chips, exchangingChipsState, setExchangingChips]);

    useEffect(
        () => {
            if (!isExchangeChipsVisible) return;

            const { chips: exchangingChips } = exchangingChipsState;

            const onFillWithCurrentChips = () => {
                setExchangingChips(
                    participantPlayerMe.chips,
                    participantPlayerMe.totalValue
                );
            };

            const totalValueDiff =
                participantPlayerMe.totalValue -
                exchangingChipsState.totalValue;

            dialogContext.onShowDialog({
                mode: "info",
                title: null,
                positiveButtonProp: {
                    callback: () => {
                        dispatch(
                            exchangeChips({
                                authToken: authState.authToken.token,
                                chips: exchangingChips
                            })
                        );
                        setIsExchangeChipsVisible(false);
                    },
                    content: "Exchange",
                    isDisabled: totalValueDiff !== 0
                },
                negativeButtonProp: {
                    callback: () => {
                        setIsExchangeChipsVisible(false);
                    },
                    content: "Cancel"
                },
                message: (
                    <ExchangingChipsContainer
                        chips={exchangingChips}
                        onChipClick={increaseExchangingChips}
                        onReduceClick={decreaseExchangingChips}
                        totalValueDiff={totalValueDiff}
                        onFillWithCurrentChipsClick={onFillWithCurrentChips}
                    />
                )
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            isExchangeChipsVisible,
            exchangingChipsState,
            setIsExchangeChipsVisible,
            participantPlayerMe?.chips,
            participantPlayerMe?.totalValue
        ]
    );
};
