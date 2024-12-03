import "./dialogs.css";
import "./characterSheetDialog.css";
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { ToastContainer, toast, Flip } from "react-toastify";
import EquipmentSlot from "../widgets/EquipmentSlot";
import ItemInfoDialog from '../dialogs/ItemInfoDialog';

const CharacterSheetDialog = ({ characterId, isOpen, onClose }) => {

    const [character, setCharacter] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [equipment, setEquipment] = useState([]);
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
    const [listCharacterSkills, setCharacterSkills] = useState([]);
    const [listCharacterAttributes, setCharacterAttributes] = useState([]);
    const [listWeaponAbilities, setWeaponAbilities] = useState([]);


    useEffect(() => {
        getCharacter();
    }, [character]);

    const setCharacterSheet = (character) => {
        const wellness = character.wellness;
        setClassImage(character.class.image);
        setWellness((wellness / 100) * 100);
        setClassColor1(character.class.color1);
        setClassColor2(character.class.color2);
        setExperience(character.experience)
        setCharacterSkills(character.skill);
        setCharacterAttributes(character.attributes);
    }

    const setEquipedItems = () => {
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
    };

    if (!isOpen) return null;

    async function getCharacter() {
        const response = await Axios.get("http://localhost:3001/api/character/getInfo", {
            params: { characterId },
        });
        if (response.data) {
            const character = response.data;
            setCharacter(character);
            setEquipment(character.inventory);
            setEquipedItems();
            setCharacterSheet(character);
        }
    }

    const openItemInfoDialog = (item, equiped) => {
        setSelectedItem({ ...item, equiped: equiped });
    };
    const closeItemInfoDialog = () => setSelectedItem(null);

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    return (
        <>
            <div className="row row-cols-3 dialog-header align-items-center">
                <div className="col-2">
                    <i className="bi bi-clipboard-pulse"></i>
                </div>
                <div className="col-8 inventory-title text-center">
                    <h6 className="text-uppercase fw-bold">{character.name}</h6>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-end">
                    <button className="btn btn-sm btn-danger" onClick={onClose}><i className="bi bi-x"></i></button>
                </div>
            </div>
            <div className="row row-cols-4 dialog-body character-sheet-equipment" onMouseMove={handleMouseMove}>
                <div className="col-1 me-4">
                    <div className="row row-cols-1">
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
                                openItemInfoDialog={openItemInfoDialog}
                                closeItemInfoDialog={closeItemInfoDialog}
                                offset={null}
                                col={col}
                                margin={'m-2'}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-4">
                    <div className="row row-cols-3 align-items-end justify-content-start silhouette" style={{ backgroundImage: `url(${classImage})` }}>
                        <div className="col-4 text-center">
                            <div className="row align-items-center armor-class">
                                <div className="col-12">
                                    <h1>{character.armorClass}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 text-center">
                            <div className="row character-class" style={{ backgroundColor: classColor1 }}>
                                <div className="col-12">
                                    <h5>{character.class.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 text-center">
                            <div className="row character-class" style={{ backgroundColor: classColor2 }}>
                                <div className="col-12">
                                    <h5>{character.level}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="progress" role="progressbar">
                                <div className="progress-bar bg-info" style={{ width: `${wellnessPercentage}%` }}>{wellnessPercentage}/100</div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-2 mt-3">
                        <div className="col d-flex justify-content-center">
                            <EquipmentSlot
                                item={mainHand}
                                openItemInfoDialog={openItemInfoDialog}
                                closeItemInfoDialog={closeItemInfoDialog}
                                offset={null}
                                col={'8'}
                            />
                        </div>
                        <div className="col d-flex justify-content-center">
                            <EquipmentSlot
                                item={offHand}
                                openItemInfoDialog={openItemInfoDialog}
                                closeItemInfoDialog={closeItemInfoDialog}
                                offset={null}
                                col={'8'}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4 ms-3">
                    <div className="row row-cols-1">
                        <div className="row row-cols-6 justify-content-center">
                            {listCharacterAttributes !== 'undefined' && listCharacterAttributes.map((characterAttribute) => (
                                <div key={characterAttribute.id} className="col attribute-box" style={{ backgroundImage: `url(${characterAttribute.attributes.icon})` }}>
                                    <div className="row text-center">
                                        <span>{characterAttribute.level}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row row-cols-5 justify-content-center">
                            {listCharacterSkills !== 'undefined' && listCharacterSkills.map((characterSkill) => (
                                <div key={characterSkill.id} className="col skill-box" style={{ backgroundImage: `url(${characterSkill.skill.icon})` }}>
                                    <div className="row text-center">
                                        <span>{characterSkill.level}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row row-cols-4 mt-2 justify-content-center">
                            {listWeaponAbilities !== 'undefined' && listWeaponAbilities.map((weaponAbility) => (
                                <div key={weaponAbility.id} className="col weapon-ability-box" style={{ backgroundImage: `url(${weaponAbility.ability.icon})` }}>
                                    <div className="row text-center">
                                        <span>{weaponAbility.attack}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-2 interations d-flex justify-content-center">
                    <div className="row row-cols-1">
                        <div className="col-12">
                            <button className="btn btn-danger">desafiar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-3 d-flex justify-content-end align-items-end dialog-footer">
            </div>
            {selectedItem && (
                <ItemInfoDialog
                    item={selectedItem}
                    mousePosition={mousePosition}
                    isOpen={!!selectedItem}
                    onClose={closeItemInfoDialog}
                    equiped={selectedItem.equiped}
                    diffx={510}
                    diffy={130}
                />
            )}
        </>
    );
};

export default CharacterSheetDialog;
