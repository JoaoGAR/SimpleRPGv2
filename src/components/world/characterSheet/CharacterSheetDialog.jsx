import './characterSheetDialog.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { mergeSkills } from '../../../utils/skills';
import { getInitiative } from '../../../utils/inventory';
import EquipmentSlot from '../item/EquipmentSlot';

const CharacterSheetDialog = ({ characterId, isOpen, onClose }) => {

    const [character, setCharacter] = useState(null);

    const [equipment, setEquipment] = useState([]);
    const [listEquipmentBonus, setEquipmentBonus] = useState([]);
    const [mainHand, setMainHand] = useState([]);
    const [offHand, setOffHand] = useState([]);
    const [headEquipment, setHeadEquipment] = useState([]);
    const [handsEquipment, setHandsEquipment] = useState([]);
    const [bodyEquipment, setBodyEquipment] = useState([]);
    const [legsEquipment, setLegsEquipment] = useState([]);
    const [feetEquipment, setFeetEquipment] = useState([]);

    const [classImage, setClassImage] = useState(null);
    const [wellnessPercentage, setWellness] = useState(null);
    const [classColor1, setClassColor1] = useState(null);
    const [classColor2, setClassColor2] = useState(null);
    const [experience, setExperience] = useState(null);
    const [initiative, setInitiative] = useState(null);
    const [listCharacterSkills, setCharacterSkills] = useState([]);
    const [listCharacterAttributes, setCharacterAttributes] = useState([]);
    const [listWeaponAbilities, setWeaponAbilities] = useState([]);


    useEffect(() => {
        getCharacter();
    }, [characterId]);

    useEffect(() => {
        setequippedItems();
    }, [equipment]);

    const setCharacterSheet = (character) => {
        const wellness = character.wellness;
        setClassImage(character.class.image);
        setWellness((wellness / 100) * 100);
        setClassColor1(character.class.color1);
        setClassColor2(character.class.color2);
        setExperience(character.experience)
        setCharacterSkills(character.skills);
        setCharacterAttributes(character.attributes);
    }

    const setequippedItems = () => {
        const updatedEquipment = {
            mainHand: [],
            offHand: [],
            headEquipment: [],
            handsEquipment: [],
            feetEquipment: [],
            bodyEquipment: [],
            legsEquipment: [],
        };

        equipment.forEach((equip) => {
            switch (equip.item.category.slot) {
                case 1:
                    updatedEquipment.mainHand = equip.item;
                    break;
                case 7:
                    updatedEquipment.offHand = equip.item;
                    break;
                case 2:
                    updatedEquipment.headEquipment = equip.item;
                    break;
                case 3:
                    updatedEquipment.handsEquipment = equip.item;
                    break;
                case 4:
                    updatedEquipment.feetEquipment = equip.item;
                    break;
                case 5:
                    updatedEquipment.bodyEquipment = equip.item;
                    break;
                case 8:
                    updatedEquipment.legsEquipment = equip.item;
                    break;
                default:
                    break;
            }
        });

        setMainHand(updatedEquipment.mainHand);
        setOffHand(updatedEquipment.offHand);
        setHeadEquipment(updatedEquipment.headEquipment);
        setHandsEquipment(updatedEquipment.handsEquipment);
        setFeetEquipment(updatedEquipment.feetEquipment);
        setBodyEquipment(updatedEquipment.bodyEquipment);
        setLegsEquipment(updatedEquipment.legsEquipment);
        setWeaponAbilities(offHand.abilities);
        setInitiative(getInitiative(equipment));
    };

    if (!isOpen) return null;

    async function getCharacter() {
        const response = await Axios.get('http://localhost:3001/api/character/getInfo', {
            params: { characterId },
        });
        if (response.data) {
            const character = response.data;
            setCharacter(character);
            setEquipment(character.inventory);
            setCharacterSheet(character);
            const mergedSkills = mergeSkills(character);
            setEquipmentBonus(mergedSkills);
        }
    }

    return (
        <div className='row row-cols-2 justify-content-center'>
            <div className='col-6 character-sheet-dialog'>
                <div className='row row-cols-3 header align-items-center'>
                    <div className='col-2'>
                        <i className='bi bi-clipboard-pulse'></i>
                    </div>
                    <div className='col-8 inventory-title text-center'>
                        <h6 className='text-uppercase fw-bold'>{character.name}</h6>
                    </div>
                    <div className='col-2 d-flex justify-content-end align-items-end'>
                        <button className='btn btn-sm btn-danger' onClick={onClose}><i className='bi bi-x'></i></button>
                    </div>
                </div>
                <div className='row row-cols-4 body character-sheet-equipment'>
                    <div className='col-1 me-4'>
                        <div className='row row-cols-1'>
                            {[
                                { item: headEquipment, col: '12' },
                                { item: bodyEquipment, col: '12' },
                                { item: legsEquipment, col: '12' },
                                { item: handsEquipment, col: '12' },
                                { item: feetEquipment, col: '12' },
                            ].map(({ item, col }, index) => (
                                <EquipmentSlot
                                    key={index}
                                    item={item}
                                    offset={null}
                                    col={col}
                                    margin={'m-2'}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='row row-cols-3 align-items-end justify-content-start silhouette' style={{ backgroundImage: `url(${classImage})` }}>
                            <div className='col-4 text-center'>
                                <div className='row align-items-center armor-class'>
                                    <div className='col-12'>
                                        <h1>{character.armorClass}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 text-center'>
                                <div className='row character-class' style={{ backgroundColor: classColor1 }}>
                                    <div className='col-12'>
                                        <h5>{character.class.name}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 text-center'>
                                <div className='row character-class' style={{ backgroundColor: classColor2 }}>
                                    <div className='col-12'>
                                        <h5>{character.level}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='progress' role='progressbar'>
                                    <div className='progress-bar bg-info' style={{ width: `${wellnessPercentage}%` }}>{wellnessPercentage}/100</div>
                                </div>
                            </div>
                        </div>
                        <div className='row row-cols-2 mt-3'>
                            <div className='col d-flex justify-content-center'>
                                <EquipmentSlot
                                    item={offHand}
                                    offset={null}
                                    col={'8'}
                                />
                            </div>
                            <div className='col d-flex justify-content-center'>
                                <EquipmentSlot
                                    item={mainHand}
                                    offset={null}
                                    col={'8'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-4 ms-3'>
                        <div className='row row-cols-1'>
                            <div className='row row-cols-6 justify-content-center'>
                                {Array.isArray(listCharacterAttributes) && listCharacterAttributes.map((characterAttribute) => (
                                    <div key={characterAttribute.id} className='col attribute-box' style={{ backgroundImage: `url(${characterAttribute.attributes.icon})` }}>
                                        <div className='row text-center'>
                                            <span>{characterAttribute.level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='row row-cols-5 justify-content-center'>
                                {Array.isArray(listEquipmentBonus) && listEquipmentBonus.map((characterSkill) => (
                                    <div key={characterSkill.id} className='col skill-box' style={{ backgroundImage: `url(${characterSkill.icon})` }}>
                                        <div className='row text-center'>
                                            <span>{characterSkill.level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='row justify-content-center mt-2'>
                                {Array.isArray(listWeaponAbilities) && listWeaponAbilities.map((weaponAbility) => {
                                    const ability = weaponAbility.ability;
                                    const skillModifier = listCharacterSkills.find(
                                        (skills) => skills?.skill.id == offHand?.skillId
                                    );
                                    return (
                                        <div key={weaponAbility.id} className='row justify-content-center align-items-center' style={{ fontSize: '20px' }}>
                                            <span className='col-3 text-center'>
                                                <img style={{ height: '40px', filter: 'grayscale(1) invert(1)' }} src={`/world/initiative.svg`} />+{initiative}
                                            </span>
                                            <span className='col-3 text-center'>
                                                <img style={{ height: '40px' }} src={`../../${offHand?.image}`} />{offHand?.attack}
                                            </span>
                                            <span className='col-3 text-center'>
                                                <img className='ability-icon' style={{ height: '40px' }} src={`../../${ability.icon}`} /> {ability.attack}
                                            </span>
                                            <span className='col-3 text-center'>
                                                <img style={{ height: '40px', filter: 'grayscale(1) invert(1)' }} src={`../../${offHand?.icon}`} />+{Math.floor(skillModifier?.level / 5)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='col-2 interations d-flex justify-content-center'>
                        <div className='row row-cols-1'>
                            <div className='col-12'>
                                <button className='btn btn-danger'>desafiar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSheetDialog;