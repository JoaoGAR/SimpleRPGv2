import './rewards.css';

const BattleReward = ({ reward }) => {

    return (
        <div className='col reward-box m-3 p-0' style={{ borderColor: reward.tier.background }}>
            <div className='col reward-header text-center text-uppercase mb-2' style={{ backgroundColor: reward.tier.background, color: reward.tier.color }}>
                <h6 className='m-0'><img style={{ height: '20px' }} src={'/' + reward.icon} alt='Item icon' /> {reward.name}</h6>
                <small>{reward.tier.name}</small>
            </div>
            <div className='col reward-body d-flex justify-content-center align-items-center'>
                <img src={'/' + reward.image} alt='Item image' />
            </div>
            <div className='col reward-footer' style={{ backgroundColor: reward.tier.background }}>
                <div className='row row-cols-5 justify-content-center reward-skill'>
                    {Array.isArray(reward.skills) && reward.skills.map((itemSkill) => (
                        <div key={itemSkill.id} className='col skill-box' style={{ backgroundImage: `url(/${itemSkill.skill.icon})` }}>
                            <div className='row text-center'>
                                <span>{itemSkill.level}</span>
                            </div>
                        </div>
                    ))}
                    {Array.isArray(reward.abilities) && reward.abilities.map((itemAbilitie) => (
                        <div key={itemAbilitie.id} className='col ability-box' style={{ backgroundImage: `url(/${itemAbilitie.ability.icon})`, borderColor: itemAbilitie.ability.tier.color }}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BattleReward;
