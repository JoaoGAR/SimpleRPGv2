import './queue.css'
import '../rewards/rewardsDialog.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import JobQueueList from './JobQueueList';
import JobQueueInfo from './JobQueueInfo';
import RewardDialog from '../rewards/RewardDialog';

const QueueDialog = ({ isOpen, onClose, setCharacter }) => {

    const [listQueue, setListQueue] = useState([]);
    const [claimedRewards, setClaimedRewards] = useState(null);
    const [listJob, setListJob] = useState({});
    const [activeQueue, setActiveQueue] = useState(null)

    const openRewardsDialog = (rewards) => setClaimedRewards(rewards);
    const closeRewardsDialog = () => setClaimedRewards(null);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/queue/get').then((response) => {
            setListQueue(response.data);
            setListJob(response.data[0]);
        });
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className='row row-cols-2 justify-content-center'>
            <div className='col-10 queue-dialog'>
                <div className='row row-cols-3 header align-items-center'>
                    <div className='col-2'>
                        <i className='bi bi-clock-history'></i>
                    </div>
                    <div className='col-8 inventory-title text-center'>
                        <h6 className='text-uppercase fw-bold'>Fila de trabalhos</h6>
                    </div>
                    <div className='col-2 d-flex justify-content-end align-items-end'>
                        <button className='btn btn-sm btn-danger' onClick={() => { onClose(); closeRewardsDialog() }}><i className='bi bi-x'></i></button>
                    </div>
                </div>

                <div className='row row-cols-2'>
                    <div className='col-4'>
                        {Array.isArray(listQueue) && listQueue.map((queue, index) => {
                            return (
                                <JobQueueList
                                    key={queue.id}
                                    queue={queue}
                                    setListJob={() => setListJob(queue)}
                                    isActive={activeQueue === index}
                                    setActiveQueue={() => setActiveQueue(index)}
                                />
                            );
                        })}
                    </div>
                    <div className='col-6 offset-1 job-info'>
                        {listJob && <JobQueueInfo
                            queue={listJob}
                            listQueue={listQueue}
                            setListQueue={setListQueue}
                            openRewardsDialog={openRewardsDialog}
                            setCharacter={setCharacter}
                        />}
                    </div>
                </div>

                <div className={`rewards-dialog ${claimedRewards ? 'is-open' : ''}`}>
                    <RewardDialog
                        claimedRewards={claimedRewards}
                        isOpen={!!claimedRewards}
                        onClose={closeRewardsDialog}
                    />
                </div>
            </div>
        </div>
    );
};

export default QueueDialog;
