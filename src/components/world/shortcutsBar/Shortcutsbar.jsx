import React, { useState } from 'react';
import QueueDialog from '../queue/QueueDialog';
import InventoryDialog from '../inventory/InventoryDialog';
import SkillbookDialog from '../skillbook/SkillbookDialog';

const Shortcutsbar = ({ character, setCharacter }) => {

    const [isQueueDialog, setIsQueueDialog] = useState(false);
    const [isInventoryDialog, setIsInventoryDialog] = useState(false);
    const [isSkillBookDialog, setIsSkillBookDialog] = useState(false);

    const openQueueDialog = () => { closeAllDialogs(); setIsQueueDialog(true) };
    const openInventoryDialog = () => { closeAllDialogs(); setIsInventoryDialog(true) };
    const openSkillBookDialog = () => { closeAllDialogs(); setIsSkillBookDialog(true) };

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
            <div key="shortcut" className="shortcut-bar-modern d-flex justify-content-start align-items-center px-3">
                <div className="shortcut-item-modern" onClick={openQueueDialog}>
                    <img src="./world/icons/workQueue.png" alt="Skill book icon" />
                </div>
                <div className="shortcut-item-modern" onClick={openSkillBookDialog}>
                    <img src="./world/icons/skillbook.png" alt="Skill book icon" />
                    {character.skillPoints > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                    )}
                </div>
                <div className="shortcut-item-modern" onClick={openInventoryDialog}>
                    <img src="./world/icons/backpack.png" alt="Skill book icon" />
                </div>
            </div>
            <div className={`dialog queue-dialog ${isQueueDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <QueueDialog character={character} isOpen={isQueueDialog} onClose={closeQueueDialog} setCharacter={setCharacter} />
            </div>

            <div className={`dialog inventory-dialog ${isInventoryDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <InventoryDialog character={character} isOpen={isInventoryDialog} onClose={closeInventoryDialog} setCharacter={setCharacter} />
            </div>

            <div className={`dialog skillbook-dialog ${isSkillBookDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <SkillbookDialog character={character} isOpen={isSkillBookDialog} onClose={closeSkillBookDialog} setCharacter={setCharacter} />
            </div>
        </>
    );
};

export default Shortcutsbar;
