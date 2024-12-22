import { getWeapon } from '../../../utils/inventory';

const NPCList = ({ listNPCs, challengeNPC }) => {

    if (!Array.isArray(listNPCs)) return null;

    return listNPCs.map((option) => {

        const npc = option.npc;
        const weapon = getWeapon(npc.inventory);
        const skillModifier = npc.skills.find(
            (skills) => skills?.skill.id == weapon?.skillId
        );

        return (
            <div key={option.id} className='row row-cols-3 align-items-center option' onClick={() => challengeNPC(npc)}>
                <div className='col-1 p-0'>
                    <img src={`../../${npc.class.icon}`} alt='NPC Icon' />
                </div>
                <div className='col-11'>
                    <div className='row row-cols-4 align-items-center'>
                        <span className='col-4' style={{ fontSize: '18px' }}>lvl:{npc.level} {npc.name}</span>
                        <span className='col-2 text-center npc-weapon' style={{ fontSize: '20px' }}>
                            <img style={{ height: '50px', width: '50px' }} src={`../../${weapon?.image}`} /> {weapon?.attack}
                        </span>
                        <span className='col-1'>
                            <img className='npc-armor-class' style={{ height: '25px', width: '25px' }} src={`../../${weapon?.icon}`} />+{Math.floor(skillModifier?.level / 5)}
                            <br />
                            <img className='npc-armor-class' style={{ height: '25px', width: '25px' }} src='../../icons/items/shield.svg' /> {npc.armorClass}
                        </span>
                        <span className='col-1'>
                            {Array.isArray(weapon?.abilities) && weapon?.abilities.map((weaponAbility) => {
                                const ability = weaponAbility.ability;
                                return (
                                    <span key={ability.id} className='npc-ability text-center'>
                                        <img className='ability-icon' style={{ height: '35px', width: '35px' }} src={`../../${ability.icon}`} />{ability.attack}
                                    </span>
                                );
                            })}
                        </span>
                        <span className='col-4'>
                            <div className='row row-cols-6'>
                                {Array.isArray(npc.inventory) && npc.inventory.map((inventoryItem) => {
                                    const item = inventoryItem.item;
                                    return item.baseItemId && (
                                        <span className='npc-reward text-center' key={inventoryItem.id}>
                                            <img className='reward-icon' style={{ height: '40px', width: '40px' }} src={`../../${item.image}`} />
                                        </span>
                                    );
                                })}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        );
    });

};

export default NPCList;
