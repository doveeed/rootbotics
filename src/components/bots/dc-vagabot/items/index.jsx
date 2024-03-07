import { useCallback, useRef, useState } from 'react';
import Item from '../../../../assets/item.png';
import { useSettings } from '../../../../hooks/use-settings';
import { getRandomKey } from '../../../../utils';
import Button from '../../../button';
import Card from '../../../card';

export function isBattleTrack(index) {
    return index === 5 || index === 8 || index === 11;
}

export default function Items({items = [], onUpdateItems = () => {}}) {
    const {factionColor } = useSettings();
    const [isLongPressed, setIsLongPressed] = useState(false);
    const ref = useRef(undefined);

    const handleMouseDown = useCallback((index) => {
        if (isBattleTrack(index)) {
            return;
        }
        setIsLongPressed(false);

        ref.current = setTimeout(() => {
            const before = items.slice(0,index);
            const after = items.slice(index + 1);
                setIsLongPressed(true);
                onUpdateItems([...before, {...items[index], isDamaged: !items[index].isDamaged}, ...after])
        }, 600);
    }, [ref, items, onUpdateItems]);
    
    const handleMouseUp = useCallback(() => {
        if (ref.current) {
            clearTimeout(ref.current);
            ref.current = undefined;
        }
    }, []);

    const handleClick = useCallback((index) => {
        if (isLongPressed || isBattleTrack(index)) {
            return;
        }

        const before = items.slice(0,index);
        const after = items.slice(index + 1);
        onUpdateItems([...before, {...items[index], isExhausted: !items[index].isExhausted}, ...after]);
    },  [isLongPressed, onUpdateItems, items]);

    return (
        <>
        <Card title="Battle Track">
            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                <div style={{display: "grid", gap: '0.5rem',  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', flexWrap: "wrap", width: '100%'}}>
                    {items.map(({key, isExhausted, isDamaged}, index) => isBattleTrack(index) ? (
                        <div key={key} style={{position: "relative", userSelect: 'none', display: 'flex', flex: 1,}} >
                            <img style={{opacity: '100%', borderRadius: '15%'}} src={Item} width="100%" alt="sawmill" />
                            {isExhausted && (<div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', backgroundColor: 'black', opacity: '40%', borderRadius: '15%', position: "absolute", top: 0,}}></div>)}                          
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1rem',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                                userSelect: 'none',
                                overflow: 'hidden',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${factionColor}`,position: "absolute", top: 0,}}><div style={{transform:'rotate(-45deg)', lineHeight: '1rem'}}>{isDamaged && (<>Damaged</>)}{isBattleTrack(index) && (<>Battle</>)}</div></div>
                        </div>
                    ): null)}
                </div>
            </div>

            <b>{`Maximum Rolled Hits: ${items.length >= 12 ? `3, deal an extra hit` : items.length >= 9 ? 3 : items.length >= 6 ? 2 : 1}`}</b>
        </Card>
        <Card title="Satchel">
            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                <div style={{display: "grid", gap: '0.5rem',  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', flexWrap: "wrap", width: '100%'}}>
                    {items.map(({key, isExhausted, isDamaged}, index) => isBattleTrack(index) ? null :(
                        <div onTouchStart={() => handleMouseDown(index)} onTouchEnd={() => handleMouseUp()} onMouseDown={() => handleMouseDown(index)} onMouseUp={() => handleMouseUp()} onClick={() => handleClick(index)} key={key} style={{position: "relative", userSelect: 'none', cursor: "pointer", display: 'flex', flex: 1,}} >
                            <img style={{opacity: '100%', borderRadius: '15%'}} src={Item} width="100%" alt="sawmill" />
                            {isExhausted && (<div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', backgroundColor: 'black', opacity: '40%', borderRadius: '15%', position: "absolute", top: 0,}}></div>)}                          
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '1rem',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                                userSelect: 'none',
                                overflow: 'hidden',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${factionColor}`,position: "absolute", top: 0,}}><div style={{transform:'rotate(-45deg)', lineHeight: '1rem'}}>{isDamaged && (<>Damaged</>)}{isBattleTrack(index) && (<>Battle</>)}</div></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '4px'}}>
                <Button onClick={() => {
                    onUpdateItems([...items, {key: getRandomKey(), isExhausted: false, isDamaged: false}])
                }}>Add item</Button>
                <Button onClick={() => {
                    onUpdateItems(items.slice(0, -1))
                }}>Remove item</Button>
            </div>
        </Card>
        </>
    )
}

export function ItemsPreview({items = []}) {
    const {factionColor } = useSettings();
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
            <div style={{display: "flex", gap: '0.25rem', flexWrap: "wrap", width: '100%'}}>
                {items.map(({key, isExhausted, isDamaged}, index) => isBattleTrack(index) ? null : (
                    <div  key={key} style={{position: "relative", userSelect: 'none', display: 'flex', width: '2rem'}} >
                        <img style={{opacity: '100%', borderRadius: '15%'}} src={Item} width="100%" alt="sawmill" />
                        {isExhausted && (<div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', backgroundColor: 'black', opacity: '40%', borderRadius: '15%', position: "absolute", top: 0,}}></div>)}                          
                        <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                            fontSize: '1.25rem',
                            wordBreak: 'break-all',
                            textAlign: 'center',
                            userSelect: 'none',
                            overflow: 'hidden',
                            fontWeight: 'bold', borderRadius: '15%', border: `2px solid ${factionColor}`,position: "absolute", top: 0,}}><div style={{transform:'rotate(-45deg)', lineHeight: '1rem'}}>{isDamaged && (<>D</>)}</div></div>
                    </div>
                ))}
            </div>
        </div>
    )
}