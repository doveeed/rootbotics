import Fall from '../../assets/fall.png';
import Winter from '../../assets/winter.png';
import Lake from '../../assets/lake.png';
import Mountain from '../../assets/mountain.png';
import RabbitSuitColored from '../../assets/rabbit-suit-colored.png';
import FoxSuitColored from '../../assets/fox-suit-colored.png';
import MouseSuitColored from '../../assets/mouse-suit-colored.png';
import { useState } from 'react';

const shuffle =(suits) => {
    const array = [...suits]
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
export default function Map({type}) {
    let src;
    let coordinates = [];
    const [suits, updateSuits] = useState(shuffle(['fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse']));

   
      
    switch (type) {
        case 'fall':
            src = Fall;
            break;
        case 'winter':
            src = Winter;
            coordinates = [
                {
                    key: 1,
                    top: '-3%',
                    left: '8%',
                },
                {
                    key: 2,
                    top: '-4.5%',
                    right: '6.5%',
                },
                {
                    key: 3,
                    bottom: '17%',
                    right: '6%',
                },
                {
                    key: 4,
                    bottom: '25.5%',
                    left: '9%',
                },
                {
                    key: 5,
                    top: '-1%',
                    left: '34%',
                },
                {
                    key: 6,
                    top: '4.5%',
                    right: '33.5%',
                },
                {
                    key: 7,
                    top: '38%',
                    right: '5%',
                },
                {
                    key: 8,
                    bottom: '27%',
                    right: '31.5%',
                },
                {
                    key: 9,
                    bottom: '16.5%',
                    left: '36%',
                },
                {
                    key: 10,
                    top: '32%',
                    left: '6%',
                },
                {
                    key: 11,
                    top: '33%',
                    left: '36%',
                },
                {
                    key: 12,
                    top: '35%',
                    right: '28.5%',
                }
            ];
            break;
        case 'lake':
            src = Lake;
            coordinates = [
                {
                    key: 1,
                    bottom: '22%',
                    right: '9%',
                },
                {
                    key: 2,
                    top: '-3%',
                    left: '9%',
                },
                {
                    key: 3,
                    bottom: '24%',
                    left: '9%',
                },
                {
                    key: 4,
                    top: '-3%',
                    right: '5.5%',
                },
                {
                    key: 5,
                    top: '37.5%',
                    right: '5%',
                },
                {
                    key: 6,
                    top: '4.5%',
                    right: '28%',
                },
                {
                    key: 7,
                    top: '-0.5%',
                    left: '40%',
                },
                {
                    key: 8,
                    top: '32%',
                    left: '7%',
                },
                {
                    key: 9,
                    bottom: '17%',
                    right: '36%',
                },
                {
                    key: 10,
                    top: '26.5%',
                    left: '33.5%',
                },
                {
                    key: 11,
                    top: '34.5%',
                    right: '28%',
                },
                {
                    key: 12,
                    bottom: '35%',
                    left: '37.5%',
                }
            ];
            break;
        case 'mountain':
            src = Mountain;
            coordinates = [
                {
                    key: 1,
                    top: '-2%',
                    left: '8.5%',
                },
                {
                    key: 2,
                    top: '-2%',
                    right: '7%',
                },
                {
                    key: 3,
                    bottom: '15.5%',
                    right: '6.5%',
                },
                {
                    key: 4,
                    bottom: '25.5%',
                    left: '9.5%',
                },
                {
                    key: 5,
                    top: '0.5%',
                    right: '37%',
                },
                {
                    key: 6,
                    top: '39.5%',
                    right: '5.5%',
                },
                {
                    key: 7,
                    bottom: '16.5%',
                    left: '46%',
                },
                {
                    key: 8,
                    top: '33%',
                    left: '7%',
                },
                {
                    key: 9,
                    top: '24%',
                    left: '29.5%',
                },
                {
                    key: 10,
                    top: '27.5%',
                    left: '48.5%',
                },
                {
                    key: 11,
                    bottom: '43%',
                    right: '31%',
                },
                {
                    key: 12,
                    bottom: '44%',
                    left: '31%',
                }
            ];
            break;
        default:
            break;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{type}</h2>
            <div style={{position: 'relative'}}>
                <img src={src} width="100%" alt="Fall map clearing priority setup"/>
                {coordinates.map(({key,...rest}, index) => (
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
    
                        borderRadius: '50%',
                        width: '9%',
                        height: '9%',
                        ...rest}}
                    >
                        <img src={suits[index] === 'rabbit' ? RabbitSuitColored: suits[index] === 'fox' ? FoxSuitColored : MouseSuitColored} alt="cleairing suit" width="100%" />
                    </div>
                ))}
            </div>
            {type !== 'fall' && <button style={{width: 'fit-content', cursor: 'pointer'}} onClick={() => updateSuits(shuffle(suits))}>Shuffle</button>}
       </div>)
}