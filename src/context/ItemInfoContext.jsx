import React, { createContext, useContext, useState } from 'react';
import ItemInfoDialog from './ItemInfoDialog';

const ItemInfoContext = createContext();

export const ItemInfoProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const openItemInfoDialog = (item, equipped) => {
        setSelectedItem({ ...item, equipped: equipped });
        setIsOpen(true);
    };
    const closeItemInfoDialog = () => { setSelectedItem(null), setIsOpen(false) };

    return (
        <ItemInfoContext.Provider value={{ handleMouseMove, openItemInfoDialog, closeItemInfoDialog }}>
            {children}
            {isOpen && <ItemInfoDialog
                item={selectedItem}
                mousePosition={mousePosition}
                isOpen={!!selectedItem}
                onClose={closeItemInfoDialog}
                equipped={selectedItem?.equipped}
                diffx={-10}
                diffy={-10}
            />}
        </ItemInfoContext.Provider>
    );
};

export const useItemInfo = () => useContext(ItemInfoContext);