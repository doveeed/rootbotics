
import Roost from '../../../../assets/roost.png';

export default function Buildings({buildings = [], onUpdateBuildings}) {

    const handleClick = ({index}) => {
        const before = buildings.slice(0,index);
        const after = buildings.slice(index + 1);
        onUpdateBuildings([...before, { ...buildings[index], isPlaced: !buildings[index].isPlaced }, ...after]);
    } 

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: "flex", gap: '2%', flexWrap: "wrap", width: '100%'}}>
                {buildings.map(({id, isPlaced, points}, index) => (
                    <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index})}>
                        <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Roost} width="100%" alt="sawmill" />
                        <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                            fontSize: '1.5rem',
                            fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? 'blue' : 'transparent'}`,position: "absolute", top: 0,}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BuildingsPreview({buildings = []}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: '1rem auto'}}>
            <div style={{display: "flex", gap: '0.25rem', flexWrap: "wrap", width: '100%'}}>
                {buildings.map(({id, isPlaced, points}) => (
                    <div  key={id} style={{position: "relative", display: 'flex', flexGrow: '0', width: '2rem'}} >
                        <img style={{opacity: isPlaced ? '50%' : '100%', borderRadius: '15%'}} src={Roost} width="100%" alt="sawmill" />
                        <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                            fontSize: '1rem',
                            fontWeight: 'bold', borderRadius: '15%', border: `2px solid ${isPlaced ? 'blue' : 'transparent'}`,position: "absolute", top: 0,}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}