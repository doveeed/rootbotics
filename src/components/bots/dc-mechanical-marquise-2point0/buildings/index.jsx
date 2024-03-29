import Sawmill from '../../../../assets/sawmill.png';
import Workshop from '../../../../assets/workshop.png';
import Recruiter from '../../../../assets/recruiter.png';
import Card from '../../../card';
import { useSettings } from '../../../../hooks/use-settings';

export default function Buildings({buildings = {}, onUpdateBuildings}) {
    const {factionColor } = useSettings();
    const {sawmill = [], workshop = [], recruiter = []} = buildings;

    const handleClick = ({index, type}) => {
        const building = buildings[type][index];
        const before = buildings[type].slice(0,index);
        const after = buildings[type].slice(index + 1);
        onUpdateBuildings({...buildings, [type]: [...before, { ...building, isPlaced: !building.isPlaced }, ...after]});
    } 

    return (
        <Card title='Buildings Track'>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: "flex", gap: '2%', flexWrap: "nowrap", width: '100%'}}>
                    <div style={{width: '72px', display: 'flex', alignItems: 'center', justifyContent: 'left', flexShrink: 0}}>Sawmills</div>
                    <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                    {sawmill.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1', minWidth: '36px', maxWidth: '92px'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Sawmill} width="100%" alt="sawmill" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div style={{display: "flex", gap: '2%', flexWrap: "nowrap", width: '100%'}}>
                    <div style={{width: '72px', display: 'flex', alignItems: 'center', justifyContent: 'left', flexShrink: 0}}>Workshops</div>
                    <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                    {workshop.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1', minWidth: '36px', maxWidth: '92px'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Workshop} width="100%" alt="workshop" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div style={{display: "flex", gap: '2%', flexWrap: "nowrap", width: '100%'}}>
                    <div style={{width: '72px', display: 'flex', alignItems: 'center', justifyContent: 'left', flexShrink: 0}}>Recruiters</div>
                    <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                    {recruiter.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1', minWidth: '36px', maxWidth: '92px'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Recruiter} width="100%" alt="recruiter" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export function BuildingsPreview({buildings = {}, orderedSuit, birdBuild}) {
    const {factionColor } = useSettings();
    const {sawmill = [], workshop = [], recruiter = []} = buildings;

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '1rem auto'}}>
            {(orderedSuit === 'fox' || (orderedSuit === 'bird' && birdBuild === 'sawmill')) && (<div style={{display: "flex", gap: '0.25rem', flexWrap: "wrap", width: '100%'}}>
                {sawmill.map(({id, isPlaced, points}) => (
                    <div  key={id} style={{position: "relative", display: 'flex', flexGrow: '0', width: '2rem',}}>
                        <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Sawmill} width="100%" alt="sawmill" />
                        <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                            fontSize: '1.5rem',
                            fontWeight: 'bold', borderRadius: '15%', border: `2px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                ))}
                </div>)}
                {(orderedSuit === 'rabbit' || (orderedSuit === 'bird' && birdBuild === 'workshop')) && (<div style={{display: "flex", gap: '0.25rem', flexWrap: "wrap", width: '100%'}}>
            {workshop.map(({id, isPlaced, points}) => (
                <div  key={id} style={{position: "relative", display: 'flex', flexGrow: '0', width: '2rem',}}>
                    <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Workshop} width="100%" alt="workshop" />
                    <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                        fontSize: '1.5rem',
                        fontWeight: 'bold', borderRadius: '15%', border: `2px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                </div>
            ))}
            </div>)}
            {(orderedSuit === 'mouse' || (orderedSuit === 'bird' && birdBuild === 'recruiter')) && (<div style={{display: "flex", gap: '0.25rem', flexWrap: "wrap", width: '100%'}}>
                {recruiter.map(({id, isPlaced, points}) => (
                   <div  key={id} style={{position: "relative", display: 'flex', flexGrow: '0', width: '2rem',}}>
                   <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Recruiter} width="100%" alt="recruiter" />
                   <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                       fontSize: '1.5rem',
                       fontWeight: 'bold', borderRadius: '15%', border: `2px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                ))}
            </div>)}
        </div>
    );
}
