import './battleRolls.css';
import React, { useEffect, useState } from 'react';

import { useBattleRolls } from '../../../context/BattleContext';

const BattleRolls = ({ rolls, openRolls }) => {

    const { closeBattleRolls } = useBattleRolls();

    const [winner, setWinner] = useState(null);
    const [battleStatus, setBattleStatus] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        if (rolls) {
            setWinner(rolls.winner);
            setBattleStatus(rolls.battleStatus || []);
        }
    }, [rolls]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < battleStatus.length) {
                const round = battleStatus[index];
                const statusMessage = round.status === 1 ? 'foi certeiro' : 'errou';
                setText((prev) => [
                    ...prev,
                    `ROUND ${round.roundN}| ${round.attacker.name} atacou ${round.target.name}(${round.target.armorClass}[AC]) com ${round.ability.name}(${round.ability.attack}) e ${statusMessage}.
                    Rolou ${round.d20 + round.skillModifier}(${round.d20}[d20] + ${round.skillModifier}[SM]). 
                    Dano causado: ${round.damage}(${round.weaponDamage}[WD] + ${round.abilityDamage}[AD] + ${round.skillModifier}[SM] * ${round.critical}[Critical]). 
                    (${round.target.name}): ${round.target.wellness}.`,
                ]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [battleStatus]);

    const handleClose = () => {
        setText([]);
        closeBattleRolls();
    };

    return (
        <div className={`dialog ${openRolls ? 'is-open' : ''} battle-rolls-dialog `}>
            <div className='row justify-content-end mt-2'>
                <div className='col-1'>
                    <button className='btn btn-danger' onClick={() => handleClose()}><i className='bi bi-x'></i></button>
                </div>
            </div>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='ribbon text-uppercase'>{winner === 1 ? '--Vitória--' : '--Derrota--'}</div>
                </div>
                <div className='row rewards'>

                </div>
                <div className='row battle-history'>
                    {text.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BattleRolls;
