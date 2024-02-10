
export default function Number({value, isNegative = false}) {
    
    return (<b style={{backgroundColor: 'black', color: 'white', padding: '0px 8px', borderRadius: '4px', fontSize: '0.75rem'}}>{isNegative ? '-' : '+'}{value}</b>);
}