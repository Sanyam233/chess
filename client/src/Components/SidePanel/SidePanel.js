import PlayerPanel from "../PlayerPanel/PlayerPanel";
import MoveDirectory from "../MoveDirectory/MoveDirectory";

const SidePanel = () => {

    return (
        <div className = "side-panel">  
            <PlayerPanel>
                <MoveDirectory/>
            </PlayerPanel>
        </div>
    )

}


export default SidePanel;