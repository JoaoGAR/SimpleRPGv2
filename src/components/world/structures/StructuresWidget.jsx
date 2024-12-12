import "./structuresWidget.css"
import { useNavigate } from 'react-router-dom';

const StructuresWidget = ({ structure }) => {

    const navigate = useNavigate();
    const structureName = structure.name.replace(/ /g, '-');
    const openCityDialog = () => { navigate(`/city/${structureName}/${structure.id}`); };

    return (
        <div>
            <span
                className="structure-widget"
                style={{
                    position: 'absolute',
                    left: `${structure.coordsx}px`,
                    top: `${structure.coordsy}px`,
                }}
                onClick={openCityDialog}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="widget-image" style={{ backgroundImage: `url("${structure.icon}")` }}></div>
                </div>
            </span>
        </div>
    );
};

export default StructuresWidget;