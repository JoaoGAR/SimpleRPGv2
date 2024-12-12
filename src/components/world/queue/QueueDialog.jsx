import "./queue.css"
import "../rewards/rewardsDialog.css"
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import JobQueueCard from "./JobQueueCard";
import RewardDialog from "../rewards/RewardDialog";

const QueueDialog = ({ isOpen, onClose, setCharacter }) => {

    const [listQueue, setListQueue] = useState();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [claimedRewards, setClaimedRewards] = useState(null);

    const openRewardsDialog = (rewards) => setClaimedRewards(rewards);
    const closeRewardsDialog = () => setClaimedRewards(null);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/queue/get").then((response) => {
            setListQueue(response.data);
        });
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className='row row-cols-2 justify-content-center'>
            <div className="queue-dialog">
                <div className="row row-cols-3 header align-items-center">
                    <div className="col-2">
                        <i className="bi bi-clock-history"></i>
                    </div>
                    <div className="col-8 inventory-title text-center">
                        <h6 className="text-uppercase fw-bold">Fila de trabalhos</h6>
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-end">
                        <button className="btn btn-sm btn-danger" onClick={() => { onClose(); closeRewardsDialog() }}><i className="bi bi-x"></i></button>
                    </div>
                </div>
                <div className="row row-cols-3 body">
                    {typeof listQueue !== "undefined" && listQueue.map((queue) => (
                        <div key={queue.id} className="col-3">
                            <JobQueueCard
                                queue={queue}
                                listQueue={listQueue}
                                setListQueue={setListQueue}
                                openRewardsDialog={openRewardsDialog}
                                setMousePosition={setMousePosition}
                                setCharacter={setCharacter}
                            />
                        </div>
                    ))}
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
