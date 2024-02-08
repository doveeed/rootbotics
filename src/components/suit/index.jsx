
export default function Suit({suit}) {
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
    return (<b style={{backgroundColor, padding: '0px 4px', borderRadius: '4px', fontSize: '0.75rem'}}>{suit}</b>);
}