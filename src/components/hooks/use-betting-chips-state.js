import { useState } from "react";

export const useBettingChipsState = () => {
    const initState = {
        chips: [],
        totalValue: 0
    };
    const [state, setState] = useState(initState);

    function reset() {
        setState(initState);
    }

    function increase(chip) {
        setBettingChips(chip, 1);
    }

    function decrease(chip) {
        setBettingChips(chip, -1);
    }

    function setChips(chips, totalValue) {
        setState({
            chips,
            totalValue
        });
    }

    function setBettingChips(chip, incBy) {
        const chipsCopy = [...state.chips];
        const index = chipsCopy.findIndex(({ id }) => id === chip.id);

        const chipOnIndex = chipsCopy[index];
        const updatedChip = {
            ...chip,
            amount: !chipOnIndex ? incBy : chipOnIndex.amount + incBy
        };

        if (updatedChip.amount < 0) return;

        if (!chipOnIndex) chipsCopy.push(updatedChip);
        else chipsCopy[index] = updatedChip;

        const newTotalValue = (state.totalValue += incBy * chip.value);
        setState({
            chips: chipsCopy,
            totalValue: newTotalValue
        });
    }

    return [state, increase, decrease, reset, setChips];
};
