import "./jobWidgets.css"
import React, { useState } from 'react';
import JobsInfoDialog from './JobsInfoDialog';

const JobsWidget = ({ jobLocation }) => {

    const job = jobLocation.job;
    const coords = { x: jobLocation.coordsx, y: jobLocation.coordsy }

    const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

    const openJobDialog = () => { setIsJobDialogOpen(false); setIsJobDialogOpen(true) };
    const closeJobDialog = () => setIsJobDialogOpen(false);
    const widgetBackground = { '--widget-background': `${job.attribute.color}60` };

    return (
        <div>
            <span
                className="job-widget"
                style={{
                    ...widgetBackground,
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                }}
                onClick={openJobDialog}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="widget-image" style={{ backgroundImage: `url("${job.icon}")` }}></div>
                </div>
            </span>

            <div className={`row job-info-dialog ${isJobDialogOpen ? 'is-open' : ''}`}
                style={{
                    position: 'absolute',
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                }}>
                <JobsInfoDialog isOpen={isJobDialogOpen} onClose={closeJobDialog} job={job} coords={coords} />
            </div>

        </div>
    );
};

export default JobsWidget;
