import "./jobWidgets.css"
import React, { useState } from 'react';
import JobsInfoDialog from '../dialogs/JobsInfoDialog';

const JobsWidget = (props) => {
    const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

    const openJobDialog = () => { setIsJobDialogOpen(false); setIsJobDialogOpen(true) };
    const closeJobDialog = () => setIsJobDialogOpen(false);
    const job = props.job;
    const coordsx = job.coordsx;
    const coordsy = job.coordsy;
    const widgetBackground = {'--widget-background': `${job.attribute.color}60`};

    return (
        <div>
            <span
                className="job-widget"
                style={{
                    ...widgetBackground,
                    position: 'absolute',
                    left: `${job.coordsx}px`,
                    top: `${job.coordsy}px`,
                }}
                onClick={openJobDialog}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="widget-image" style={{ backgroundImage: `url("${job.icon}")` }}></div>
                </div>
            </span>

            <div className={`dialog job-info-dialog col-3 ${isJobDialogOpen ? 'is-open' : ''}`} style={{
                left: `${coordsx}px`,
                top: `${coordsy}px`,
            }}>
                <JobsInfoDialog isOpen={isJobDialogOpen} onClose={closeJobDialog} job={job} />
            </div>
            
        </div>
    );
};

export default JobsWidget;
