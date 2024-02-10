import Mole from '../../../../assets/mole.png';
import Number from '../../../number';
import OneVP from '../../../one-vp';

export const ministerNameActionMapping = {
    'Banker': 'Repeat the Build Action.',
    'Baron of Dirt': <>Score <OneVP /> per market on the map.</>,
    'Brigadier': 'Repeat the Dig Action if there are at least 3 warriors in the burrow, targeting the clearing with the most enemy buildings and tokens.',
    'Captain': 'As attacker, deal an extra hit in clearings with a tunnel.',
    'Duchess of Mud': <>Score <Number value={2} /> if all tunnels are on the map.</>,
    'Earl of Stone': <>Score <OneVP /> per citadel on the map.</>,
    'Foremole': <>You have an additional revealed <img src={Mole} alt="Duchy warrior" height={24} width={24} style={{marginBottom: '-6px'}}/>.</>,
    'Marshal': 'Place a warrior from your supply into such a clearing that has at least one of your buildings and the least of your warriors.',
    'Mayor': <>Return a warrior to your supply from the clearing you rule with the most of your warriors Score <OneVP />.</>,
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
                        <label style={{display: "flex", alignItems: 'start', marginBottom: '8px'}} htmlFor={`${level}-${suit}-${index}`}>
                        <input type="checkbox" checked={isSwayed} id={`${level}-${suit}-${index}`}
                        onChange={() => {
                            const before = ministers.slice(0,index);
                            const after = ministers.slice(index + 1);
                            onUpdateMinisters([...before, {suit, name, action, level, isSwayed: !isSwayed}, ...after])
                        }}/>
                        <div style={{minWidth: '144px', backgroundColor, borderRadius: '4px', padding: '0 8px', margin: '0px 8px', display: 'flex', justifyContent: 'center'}}><b>{name}</b></div>
                        <div style={{flex: 1}}>{ministerNameActionMapping[name]}</div>
                        </label>
                    </div>
                )})}
        </div>
    )
}