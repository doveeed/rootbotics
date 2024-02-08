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
        style={{
            width: '94px', 
            height: '94px',
            border: `4px solid ${flipped ? 'purple': 'transparent'}`,
            borderRadius: '50%', 
        }}
    >
    <div
        onClick={onFlip}
        style={{
            background: `url(${bgImg})`,
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer', 
            width: '102px', 
            height: '102px', 
            borderRadius: '50%', 
            alignItems: 'center', 
            justifyContent: 'center', 
            display: 'flex',
            opacity: flipped ? '50%' : '100%',
            flexWrap: 'wrap',
            backgroundSize: 'cover',
            margin: '-4px'
        }}
    >
    </div>
   </div>)
}