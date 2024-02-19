
import FoxBase from '../../../../assets/fox-base.png';
import RabbitBase from '../../../../assets/rabbit-base.png';
import MouseBase from '../../../../assets/mouse-base.png';

export default function Buildings({buildings, onUpdateBuildings}) {
    const {fox, rabbit, mouse} = buildings

    const handleClick = (type) => {
        onUpdateBuildings({...buildings, [type]: {...buildings[type], isPlaced: !buildings[type].isPlaced}})

    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', maxWidth: '400px'}}>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {handleClick(fox.suit)}}>
                        <img src={FoxBase} style={{opacity: fox.isPlaced ? '50%': '100%'}} width="100%" alt='fox base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${fox.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {handleClick(rabbit.suit)}}>
                        <img src={RabbitBase} style={{opacity: rabbit.isPlaced ? '50%': '100%'}} width="100%" alt='rabbit base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${rabbit.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {handleClick(mouse.suit)}}>
                        <img src={MouseBase} style={{opacity: mouse.isPlaced ? '50%': '100%'}} width="100%" alt='mouse base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${mouse.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function BuildingsPreview({buildings}) {
    const {fox, rabbit, mouse} = buildings
    
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'flex', gap: '0.25rem', margin: '1rem 0'}}>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1', minWidth: '2rem', maxWidth: '2rem',}} >
                        <img src={FoxBase} style={{opacity: fox.isPlaced ? '50%': '100%'}} width="100%" alt='fox base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${fox.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1', minWidth: '2rem', maxWidth: '2rem',}} >
                        <img src={RabbitBase} style={{opacity: rabbit.isPlaced ? '50%': '100%'}} width="100%" alt='rabbit base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${rabbit.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                    <div  style={{position: 'relative', cursor: 'pointer', display: 'flex', flexGrow: 0, width: '2rem'}} >
                        <img src={MouseBase} style={{opacity: mouse.isPlaced ? '50%': '100%'}} width="100%" alt='mouse base'/>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `4px solid ${mouse.isPlaced ? '#6db456': 'transparent'}`,
                            borderRadius: '15%',
                            position: 'absolute',
                            boxSizing: 'border-box',
                            top: 0,
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}