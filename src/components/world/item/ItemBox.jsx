import React, { useState } from 'react';
import { useItemInfo } from '/src/context/ItemInfoContext';

const ItemBox = ({ item, inventoryId, equipItem, equipped }) => {

    const { openItemInfoDialog, closeItemInfoDialog } = useItemInfo();

    const itemGradientStyle = {
        '--item-gradient': `radial-gradient(circle, ${item.tier.background} 20%, rgba(66, 66, 66, 0.01) 85%)`
    };
    equipped = equipped === 1 ? equipped : 0;

    return (
        <div
            className='col item-box d-flex justify-content-center position-relative'
            onMouseEnter={openItemInfoDialog ? () => openItemInfoDialog(item, equipped) : null}
            onMouseLeave={closeItemInfoDialog ? () => closeItemInfoDialog() : null}
            onDoubleClick={equipItem && inventoryId ? () => equipItem(inventoryId, equipped) : null}
            style={{ cursor: 'pointer', borderColor: item.tier.background }}
        >
            {equipped === 1 && (
                <span className='position-absolute badge rounded-pill bg-primary'>
                    <i className='bi bi-bookmark-star'></i>
                </span>
            )}

            <img
                className='img-fluid'
                src={`/${item.image}`}
                alt='Item image'
                style={itemGradientStyle}
            />
        </div>
    );
};

export default ItemBox;