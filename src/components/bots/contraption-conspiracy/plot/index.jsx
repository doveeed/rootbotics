import Bomb from '../../../../assets/bomb.png';
import Extortion from '../../../../assets/extortion.png';
import Raid from '../../../../assets/raid.png';
import Snare from '../../../../assets/snare.png';


export default function Plot ({type, flipped, onFlip}) {
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
        <img src={bgImg} width="100%" alt={`${type} plot`} style={{opacity: flipped ? '50%' : '100%'}} />
        <div
        style={{
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            border: `4px solid ${flipped ? '#3c2d90': 'transparent'}`,
            borderRadius: '50%', 
            boxSizing: 'border-box',
            display: 'flex',
        }}
    >
    </div>
   </div>)
}