import BirdSuit from '../../../../assets/bird-suit.png';
import MouseSuit from '../../../../assets/mouse-suit.png';
import RabbitSuit from '../../../../assets/rabbit-suit.png';
import FoxSuit from '../../../../assets/fox-suit.png';
import Button from '../../../button';

export default function Decree({decree = {}, onUpdateDecree = () => {}}) {
    const {fox = 0, mouse = 0, rabbit = 0, bird = 0} = decree;

    const onUpdate =(column, amount) => {
        onUpdateDecree({...decree, [column]: decree[column] + amount});
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', paddingBottom: '1rem'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}><div style={{
                border: '2px solid black',
                borderRadius: '4px',
                backgroundColor: '#e6594f',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: '1',
                width: '45px',
                height: '70px'
            }}><img src={FoxSuit} alt="fox card" width='80%' /></div><Button disabled={fox=== 0} onClick={() => onUpdate('fox', -1)}>+</Button>{fox}<Button onClick={() => onUpdate('fox', 1)}>+</Button></div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}><div style={{
                border: '2px solid black',
                borderRadius: '4px',
                backgroundColor: '#f7986c',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: '1',
                width: '45px',
                height: '70px'
            }}><img src={MouseSuit} alt="mouse card" width='80%' /></div><Button disabled={mouse=== 0} onClick={() => onUpdate('mouse', -1)}>+</Button>{mouse}<Button onClick={() => onUpdate('mouse', 1)}>+</Button></div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}><div style={{
                border: '2px solid black',
                borderRadius: '4px',
                backgroundColor: '#f4e274',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: '1',
                width: '45px',
                height: '70px'
            }}><img src={RabbitSuit} alt="rabbit card" width='80%' /></div><Button disabled={rabbit === 0} onClick={() => onUpdate('rabbit', -1)}>+</Button>{rabbit}<Button onClick={() => onUpdate('rabbit', 1)}>+</Button></div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}><div style={{
                border: '2px solid black',
                borderRadius: '4px',
                backgroundColor: '#56c3bc',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: '1',
                width: '45px',
                height: '70px'
            }}><img src={BirdSuit} alt="bird card" width='80%' /></div><Button disabled={bird === 0} onClick={() => onUpdate('bird', -1)}>+</Button>{bird}<Button onClick={() => onUpdate('bird', 1)}>+</Button></div>
        </div>
    )
}