
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
                borderRadius: '4px',
                backgroundColor,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                marginRight: '8px',
                opacity: suit === orderedSuit ? '100%' : '50%',
                padding: '8px 16px',
            }}>{children}</button>
    );
}