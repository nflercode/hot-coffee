import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogsContext } from "../../../components/dialogs/dialogs-context";
import { chipSelector } from "../../../selectors/chip-state";
import { participantPlayerSelector } from "../../../selectors/combined-states";
import { playerMeSelector } from "../../../selectors/table-state";
import { exchangeChips } from "../../../store/actions/exchanging-chips-action";
import { ExchangingChipsContainer } from "../game-settings/exchanging-chips-container";

export const useExchangeChipsDialog = (
    isExchangeChipsVisible,
    setIsExchangeChipsVisible
) => {
    const [exchangingChipsState, setExchangingChipsState] = useState({
        chips: [],
        totalValue: 0
    });

    const { data: allChips } = useSelector(chipSelector);
    const playerMe = useSelector(playerMeSelector);
    const { data: participantPlayers } = useSelector(participantPlayerSelector);
    const authState = useSelector((state) => state.auth);

    const dialogContext = useContext(DialogsContext);
    const dispatch = useDispatch();

    const participantPlayerMe = participantPlayers.find(
        (p) => p.playerId === playerMe.id
    );

    useEffect(() => {
        if (allChips?.length > 0 && exchangingChipsState.chips.length === 0) {
            const initializedExchangingChips = allChips.map((chip) => ({
                ...chip,
                amount: 0
            }));

            setExchangingChipsState({
                chips: initializedExchangingChips,
                totalValue: 0
            });
        }
    }, [allChips, exchangingChipsState]);

    useEffect(
        () => {
            if (!isExchangeChipsVisible) return;

            const { chips: exchangingChips } = exchangingChipsState;

            const onChipClick = ({ id: ecId, value: ecValue }, incDec) => {
                const i = exchangingChips.findIndex(({ id }) => id === ecId);

                let chipOnIndex = exchangingChips[i];
                chipOnIndex.amount = chipOnIndex.amount + incDec;

                const newTotalValue =
                    exchangingChipsState.totalValue + incDec * ecValue;

                setExchangingChipsState({
                    chips: exchangingChips,
                    totalValue: newTotalValue
                });
            };

            const onFillWithCurrentChips = () => {
                setExchangingChipsState({
                    chips: participantPlayerMe.chips,
                    totalValue: participantPlayerMe.totalValue
                });
            };

            const totalValueDiff =
                participantPlayerMe.totalValue -
                exchangingChipsState.totalValue;

            dialogContext.onShowDialog({
                mode: "info",
                title: null,
                positiveButtonProp: {
                    callback: () => {
                        console.log(exchangingChips);
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
                        onChipClick={onChipClick}
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
