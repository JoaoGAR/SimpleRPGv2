import "../dialogs/dialogs.css"
import "./inventoryDialog.css"
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import EquipmentSlot from "../item/EquipmentSlot";
import ItemBox from "../item/ItemBox";
import ItemInfoDialog from '../item/ItemInfoDialog';

const InventoryDialog = ({ character, isOpen, onClose, setCharacter }) => {

    const inventorySize = character.inventorySize;

    const [listInventory, setListInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [equipment, setEquipment] = useState(character.inventory);
    const [mainHand, setMainHand] = useState([]);
    const [offHand, setOffHand] = useState([]);
    const [headEquipment, setHeadEquipment] = useState([]);
    const [handsEquipment, setHandsEquipment] = useState([]);
    const [bodyEquipment, setBodyEquipment] = useState([]);
    const [legsEquipment, setLegsEquipment] = useState([]);
    const [feetEquipment, setFeetEquipment] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/inventory/get").then((response) => {
            const inventory = response.data;
            setListInventory(inventory);
            setEquipedItems();
        });
    }, [isOpen, character, equipment]);

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
    };

    if (!isOpen) return null;

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

    const equipItem = async (inventoryId, equiped) => {
        const response = await Axios.post("http://localhost:3001/api/inventory/equip/item", {
            inventoryId,
            equiped,
        });
        const { status, msg, prevEquipment, inventory, character } = response.data;
        if (status === 200) {
            setCharacter(character);
            setEquipment(character.inventory);
            setEquipedItems();
        }
    };

    return (
        <>
            <div className="row row-cols-3 dialog-header align-items-center">
                <div className="col-2">
                    <i className="bi bi-backpack2"></i>
                </div>
                <div className="col-8 inventory-title text-center">
                    <h6 className="text-uppercase fw-bold">inventário {listInventory.length}/{inventorySize}</h6>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-end">
                    <button className="btn btn-sm btn-danger" onClick={onClose}><i className="bi bi-x"></i></button>
                </div>
            </div>
            <div className="row row-cols-2 dialog-body" onMouseMove={handleMouseMove}>
                <div className="col-1 inventory-equipment">
                    <div className="row row-cols-3">
                        <div className="col-3">
                            <div className="row row-cols-1">
                                {[
                                    { item: headEquipment, col: '12' },
                                    { item: bodyEquipment, col: '12' },
                                    { item: legsEquipment, col: '12' },
                                    { item: handsEquipment, col: '12' },
                                    { item: feetEquipment, col: '12' },
                                    { item: mainHand, col: '12' },
                                    { item: offHand, col: '12' },
                                ].map(({ item, col }, index) => (
                                    <EquipmentSlot
                                        key={index}
                                        item={item}
                                        openItemInfoDialog={openItemInfoDialog}
                                        closeItemInfoDialog={closeItemInfoDialog}
                                        offset={null}
                                        col={col}
                                        margin={'mx-2 my-1'}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row row-cols-2 align-items-end justify-content-start silhouette">
                                <div className="col text-center">
                                    <div className="row align-items-center armor-class">
                                        <div className="col-12">
                                            <h1>{character.armorClass}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
                <div className="col inventory-items">
                    <div className="row row-cols-6">
                        {typeof listInventory !== "undefined" && listInventory.map((inventoryItem) => {
                            return (
                                <ItemBox
                                    key={inventoryItem.id}
                                    item={inventoryItem.item}
                                    inventoryId={inventoryItem.id}
                                    setSelectedItem={setSelectedItem}
                                    openItemInfoDialog={openItemInfoDialog}
                                    closeItemInfoDialog={closeItemInfoDialog}
                                    equipItem={equipItem}
                                    equiped={inventoryItem.equiped}
                                />
                            );
                        })}
                    </div>
                </div>
            </div >
            <div className="row row-cols-3 d-flex justify-content-end align-items-end dialog-footer">
                <div className="col-2">
                    <p style={{ color: 'yellow' }}><img className="img-fluid" style={{ height: '20px', width: '20px' }} src="./items/common/coin.png" alt="Golds coin" /> {character.gold}</p>
                </div>
            </div>

            {
                selectedItem && (
                    <ItemInfoDialog
                        item={selectedItem}
                        mousePosition={mousePosition}
                        isOpen={!!selectedItem}
                        onClose={closeItemInfoDialog}
                        equiped={selectedItem.equiped}
                        diffx={550}
                        diffy={90}
                    />
                )
            }
        </>
    );
};

export default InventoryDialog;