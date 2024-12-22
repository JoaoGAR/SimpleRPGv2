import './inventoryDialog.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { mergeSkills } from '../../../utils/skills';
import EquipmentSlot from '../item/EquipmentSlot';
import ItemBox from '../item/ItemBox';

const InventoryDialog = ({ character, isOpen, onClose, setCharacter }) => {

    const inventorySize = character.inventorySize;

    const [listInventory, setListInventory] = useState([]);
    const [equipment, setEquipment] = useState(character.inventory);
    const [listEquipmentBonus, setEquipmentBonus] = useState([]);
    const [mainHand, setMainHand] = useState([]);
    const [offHand, setOffHand] = useState([]);
    const [headEquipment, setHeadEquipment] = useState([]);
    const [handsEquipment, setHandsEquipment] = useState([]);
    const [bodyEquipment, setBodyEquipment] = useState([]);
    const [legsEquipment, setLegsEquipment] = useState([]);
    const [feetEquipment, setFeetEquipment] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/inventory/get').then((response) => {
            const inventory = response.data;
            setListInventory(inventory);
            setEquippedItems();
        });
    }, [character, equipment]);

    useEffect(() => {
        setEquipment(character.inventory);
        const mergedSkills = mergeSkills(character);
        setEquipmentBonus(mergedSkills);
    }, [character])

    const setEquippedItems = () => {
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
    };

    if (!isOpen) return null;

    const equipItem = async (inventoryId, equipped) => {
        const response = await Axios.post('http://localhost:3001/api/inventory/equip/item', {
            inventoryId,
            equipped,
        });
        const { status, msg, prevEquipment, inventory, character } = response.data;
        if (status === 200) {
            setCharacter(character);
            setEquippedItems();
        }
    };

    return (
        <div className='row row-cols-2 justify-content-center'>
            <div className='col-8 inventory-dialog'>
                <div className='row row-cols-3 header align-items-center'>
                    <div className='col-2'>
                        <i className='bi bi-backpack2'></i>
                    </div>
                    <div className='col-8 inventory-title text-center'>
                        <h6 className='text-uppercase fw-bold'>inventory</h6>
                    </div>
                    <div className='col-2 d-flex justify-content-end align-items-end'>
                        <button className='btn btn-sm btn-danger' onClick={onClose}><i className='bi bi-x'></i></button>
                    </div>
                </div>
                <div className='row row-cols-2 body mb-2'>
                    <div className='col-6 inventory-equipment'>
                        <div className='row row-cols-3'>
                            <div className='col-2'>
                                <div className='row row-cols-1 justify-content-center'>
                                    {[
                                        { item: headEquipment, col: '12' },
                                        { item: handsEquipment, col: '12' },
                                        { item: bodyEquipment, col: '12' },
                                        { item: legsEquipment, col: '12' },
                                        { item: feetEquipment, col: '12' },
                                    ].map(({ item, col }, index) => (
                                        <EquipmentSlot
                                            key={index}
                                            item={item}
                                            offset={null}
                                            col={col}
                                            margin={'mx-2 my-1'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row row-cols-2 align-items-end justify-content-start silhouette'>
                                    <div className='col text-center'>
                                        <div className='row align-items-center armor-class'>
                                            <div className='col-12'>
                                                <h1>{character.armorClass}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='row row-cols-3 justify-content-center'>
                                            {[
                                                { item: offHand, col: '4' },
                                                { item: mainHand, col: '4' },
                                            ].map(({ item, col }, index) => (
                                                <EquipmentSlot
                                                    key={index}
                                                    item={item}
                                                    offset={false}
                                                    col={col}
                                                    margin={'mx-2 my-1'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div className='row row-cols-1 justify-content-center'>
                                    {[
                                        { item: {}, col: '12' },
                                        { item: {}, col: '12' },
                                        { item: {}, col: '12' },
                                        { item: {}, col: '12' },
                                        { item: {}, col: '12' },
                                    ].map(({ item, col }, index) => (
                                        <EquipmentSlot
                                            key={index}
                                            item={item}
                                            offset={null}
                                            col={col}
                                            margin={'mx-2 my-1'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='row row-cols-6 justify-content-center character-skills'>
                            {Array.isArray(listEquipmentBonus) && listEquipmentBonus.map((skill) => {
                                return (
                                    <div key={skill.id} className='col-1 m-1'>
                                        <div className='skill-img' style={{ backgroundImage: `url('/${skill.icon}')` }}>
                                            <span className='skill-level fw-bolder'>{skill.level}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='col-6 inventory-items'>
                        <div className='row row-cols-2 d-flex justify-content-end' style={{ backgroundColor: 'black' }}>
                            <div className='col-4'>
                                <p>{listInventory.length}/{inventorySize}</p>
                            </div>
                            <div className='col-2'>
                                <p style={{ color: 'yellow' }}><img className='img-fluid' style={{ height: '20px', width: '20px' }} src='/items/common/coin.png' alt='Gold coin' /> {character.gold}</p>
                            </div>
                        </div>
                        <div className='row row-cols-6 m-2'>
                            {Array.isArray(listInventory) && listInventory.map((inventoryItem) => {
                                return (
                                    <ItemBox
                                        key={inventoryItem.id}
                                        item={inventoryItem.item}
                                        inventoryId={inventoryItem.id}
                                        equipItem={equipItem}
                                        equipped={inventoryItem.equipped}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDialog;