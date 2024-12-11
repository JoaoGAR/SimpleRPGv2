import React, { createContext, useContext, useState } from 'react';
import ItemInfoDialog from '../components/world/item/ItemInfoDialog';

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

    const openItemInfoDialog = (item, equiped) => {
        setSelectedItem({ ...item, equiped: equiped });
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
                equiped={selectedItem?.equiped}
                diffx={-10}
                diffy={-10}
            />}
        </ItemInfoContext.Provider>
    );
};

export const useItemInfo = () => useContext(ItemInfoContext);