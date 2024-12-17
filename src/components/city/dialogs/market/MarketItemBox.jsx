import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const MarketItemBox = ({ item, character, handleBuyItem }) => {

    const itemGradientStyle = {
        '--item-gradient': `radial-gradient(circle, ${item.tier.background} 20%, rgba(66, 66, 66, 0.01) 85%)`
    };
    const borderColor = { '--border-color': item.tier.background };

    return (
        <div className='col mt-1 p-1'>
            <div className='row row-cols-3 align-items-center item-box' style={borderColor}>
                <div className='col-3 p-0'>
                    <img
                        className='img-fluid'
                        src={`../../${item.image}`}
                        alt='Item image'
                        style={itemGradientStyle}
                    />
                </div>
                <div className='col-6 p-1'>
                    <span className='text-uppercase'>{item.name}</span>
                    <br />
                    <span className=''>{item.tier.name}</span>
                    <br />
                    {item.categoryId === 7 && (
                        <span><img style={{ height: '20px', width: '20px', filter: 'grayscale(1) invert(1)' }} src={`../../${item.icon}`} /> {item.attack ? item.attack : item.minAttack + '-' + item.maxAttack} </span>
                    )}
                    {item.armorClass > 0 && (
                        <span><img style={{ height: '20px', width: '20px' }} src='../../icons/items/shield.svg' /> {item.armorClass} </span>
                    )}
                    {Array.isArray(item.abilities) && item.abilities.map((itemAbility) => {
                        const ability = itemAbility.ability;
                        return (
                            <span key={ability.id}>
                                <img
                                    style={{ height: '25px', width: '25px', borderRadius: '100%' }}
                                    src={`../../${ability.icon}`}
                                    alt='ability image'
                                />
                                {ability.attack}
                            </span>
                        );
                    })}
                </div>
                <div className='col-3'>
                    <div className='row'>
                        <button className='btn btn-sm btn-success text-uppercase' disabled={(item.price > character.gold)} onClick={handleBuyItem}>comprar</button>
                    </div>
                    <div className='row'>
                        <span style={{ color: 'yellow' }}><img style={{ height: '20px', width: '20px' }} src='../../items/common/coin.png' alt='Golds coin' /> {item.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketItemBox;
