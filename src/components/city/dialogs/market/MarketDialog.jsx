import './market.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { toast, Flip } from 'react-toastify';

import MarketItemBox from './marketItemBox';

const MarketDialog = ({ cityId, character, setCharacter }) => {

    const [items] = useState([78, 79, 80, 81]);
    const [listItems, setListItems] = useState([]);

    async function getItems() {
        const response = await Axios.get('http://localhost:3001/api/market/getItems', {
            params: { items },
        });
        if (response.data) {
            const data = response.data;
            setListItems(data);
        }
    }

    const handleBuyItem = async (itemId, itemPrice, characterId) => {
        const response = await Axios.post('http://localhost:3001/api/market/buyItem', {
            itemId,
            itemPrice,
            characterId,
        });
        const { status, character } = response.data;
        if (status !== 200) {
            toast.warning(`${response.data.msg}`, {
                position: 'top-right',
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Flip,
            });
            return false;
        }
        setCharacter(character);
        toast.success(`${response.data.msg}`, {
            position: 'top-right',
            autoClose: 600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Flip,
        });
        return true;
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className='market-dialog'>
            <div className='row header'>
                <div className='col-3'>
                    <img src='../../world/icons/merchant.png' alt='Market icon' style={{ width: '40px' }} />
                </div>
                <div className='col-6 text-center text-uppercase'>
                    <h4>mercado</h4>
                </div>
            </div>
            <div className='row body'>
                <div className='col-2 merchant'>
                    <div className=''>
                        <img style={{ height: '100%', width: '100%' }} src='../../NPCs/Allies/merchant.jfif' alt='Merchant' />
                    </div>
                </div>
                <div className='col-10'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus obcaecati, dignissimos quasi hic sunt rerum maiores soluta! Suscipit error similique unde perspiciatis. Ipsum reprehenderit non sit harum dolore doloremque ut?</p>
                </div>

                <div className='col-12 market-box'>
                    <div className='row row-cols-3'>
                        {Array.isArray(listItems) && listItems.map((item) => {
                            return (
                                <MarketItemBox
                                    key={item.id}
                                    item={item}
                                    character={character}
                                    handleBuyItem={() => handleBuyItem(item.id, item.price, character.id)}
                                />
                            );
                        })}
                    </div>
                </div>

            </div>
            <div className='row footer justify-content-end'>
                <div className='col-1'>
                    <span style={{ color: 'yellow' }}><img style={{ height: '20px', width: '20px' }} src='../../items/common/coin.png' alt='Golds coin' /> {character.gold}</span>
                </div>
            </div>
        </div >
    );
};

export default MarketDialog;
