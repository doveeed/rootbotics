import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import TradePosts, { TradePostsPreview } from './trade-posts';
import OneVP from "../../one-vp";
import Shield from '../../../assets/shield.png';
import Sword from '../../../assets/sword.png';
import { getFactionColor } from "../../../utils";
import Button from "../../button";
import FoxTradePost from '../../../assets/fox-trade-post.png';
import MouseTradePost from '../../../assets/mouse-trade-post.png';
import RabbitTradePost from '../../../assets/rabbit-trade-post.png';


export default function RivetfolkCompany({faction, state = {}, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', tradeposts = {}, protectionism = 'none'} = state;
    const isBossMode = level === 'boss';
    const isFerocious = traits.some(({id, isEnabled}) => id === 'ferocious' && isEnabled);
    const levelToRecruit = {
        'beginner': '0 warriors',
        'expert': '1 warrior',
        'master': '2 warriors',
        'boss': '2 warriors',
    }

    const levelToPoints = {
        'beginner': 0,
        'expert': 1,
        'master': 2,
        'boss': 2,
    }

    const suitToNumPlacedTradePosts = {
        fox: tradeposts.fox.filter(({isPlaced}) => isPlaced).length,
        mouse: tradeposts.mouse.filter(({isPlaced}) => isPlaced).length,
        rabbit: tradeposts.rabbit.filter(({isPlaced}) => isPlaced).length,
    }

    const placeTradePost = (type) => {
        const index = tradeposts[type].findIndex(({isPlaced}) => !isPlaced);
        if (index === -1) {
            return;
        }
        const before = tradeposts[type].slice(0,index);
        const after = tradeposts[type].slice(index + 1);
        updateState({...state, tradeposts: {...state.tradeposts, [type]: [...before, {...tradeposts[type][index], isPlaced: true},...after]}})
    }

    const daylightSteps = [
        <Step 
            title="Build"
            description={<>a trade post in a <Suit suit={orderedSuit} /> clearing without one. Place {levelToRecruit[level]} into the same clearing.
            {(orderedSuit === 'bird' || orderedSuit === 'fox') && suitToNumPlacedTradePosts['fox'] < 3 && (<> <Button img={FoxTradePost} alt={`fox trade post`} onClick={() => placeTradePost('fox')} >place a</Button></>)}
            {(orderedSuit === 'bird' || orderedSuit === 'rabbit') && suitToNumPlacedTradePosts['rabbit'] < 3 && (<> <Button img={RabbitTradePost} alt={`rabbit trade post`} onClick={() => placeTradePost('rabbit')} >place a</Button></>)}
            {(orderedSuit === 'bird' || orderedSuit === 'mouse') && suitToNumPlacedTradePosts['mouse'] < 3 && (<> <Button img={MouseTradePost} alt={`mouse trade post`} onClick={() => placeTradePost('mouse')} >place a</Button></>)} Score the number of victory points revealed for the placed trade post.{orderedSuit !== 'bird' && (<> (<Number value={tradeposts[orderedSuit].findLast(({isPlaced}) => isPlaced)?.points || 0}/>)</>)}</>}
            substeps={
                <>
                <Steps 
                    type="I"
                    steps={[
                        <Step title={<i>Clearing Tie:</i>} description={<i>Target the clearing with pieces of the player with the most warriors in the Payments box.</i>}/>,
                    ]}
                />
                <TradePostsPreview tradeposts={tradeposts} orderedSuit={orderedSuit} />
                </>
            }
        />,
        <Step title="Recruit" description={<>1 warrior in each {orderedSuit === 'bird' ? 'River': <Suit suit={orderedSuit} />} clearing.</>}
            substeps={
                <Steps 
                    type="I"
                    steps={[
                        <Step title={<i>Warrior Limit:</i>} description={<i>If you run out of warriors, place in highest clearing priority first.</i>}/>,
                    ]}
                />
            }
        />,
        <Step
            title="Organize."
            description={
            <>Check the Protectionism conditions now:
            <br/>If the Payments box is empty, activate <img src={Shield} alt="Shield Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} /> Protectionism.
            <br/>If there are no warriors in your supply, activate <img src={Sword} alt="Sword Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} /> Protectionism. <Button onClick={() => updateState({...state, protectionism: 'shield'})} img={Shield} alt="shield protectionism" >Activate</Button> <Button onClick={() => updateState({...state, protectionism: 'sword'})} img={Sword} alt="sword protectionism" >Activate</Button> <Button onClick={() => updateState({...state, protectionism: 'none'})} >None</Button>{protectionism === 'shield' && (<div style={{paddingLeft: '26px'}}><img src={Shield} alt="Shield Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />: Score <Number value={levelToPoints[level]} /> and place 2 warriors into the clearing with your presence and the most enemy pieces.</div>)}</>}
        />,
    ];

    if (protectionism !== 'none') {
        daylightSteps.push(<Step title="Battle" description={<>{protectionism === 'shield' && (<div style={{paddingLeft: '26px'}}><img src={Shield} alt="Shield Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />: in all clearings.</div>)}{protectionism === 'sword' && (<div style={{paddingLeft: '26px'}}><img src={Sword} alt="Sword Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />: in all <Suit suit={orderedSuit} /> clearings.</div>)}{isFerocious ? <div style={{paddingLeft: '26px'}}><b>(Ferocious)</b> You can deal a maximum of 3 Rolled Hits</div>: ''}</>}
        substeps={
            <Steps 
                type="I"
                steps={[
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with least warriors in the Payments box.</i>}/>,
                ]}
            />
        }
    />)
    }

    const eveningSteps = [
        <Step title="Score" description={<><OneVP /> per warrior of the player with the most warriors in your Payments box, and return them. Keep any other warriors.</>}/>,
    ];

    if (protectionism !== 'none') {
        eveningSteps.push(<Step title="Racketeering" description={<div style={{paddingLeft: '26px'}}><img src={protectionism === 'shield' ? Shield : Sword} alt="Shield or Sword Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />: From each clearing move all but 2 Riverfolk warriors to the Payments box.</div>}/>);
    }

    eveningSteps.push(<Step title="Discard" description={<>the left-most card in the Market.{protectionism === 'shield' && (<div style={{paddingLeft: '26px'}}><img src={Shield} alt="Shield Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />: Discard the left-most card again.</div>)}</>} />)

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title="Rivetfolk Company"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor={getFactionColor(faction)}
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (G)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Pieces." description="Form a supply of 15 warriors, 3 fox, rabbit, and mouse trade post tokens near you."/>,
                                        <Step title="Place Warriors." description="Place 1 warrior in each clearing on the river."/>,
                                        <Step title="Gain Starting Payments." description="Place 1 warrior in your Payments box."/>,
                                        <Step title="Stock Market." description="Draw 5 cards and add them to your Market."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction={faction} level={level} labels={{beginner: <>Whenever you <b>Build</b>, place <b>0 warriors</b> in the clearing. Score <b>0 VP</b> when you have Shield Protectionism in effect.</>, expert: <>Whenever you <b>Build</b>, place <b>1 warrior</b> in the clearing. Score <b>1 VP</b> when you have Shield Protectionism in effect.</>, master: <>Whenever you <b>Build</b>, place <b>2 warriors</b> in the clearing. Score <b>2 VP</b> when you have Shield Protectionism in effect.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait} faction={faction} isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Card title='Services'>
                            <Step title='' description='At the start of their Birdsong, other human players may purchase one service plus one per clearing with a trade post and any of their pieces. (Bot players may purchase services at any point during their turn and there is no limit to the number of services they can buy. They do not buy any services if the Riverfolk player has more victory points than they do. Subtract 1 from the price of serviecs for bot players. Unless explicitly stated, bot players do not buy the River Boats service.)' />
                            <Step title='' description="Services are paid for by placing warriors from the supply into your Payments box. Use your own warriors for factions that have no warriors. The cost of services depends on the buyer's score:" />
                            <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem'}}>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>0 to 9: <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>2</b></div></div>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>10 to 19:  <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>3</b></div></div>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>20 and higher:  <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>4</b></div></div>
                            </div>
                            <Step title='Hand Card:' description="The buyer takes a card from the Riverfolk's Market and adds it to their hand." />
                            <Step title='Riverboats:' description="The buyer treats rivers as paths until the end of their turn." />
                            <Step title='Mercenaries:' description='For battle and rule in Daylight and Evening, buyer treats Riverfolk warriors as their own. In battle, they must split Hits between their own pieces and Riverfolk warriors.' />
                        </Card>
                        <Card title='Protectionism'>
                            <div>If either of these conditions are met, they stay in effect until the end of your turn.<br/><br/>If the Payments box is empty, activate all effects marked with <img src={Shield} alt="Shield Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />.<br/>If there are no warriors in your supply, activate all effects marked with <img src={Sword} alt="Sword Protectionism" height={24} width={24} style={{marginBottom: '-0.5rem'}} />.</div>
                        </Card>
                        <TradePosts tradeposts={tradeposts} onUpdateTradePosts={(newTradePosts) => {updateState({...state, tradeposts: newTradePosts})}}/>
                        <Card title="Ordered suit">
                            <Order order={orderedSuit} onChangeOrder={(newOrder) => updateState({...state, orderedSuit:newOrder})}/>
                        </Card>
                        <Card title="Birdsong" headerBackgroundColor="#f6a045" headerColor="white">
                            <Steps
                                type="1"
                                steps={[
                                    <Step title="Stock the Market" description="by adding cards from the deck until there are 5 cards in the Market."/>,
                                    <Step title="Craft" description={<>the first card added that shows an available item for <OneVP /> and then discard it.</>} />,
                                    <Step 
                                        title="Order Card"
                                        description="is the right-most card in the Market"
                                    />
                                ]}
                            />
                            
                        </Card>
                        <Card title="Daylight" headerBackgroundColor="#6db6dc" headerColor="white">
                            <Steps 
                                type="1"
                                steps={daylightSteps}
                            />
                        </Card>
                        <Card title="Evening" headerBackgroundColor='#8a8892' headerColor='white'>
                            <Steps 
                                type="1"
                                steps={eveningSteps}
                            />
                        </Card>
                    </>
                )}
            </div>
        </section>
    );
}