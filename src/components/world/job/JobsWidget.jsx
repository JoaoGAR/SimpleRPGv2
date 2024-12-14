import "./jobWidgets.css"
import React, { useState } from 'react';
import JobsInfoDialog from './JobsInfoDialog';

const JobsWidget = ({ jobLocation }) => {

    const job = jobLocation.job;
    const coordsx = jobLocation.coordsx;
    const coordsy = jobLocation.coordsy;

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
                    left: `${coordsx}px`,
                    top: `${coordsy}px`,
                }}
                onClick={openJobDialog}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="widget-image" style={{ backgroundImage: `url("${job.icon}")` }}></div>
                </div>
            </span>

            <div className={`dialog ${isJobDialogOpen ? 'is-open' : ''}`}>
                <JobsInfoDialog isOpen={isJobDialogOpen} onClose={closeJobDialog} job={job} />
            </div>

        </div>
    );
};

export default JobsWidget;
