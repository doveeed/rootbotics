import OrderButton from "./button";
import BirdSuit from '../../assets/bird-suit.png';
import MouseSuit from '../../assets/mouse-suit.png';
import RabbitSuit from '../../assets/rabbit-suit.png';
import FoxSuit from '../../assets/fox-suit.png';

const suitImgMap = {
    bird: BirdSuit,
    mouse: MouseSuit,
    rabbit: RabbitSuit,
    fox: FoxSuit,
}

export default function Order({order, onChangeOrder}) {
    const suits = ['bird', 'fox','rabbit', 'mouse'];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '0.5rem',
            maxWidth: '400px'
        }}>
            {suits.map((suit, index) => (
                <OrderButton
                    key={index}
                    suit={suit}
                    orderedSuit={order} 
                    setOrderedSuit={(suit) => onChangeOrder(suit)}
                >
                    <img src={suitImgMap[suit]} alt={suit} width='80%' />
                </OrderButton>
            ))}
        </div>
    )
}