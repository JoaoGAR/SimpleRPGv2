import './alley.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const AlleyDialog = ({ cityId, openBattleRolls }) => {

    const [listNPCs, setListNPCs] = useState([]);

    async function getNPCs() {
        const structureId = cityId;
        const locationId = 1;
        const response = await Axios.post("http://localhost:3001/api/structure/getNPCsByLocation", {
            structureId,
            locationId,
        });
        if (response.data) {
            const data = response.data;
            setListNPCs(data);
        }
    }

    const challengeNPC = async (target) => {
        const targetId = target.id;

        const response = await Axios.post('http://localhost:3001/api/battle/attack', {
            targetId,
        });

        if (response.status != 200) {
            console.log("ERRO no servidor");
        }

        const data = response.data;
        openBattleRolls(data);
    }

    useEffect(() => {
        getNPCs();
    }, []);

    return (
        <div className='alley-dialog'>
            <div className='row header'>
                <div className='col-3'>
                    <img src="../../world/icons/alley.png" alt="Skill book icon" style={{ width: '40px' }} />
                </div>
                <div className='col-6 text-center'>
                    <h4>BECOS</h4>
                </div>
            </div>
            <div className='row body'>
                <div className='col-12 lore'>
                    <p>
                        Os becos da cidade são um lugar de segredos e sombras, onde o eco da moralidade raramente encontra espaço para existir. Ao cair da noite, os becos tornam-se um reduto para aqueles que vivem à margem da sociedade, seja por escolha, necessidade ou exílio. É aqui que os desajustados da cidade se reúnem, buscando oportunidades rápidas, confrontos diretos ou uma simples escapatória da monotonia das regras.
                    </p>
                    <p>
                        Nesses labirintos escuros, a força e a astúcia ditam as regras. Para os aventureiros ousados, os becos oferecem a chance de provar seu valor em duelos contra os mais variados tipos de personagens.
                    </p>
                    <hr />
                </div>

                <div className='col-12 npcs'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            DESAFIAR
                        </div>
                    </div>
                    {Array.isArray(listNPCs) && listNPCs.map((option) => {
                        const npc = option.npc;
                        const weapon = npc.inventory.find(
                            (inventory) => inventory.item.categoryId == 7
                        )?.item;
                        const skillModifier = npc.skills.find(
                            (skills) => skills.skill.id == weapon.skillId
                        );
                        return (
                            <div key={option.id} className='row row-cols-3 align-items-center option' onClick={() => challengeNPC(npc)}>
                                <div className='col-1 p-0'>
                                    <img src={`../../${npc.class.icon}`} alt="NPC Icon" />
                                </div>
                                <div className='col-11'>
                                    <div className='row row-cols-4 align-items-center'>
                                        <span className='col-4' style={{ fontSize: '18px' }}>lvl:{npc.level} {npc.name}</span>
                                        <span className='col-1'>
                                            <img className='npc-armor-class' style={{ height: '25px', width: '25px' }} src={`../../${weapon?.icon}`} /> {Math.floor(skillModifier?.level / 2)}
                                            <br />
                                            <img className='npc-armor-class' style={{ height: '25px', width: '25px' }} src='../../icons/items/shield.svg' /> {npc.armorClass}
                                        </span>
                                        <span className='col-1 text-center npc-weapon'>
                                            {weapon?.attack}<img style={{ height: '35px', width: '35px' }} src={`../../${weapon?.image}`} />
                                        </span>
                                        <span className='col-6'>
                                            <div className='row row-cols-5'>
                                                {weapon?.abilities !== 'undefined' && weapon?.abilities.map((weaponAbility) => {
                                                    const ability = weaponAbility.ability;
                                                    return (
                                                        <span className='npc-ability text-center' key={ability.id}>
                                                            <img className='ability-icon' style={{ height: '40px', width: '40px' }} src={`../../${ability.icon}`} /> {ability.attack}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='row footer'>

            </div>
        </div>
    );
};

export default AlleyDialog;
