import Bomb from '../../../../assets/bomb.png';
import Extortion from '../../../../assets/extortion.png';
import Raid from '../../../../assets/raid.png';
import Snare from '../../../../assets/snare.png';
import UnflippedPlot from '../../../../assets/plot.png';
import { useSettings } from '../../../../hooks/use-settings';


export default function Plot ({type, flipped, onFlip}) {
    const {factionColor} = useSettings()
    let bgImg = 'none';

    switch(type) {
        case 'bomb':
            bgImg = Bomb;
            break;
        case 'extortion':
            bgImg = Extortion;
            break;
        case 'raid':
            bgImg = Raid;
            break;
        case 'snare':
            bgImg = Snare;
            break;
        default:
            break;
    }
   return (
    <div
    style={{display: 'flex', flex: '1', position: 'relative', cursor: 'pointer'}}
    onClick={onFlip}
        
    >
        <img src={flipped ? bgImg : UnflippedPlot} width="100%" alt={`${type} plot`} />
        <div
        style={{
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            border: `4px solid ${flipped ? factionColor: 'transparent'}`,
            borderRadius: '50%', 
            boxSizing: 'border-box',
            display: 'flex',
        }}
    >
    </div>
   </div>)
}

export function PlotPreview ({type, flipped}) {
    const {factionColor} = useSettings()
    let bgImg = 'none';

    switch(type) {
        case 'bomb':
            bgImg = Bomb;
            break;
        case 'extortion':
            bgImg = Extortion;
            break;
        case 'raid':
            bgImg = Raid;
            break;
        case 'snare':
            bgImg = Snare;
            break;
        default:
            break;
    }
   return (
    <div
    style={{display: 'flex', flexGrow: '0', width: '2rem', position: 'relative',}}
        
    >
        <img src={flipped ? bgImg : UnflippedPlot} width="100%" alt={`${type} plot`}/>
        <div
        style={{
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            border: `2px solid ${flipped ? factionColor: 'transparent'}`,
            borderRadius: '50%', 
            boxSizing: 'border-box',
            display: 'flex',
        }}
    >
    </div>
   </div>)
}