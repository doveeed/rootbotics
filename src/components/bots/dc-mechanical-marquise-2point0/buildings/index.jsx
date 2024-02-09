import Sawmill from '../../../../assets/sawmill.png';
import Workshop from '../../../../assets/workshop.png';
import Recruiter from '../../../../assets/recruiter.png';
import Card from '../../../card';
import Suit from '../../../suit';

export default function Buildings({buildings = {}, onUpdateBuildings}) {
    const {sawmill = [], workshop = [], recruiter = []} = buildings;

    const handleClick = ({index, type}) => {
        const building = buildings[type][index];
        const before = buildings[type].slice(0,index);
        const after = buildings[type].slice(index + 1);
        onUpdateBuildings({...buildings, [type]: [...before, { ...building, isPlaced: !building.isPlaced }, ...after]});
    } 

    return (
        <Card title='Buildings'>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                    <div style={{width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}><Suit suit="fox" /></div>
                    {sawmill.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Sawmill} width="100%" alt="sawmill" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? 'orange' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                </div>
                <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                <div style={{width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}><Suit suit="rabbit" /></div>
                {workshop.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Workshop} width="100%" alt="workshop" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? 'orange' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                </div>
                <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                <div style={{width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}><Suit suit="mouse" /></div>
                {recruiter.map(({id, isPlaced, type, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Recruiter} width="100%" alt="recruiter" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.5rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? 'orange' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}