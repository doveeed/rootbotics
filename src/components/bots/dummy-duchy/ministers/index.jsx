import Mole from '../../../../assets/mole.png';
import OneVP from '../../../one-vp';
import VP2 from '../../../../assets/vp2.png';

export const ministerNameActionMapping = {
    'Banker': <>Repeat the <b>Build</b> action.</>,
    'Baron of Dirt': <>Score <OneVP /> per market on the map.</>,
    'Brigadier': <>Repeat the <b>Dig</b> action if there are at least 3 warriors in the Burrow, targeting the clearing with the most enemy buildings and tokens.</>,
    'Captain': 'As attacker, deal an extra Hit in clearings with a tunnel.',
    'Duchess of Mud': <>Score <img src={VP2} alt="two victory points" width={24} style={{marginBottom: '-4px'}}/> if all tunnels are on the map.</>,
    'Earl of Stone': <>Score <OneVP /> per citadel on the map.</>,
    'Foremole': <>You have an additional revealed <img src={Mole} alt="Duchy warrior" height={24} width={24} style={{marginBottom: '-6px'}}/>.</>,
    'Marshal': 'Place a warrior from your supply into the clearing that has at least one of your buildings and the least of your warriors.',
    'Mayor': <>Return a warrior to your supply from the clearing you rule with the most of your warriors. Score <OneVP />.</>,
}

export default function Ministers ({ministers, onUpdateMinisters
}) {

    
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
             {ministers.map(({suit, name, action, level, isSwayed}, index) => {
                let backgroundColor;
                switch (suit) {
                    case 'fox':
                        backgroundColor = '#e6594f';
                        break;
                    case 'mouse':
                        backgroundColor = '#f7986c';
                        break;
                    case 'rabbit':
                        backgroundColor = '#f4e274';
                        break;
                    case 'bird':
                        backgroundColor = '#56c3bc';
                        break;
                    default:
                        backgroundColor = 'none';
            
                }
                return (
                    <div  key={`${level}-${suit}-${index}`}>
                        <label style={{display: "flex", alignItems: 'start', marginBottom: '8px', cursor: 'pointer'}} htmlFor={`${level}-${suit}-${index}`}>
                        <input type="checkbox" checked={isSwayed} id={`${level}-${suit}-${index}`}
                        onChange={() => {
                            const before = ministers.slice(0,index);
                            const after = ministers.slice(index + 1);
                            onUpdateMinisters([...before, {suit, name, action, level, isSwayed: !isSwayed}, ...after])
                        }} style={{accentColor: backgroundColor}} />
                        <div style={{minWidth: '144px', backgroundColor, borderRadius: '4px', padding: '0 8px', margin: '0px 8px', display: 'flex', justifyContent: 'center'}}><b>{name}</b></div>
                        <div style={{flex: 1}}>{ministerNameActionMapping[name]}</div>
                        </label>
                    </div>
                )})}
        </div>
    )
}