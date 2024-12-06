import "./cityShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QueueDialog from '../world/queue/QueueDialog';
import InventoryDialog from '../world/inventory/InventoryDialog';
import SkillbookDialog from '../world/skillbook/SkillbookDialog';

const Shortcuts = ({ character, setCharacter, setSelectedItem, openItemInfoDialog, closeItemInfoDialog }) => {

    const navigate = useNavigate();

    const [isQueueDialog, setIsQueueDialog] = useState(false);
    const [isInventoryDialog, setIsInventoryDialog] = useState(false);
    const [isSkillBookDialog, setIsSkillBookDialog] = useState(false);

    const openQueueDialog = () => { closeAllDialogs(); setIsQueueDialog(true) };
    const openInventoryDialog = () => { closeAllDialogs(); setIsInventoryDialog(true) };
    const openSkillBookDialog = () => { closeAllDialogs(); setIsSkillBookDialog(true) };
    const backToWorld = () => { closeAllDialogs(); navigate('/world') };

    const closeQueueDialog = () => setIsQueueDialog(false);
    const closeInventoryDialog = () => setIsInventoryDialog(false);
    const closeSkillBookDialog = () => setIsSkillBookDialog(false);

    const closeAllDialogs = () => {
        setIsQueueDialog(false);
        setIsInventoryDialog(false);
        setIsSkillBookDialog(false);
    };

    return (
        <>
            <div key="row city-shortcuts">
                <div className="col-6 city-shortcut" onClick={openQueueDialog}>
                    <h5>Fila de trabalhos <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
                </div>
                <div className="col-6 city-shortcut" onClick={openSkillBookDialog}>
                    <h5>
                        Livro de abilidades <img src="../../world/icons/skillbook.png" alt="Skill book icon" style={{ width: '50px' }} />
                        {character.skillPoints > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                        )}
                    </h5>
                </div>
                <div className="col-6 city-shortcut" onClick={openInventoryDialog}>
                    <h5>Inventário <img src="../../world/icons/backpack.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
                </div>
                <div className="col-6 city-shortcut" onClick={backToWorld}>
                    <h5>Voltar <img src="../../world/icons/backpack.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
                </div>
            </div>

            <div className={`dialog queue-dialog ${isQueueDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <QueueDialog
                    character={character}
                    isOpen={isQueueDialog}
                    onClose={closeQueueDialog}
                    setCharacter={setCharacter}
                />
            </div>

            <div className={`dialog inventory-dialog ${isInventoryDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <InventoryDialog
                    character={character}
                    isOpen={isInventoryDialog}
                    onClose={closeInventoryDialog}
                    setCharacter={setCharacter}
                    setSelectedItem={setSelectedItem}
                    openItemInfoDialog={openItemInfoDialog}
                    closeItemInfoDialog={closeItemInfoDialog}
                />
            </div>

            <div className={`dialog skillbook-dialog ${isSkillBookDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <SkillbookDialog
                    character={character}
                    isOpen={isSkillBookDialog}
                    onClose={closeSkillBookDialog}
                    setCharacter={setCharacter}
                />
            </div>
        </>
    );
};

export default Shortcuts;
