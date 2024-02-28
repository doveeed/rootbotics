import { useEffect, useState } from 'react';
import Item from '../../../../assets/item.png';
import { useSettings } from '../../../../hooks/use-settings';
import { getRandomKey } from '../../../../utils';
import Button from '../../../button';
import Card from '../../../card';

export default function Items({items = [], onUpdateItems = () => {}}) {
    const {factionColor } = useSettings();
    const [isLongPressed, setIsLongPressed] = useState(false);
    const [clickedItemIndex, setClickedItemIndex] = useState(-1);

    useEffect(() => {
        if (clickedItemIndex === -1) {
            return;
        }
        const timeoutId = setTimeout(() => {

            const before = items.slice(0,clickedItemIndex);
            const after = items.slice(clickedItemIndex + 1);
                setIsLongPressed(true);
                onUpdateItems([...before, {...items[clickedItemIndex], isDamaged: !items[clickedItemIndex].isDamaged}, ...after])
        }, 500);

            return () => {
                clearTimeout(timeoutId);
            };
    }, [isLongPressed, clickedItemIndex, onUpdateItems, items]);

    const handleMouseDown = (index) => {
        setClickedItemIndex(index);
        setIsLongPressed(false);
    };
    
    const handleMouseUp = (index) => {
        const before = items.slice(0,index);
        const after = items.slice(index + 1);
        setClickedItemIndex(-1);
        if (isLongPressed) {
            
            return;
        }

        onUpdateItems([...before, {...items[index], isExausted: !items[index].isExausted}, ...after]);
    };




    return (
        <Card title="Satchel">
            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                <div style={{display: "grid", gap: '0.5rem',  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', flexWrap: "wrap", width: '100%'}}>
                    {items.map(({key, isExausted, isDamaged}, index) => (
                        <div onTouchStart={() => handleMouseDown(index)} onMouseDown={() => handleMouseDown(index)} onMouseUp={() => handleMouseUp(index)} onTouchEnd={() => handleMouseUp(index)}  key={key} style={{position: "relative", cursor: "pointer", display: 'flex', flex: 1,}} >
                            <img style={{opacity: '100%', borderRadius: '15%'}} src={Item} width="100%" alt="sawmill" />
                            {isExausted && (<div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', backgroundColor: 'black', opacity: '40%', borderRadius: '15%', position: "absolute", top: 0,}}></div>)}
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1.25rem',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${factionColor}`,position: "absolute", top: 0,}}>{isDamaged && (<>Damaged</>)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Button onClick={() => {
                onUpdateItems([...items, {key: getRandomKey(), isExausted: false, isDamaged: false}])
            }}>Add item</Button>
            <Button onClick={() => {
                onUpdateItems(items.slice(0, -1))
            }}>Remove item</Button>
        </Card>
    )
}