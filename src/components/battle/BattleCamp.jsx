import './battle.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Axios from 'axios';

const BattleCamp = () => {

    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const { npc } = location.state || {};

    if (!npc) {
        return <div>NPC não encontrado!</div>;
    }

    const { targetId, locationId } = useParams();
    const [character, setCharacter] = useState(auth.user.character);

    const [playerSkills, setPlayerSkills] = useState(character.skills);
    const [playerWellness, setPlayerWellness] = useState(character.wellness);
    const [playerAC, setPlayerAC] = useState(character.armorClass);
    const [playerWeapon, setPlayerWeapon] = useState([]);
    const [playerWeaponSkills, setPlayerWeaponSkills] = useState([]);
    const [playerSkillModifier, setPlayerSkillModifier] = useState([]);
    const [playerSprite, setPlayerSprite] = useState([]);

    const [enemySkills, setEnemySkills] = useState(npc.skills);
    const [enemyWellness, setEnemyWellness] = useState(npc.wellness);
    const [enemyAC, setEnemyAC] = useState(npc.armorClass);
    const [enemyWeapon, setEnemyWeapon] = useState([]);
    const [enemyWeaponSkills, setEnemyWeaponSkills] = useState([]);
    const [enemySkillModifier, setEnemySkillModifier] = useState([]);
    const [enemySprite, setEnemySprite] = useState([]);

    const [background, setBackground] = useState('../../world/battle/alley.jfif');
    const [battleProgress, setBattleProgress] = useState();
    const [enemySpriteEffect, setEnemySpriteEffect] = useState(null);

    async function setBattleData() {
        const weapon = character.inventory.find(
            (inventory) => inventory.item.categoryId == 7
        )?.item;

        const modifier = character.skills.find(
            (skills) => skills.skill.id == weapon.skillId
        );

        let sprite = null;
        switch (weapon.skillId) {
            case 1:
                sprite = '../../sprites/player/meele.jfif';
                break;

            case 3:
                sprite = '../../sprites/player/magic.jfif';
                break;

            case 5:
                sprite = '../../sprites/player/ranged.jfif';
                break;
            default:
                sprite = '../../sprites/player/meele.jfif';
                break;
        }

        const enemyWeapon = npc.inventory.find(
            (inventory) => inventory.item.categoryId == 7
        )?.item;

        const enemyModifier = npc.skills.find(
            (skills) => skills.skill.id == enemyWeapon.skillId
        );

        let enemySprite = `../../${npc.class.image}`;

        setPlayerWeapon(weapon);
        setPlayerSkillModifier(Math.floor(modifier.level / 2));
        setPlayerSprite(sprite);
        setPlayerWeaponSkills(weapon.abilities);

        setEnemyWeapon(enemyWeapon);
        setEnemySkillModifier(Math.floor(enemyModifier.level / 2));
        setEnemySprite(enemySprite);
        setEnemyWeaponSkills(enemyWeapon.abilities);
    }

    async function attackTarget(targetId, abilityId) {
        const response = await Axios.post('http://localhost:3001/api/battle/attack', {
            targetId,
            abilityId,
        });

        if (response.status != 200) {
            return false;
        }

        const data = response.data;
        console.log(data);
        return true;
    }

    const handleAttack = async (abilityId) => {
        const targetId = npc.id;
        const response = await attackTarget(targetId, abilityId);

        if (response) {
            setEnemySpriteEffect(true);
            setTimeout(() => {
                setEnemySpriteEffect(false);
            }, 500);
        }
    }

    useEffect(() => {
        setBattleData();
    }, []);

    return (
        <div className='row row-cols-2 battle-screen' style={{ backgroundImage: `url(${background})` }}>
            {/* Área do Jogador */}
            <div className='player-container'>
                <div className='player-sprite'>
                    <img src={playerSprite} alt='Player sprite' />
                </div>
                <div className='player-abilities'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='progress' role='progressbar'>
                                <div className='progress-bar bg-success' style={{ width: `${playerWellness}%` }}>
                                    {playerWellness}/{playerWellness}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 player-name'>
                            <span>lvl {character.level}</span>
                            <span> {character.name}</span>
                            <span> <img style={{ height: '20px', width: '20px' }} src='../../icons/items/shield.svg' />{playerAC}</span>
                            <span> <img style={{ height: '20px', width: '20px' }} src={`../../${playerWeapon.icon}`} />+{playerSkillModifier}</span>
                        </div>
                    </div>
                    <div className='row row-cols-2 text-center'>
                        {Array.isArray(playerWeaponSkills) && playerWeaponSkills.map((weaponSkill) => {
                            const ability = weaponSkill.ability;
                            return (
                                <div key={ability.id} className='col-6 text-uppercase ability-option' onClick={() => handleAttack(ability.id)}>
                                    <div className='row row-cols-2'>
                                        <div className='col-2 d-flex align-items-center text-lowercase'>
                                            <img style={{ height: '20px', width: '20px' }} src={`../../world/d20w.svg`} />{ability.attack}
                                        </div>
                                        <div className='col-9 d-flex align-items-center'>
                                            <img className='ability-icon' style={{ height: '40px', width: '40px' }} src={`../../${ability.icon}`} />
                                            {ability.name}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='battle-rolls'>

                </div>
            </div>

            {/* Área do Inimigo */}
            <div className='enemy-container'>
                <div className='row enemy-status'>
                    <div className='row'>
                        <div className='col-6 enemy-name'>
                            <span>lvl {npc.level}</span>
                            <span> {npc.name} </span>
                            <span> <img style={{ height: '20px', width: '20px' }} src='../../icons/items/shield.svg' />{enemyAC}</span>
                            <span> <img style={{ height: '20px', width: '20px' }} src={`../../${enemyWeapon.icon}`} />+{enemySkillModifier}</span>
                        </div>
                        <div className='col-6'>
                            <div className='progress' role='progressbar'>
                                <div className='progress-bar bg-success' style={{ width: `${enemyWellness}%` }}>
                                    {enemyWellness}/20
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`enemy-sprite ${enemySpriteEffect ? 'attack-effect' : ''}`}>
                    <img src={enemySprite} alt='Enemy sprite' />
                </div>
            </div>
        </div>
    );
};

export default BattleCamp;
