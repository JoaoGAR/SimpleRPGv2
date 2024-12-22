import './battleRolls.css';
import React, { useEffect, useState } from 'react';

import { useBattleRolls } from '../../../context/BattleContext';
import BattleReward from './rewards/BattleReward';

const BattleRolls = ({ rolls, openRolls, character }) => {

    const { closeBattleRolls } = useBattleRolls();

    const [winner, setWinner] = useState(null);
    const [experience, setExperience] = useState(0);
    const [gold, setGold] = useState(0);
    const [battleStatus, setBattleStatus] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        if (rolls) {
            setWinner(rolls.winner);
            setBattleStatus(rolls.battleStatus || []);
            setRewards(rolls.createdItems || []);
            setExperience(rolls.experience || 0);
            setGold(rolls.gold || 0);
        }
    }, [rolls]);

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
                <div className='row justify-content-center text-center text-uppercase mt-4'>
                    <h6>Recebeu: {experience} pontos de EXP.</h6>
                    <h6>Recebeu: {gold} moedas de ouro.</h6>
                </div>

                <div className='row battle-historic' style={{ backgroundColor: 'white' }}>
                    {battleStatus.map((roundHistoric, index) => {
                        const textColor = roundHistoric.status ? 'text-success' : 'text-warning';
                        const status = roundHistoric.status ? 'ACERTOU' : 'ERROU';

                        const d20 = roundHistoric.d20;
                        const skillModifier = roundHistoric.skillModifier;
                        const damage = roundHistoric.damage;
                        const weaponDamage = roundHistoric.weaponDamage;
                        const abilityDamage = roundHistoric.abilityDamage;
                        const critical = roundHistoric.critical;

                        const attacker = roundHistoric.attacker;
                        const target = roundHistoric.target;
                        const ability = roundHistoric.ability;
                        const player = attacker.name == character.name ? 'text-primary' : 'text-danger';
                        const enemy = target.name == character.name ? 'text-primary' : 'text-danger';
                        return (
                            <div key={index} className='col-12'>
                                <h5 className='text-dark'>ROUND {roundHistoric.roundN}</h5>
                                <span className={`${textColor}`}>
                                    {critical > 1 ? <h2 className='text-info'>ACERTO CRÍTICO!</h2> : ''}
                                    <span className={`${player}`}>{attacker.name}</span> atacou <span className={`${enemy}`}>{target.name}({target.armorClass}[AC])</span> com {ability.name}({ability.attack}) e {status} o ataque.
                                    <br />
                                    Rolou rolou {d20 + skillModifier}({d20} + {skillModifier}[SM]) no teste de acerto. Causando {damage}({weaponDamage}[WD] + {abilityDamage}[AD] + {skillModifier}[SM]) de dano a <span className={`${enemy}`}>{target.name}({target.wellness})({target.armorClass}[AC])</span>!
                                </span>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='row row-cols-6 justify-content-center rewards'>
                {Array.isArray(rewards) && rewards.map((reward, index) => (
                    <BattleReward key={index} reward={reward} />
                ))}
            </div>
        </div>
    );
};

export default BattleRolls;
