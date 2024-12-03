import "./structuresWidget.css"
import React from 'react';

const StructuresWidget = ({ structure }) => {
    return (
        <div>
            <span
                className="structure-widget"
                style={{
                    position: 'absolute',
                    left: `${structure.coordsx}px`,
                    top: `${structure.coordsy}px`,
                }}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="widget-image" style={{ backgroundImage: `url("${structure.icon}")` }}></div>
                </div>
            </span>
        </div>
    );
};

export default StructuresWidget;