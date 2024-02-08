import Card from "../../../card";
import MouseTradePost from '../../../../assets/mouse-trade-post.png';
import RabbitTradePost from '../../../../assets/rabbit-trade-post.png';
import FoxTradePost from '../../../../assets/fox-trade-post.png';

export default function TradePosts({tradeposts = {}, onUpdateTradePosts}) {
    const {mouse = [], rabbit, fox} = tradeposts;

    const handleClick = ({index, type}) => {
        const tradepost = tradeposts[type][index];
        const before = tradeposts[type].slice(0,index);
        const after = tradeposts[type].slice(index + 1);
        onUpdateTradePosts({mouse, rabbit, fox, [type]: [...before, { ...tradepost, isPlaced: !tradepost.isPlaced }, ...after]});
    };
    
    return (
        <Card title='Trade Posts'>
            <div style={{marginBottom: '1rem'}}>Whenever a player removes a trade post, return half their warriors from the Payments box (rounded up).</div>
            <div>
                <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem'}}>
                    {fox.map(({id,type, isPlaced, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer"}} onClick={() => handleClick({index, type})}>
                        <div style={{width: '100px', height: '100px', display: 'flex', alignItems: "center", justifyContent: 'center', backgroundImage: `url(${FoxTradePost})`, backgroundSize: 'cover', opacity: isPlaced ? '50%' : '100%'}} ></div>
                        <div style={{width: '92px', height: '92px', display: 'flex', alignItems: "center", justifyContent: 'center', 
                            fontSize: '2rem',
                            fontWeight: 'bold', borderRadius: '50%', border: `4px solid ${isPlaced ? '#56c3bc' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                    ))}
                </div>
                <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem'}}>
                {rabbit.map(({id,type, isPlaced, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer"}} onClick={() => handleClick({index, type})}>
                        <div style={{width: '100px', height: '100px', display: 'flex', alignItems: "center", justifyContent: 'center', backgroundImage: `url(${RabbitTradePost})`, backgroundSize: 'cover', opacity: isPlaced ? '50%' : '100%'}} ></div>
                        <div style={{width: '92px', height: '92px', display: 'flex', alignItems: "center", justifyContent: 'center', 
                            fontSize: '2rem',
                            fontWeight: 'bold', borderRadius: '50%', border: `4px solid ${isPlaced ? '#56c3bc' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                    ))}
                </div>
                <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem'}}>
                {mouse.map(({id,type, isPlaced, points}, index) => (
                        <div  key={id} style={{position: "relative", cursor: "pointer"}} onClick={() => handleClick({index, type})}>
                        <div style={{width: '100px', height: '100px', display: 'flex', alignItems: "center", justifyContent: 'center', backgroundImage: `url(${MouseTradePost})`, backgroundSize: 'cover', opacity: isPlaced ? '50%' : '100%'}} ></div>
                        <div style={{width: '92px', height: '92px', display: 'flex', alignItems: "center", justifyContent: 'center', 
                            fontSize: '2rem',
                            fontWeight: 'bold', borderRadius: '50%', border: `4px solid ${isPlaced ? '#56c3bc' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                    </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}