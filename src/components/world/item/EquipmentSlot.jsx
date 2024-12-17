import React from 'react';
import { useItemInfo } from '/src/context/ItemInfoContext';

const EquipmentSlot = ({ item, inventoryId, equipItem, height, offset, col, margin }) => {

    const { openItemInfoDialog, closeItemInfoDialog } = useItemInfo();

    return (
        <div
            className={`col-${col} ${offset ? 'offset-4' : ''} ${margin ? margin : ''} item-box d-flex justify-content-center align-items-center`}
            onMouseEnter={() => Object.keys(item).length > 0 && openItemInfoDialog(item, 1)}
            onMouseLeave={() => closeItemInfoDialog()}
            onDoubleClick={equipItem && inventoryId ? () => equipItem(inventoryId, 1) : null}
            style={{ height }}
        >
            {Object.keys(item).length > 0 ? (
                <img style={{ background: `radial-gradient(circle, ${item.tier.background} 5%, rgba(66, 66, 66, 0.01) 70%)` }} className="img-fluid" src={`../${item.image}`} alt="Item image" />
            ) : (
                <></>
            )}
        </div>
    );
};

export default EquipmentSlot;
