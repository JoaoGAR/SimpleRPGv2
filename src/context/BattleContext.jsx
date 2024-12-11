import React, { createContext, useContext, useState } from 'react';
import BattleRolls from '../components/battle/battleRolls/BattleRolls';

const BattleRollsContext = createContext();

export const BattleRollsProvider = ({ children }) => {
    const [rolls, setRolls] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openBattleRolls = (newRolls) => {
        setRolls(newRolls);
        setIsOpen(true);
    };

    const closeBattleRolls = () => {
        setIsOpen(false);
        setRolls(null);
    };

    return (
        <BattleRollsContext.Provider value={{ openBattleRolls, closeBattleRolls }}>
            {children}
            {isOpen && <BattleRolls rolls={rolls} openRolls={isOpen} />}
        </BattleRollsContext.Provider>
    );
};

export const useBattleRolls = () => useContext(BattleRollsContext);