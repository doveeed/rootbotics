
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
                        {/* <div style={{minWidth: '56px'}}><Suit suit={suit} /></div> */}
                        <div style={{minWidth: '144px', backgroundColor, borderRadius: '4px', padding: '0 8px', margin: '0px 8px', display: 'flex', justifyContent: 'center'}}><b style={{}}>{name}</b></div>
                        <div style={{flex: 1}}>{action}</div>
                        </label>
                    </div>
                )})}
        </div>
    )
}