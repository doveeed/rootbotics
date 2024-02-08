import OrderButton from "./button";

export default function Order({order, onChangeOrder}) {
    const suits = ['bird', 'fox','rabbit', 'mouse'];
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            {suits.map((suit, index) => (
                <OrderButton
                    key={index}
                    suit={suit}
                    orderedSuit={order} 
                    setOrderedSuit={(suit) => onChangeOrder(suit)}
                >
                    {suit}
                </OrderButton>
            ))}
        </div>
    )
}