
export default function OrderButton({orderedSuit ='', suit = '', setOrderedSuit = () => {}, children}) {
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
        <button 
            onClick={() => setOrderedSuit(suit)}
            style={{
                border: 'none',
                borderRadius: '5%',
                backgroundColor,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                opacity: suit === orderedSuit ? '100%' : '50%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flex: '1',
                width: '25%',
                paddingTop: '10%',
                paddingBottom: '10%',
                position: 'relative',
            }}>
                <div style={{position: 'absolute', top: 0, borderRadius: '5%', border: `4px solid ${suit === orderedSuit ? 'white' : 'transparent'}`, height: '100%', width: '100%', boxSizing: 'border-box'}}></div>
                {children}
            </button>
    );
}