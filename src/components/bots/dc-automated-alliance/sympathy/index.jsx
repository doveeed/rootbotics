
import SympathyToken from '../../../../assets/sympathy.png';
import { useSettings } from '../../../../hooks/use-settings';

export default function Sympathy({sympathy = [], onUpdateSympathy = () => {}}) {
    const { factionColor} = useSettings();

    const handleClick = ({index}) => {
        const before = sympathy.slice(0,index);
        const after = sympathy.slice(index + 1);
        onUpdateSympathy([...before, { ...sympathy[index], isPlaced: !sympathy[index].isPlaced},...after])
    };
    
    return (
            <div style={{margin: '0 auto', display: "flex", gap: '0.5rem', flexWrap: "wrap", marginBottom: '1rem', justifyContent: 'center'}}>
                {sympathy.map(({id, isPlaced, points}, index) => (
                        <div key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1', minWidth: '2.5rem', maxWidth: '4rem'}} onClick={() => handleClick({index})}>
                            <img src={SympathyToken} style={{opacity: isPlaced ? '50%' : '100%'}} width="100%" alt="fox trade post"/>
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '2rem',
                                fontWeight: 'bold', borderRadius: '50%', border: `4px solid ${isPlaced ? factionColor : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    ))}
            </div>
    );
}

export function SympathyPreview({sympathy = []}) {
    const {factionColor} = useSettings();
    return (
        <div style={{margin: '1rem auto', display: "flex", gap: '0.25rem', flexWrap: "wrap",}}>
            {sympathy.map(({id, isPlaced, points}) => (
                    <div key={id} style={{position: "relative", display: 'flex', flexGrow: 0, width: '2rem'}} >
                        <img src={SympathyToken} style={{opacity: isPlaced ? '50%' : '100%'}} width="100%" alt="fox trade post"/>
                        <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                            fontSize: '1.5rem',
                            fontWeight: 'bold', borderRadius: '50%', border: `2px solid ${isPlaced ? factionColor: 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                ))}
        </div>
);
}