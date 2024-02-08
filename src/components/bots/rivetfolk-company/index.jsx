import Mole from '../../../assets/mole.png'
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import TradePosts from './trade-posts';


export default function RivetfolkCompany({state = {}, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', tradeposts = {}} = state;
    const isBossMode = level === 'boss';
    const levelToRecruit = {
        'beginner': 'zero warriors',
        'expert': 'one warrior',
        'master': 'two warriors',
        'boss': 'two warriors',
    }

    const levelToPoints = {
        'beginner': 0,
        'expert': 1,
        'master': 2,
        'boss': 2,
    }

    const eveningSteps = [
        <Step title="Score" description={<><Number value={1} /> per warrior of the player with the most warriors in your payment, and return them. Keep any other warriors.</>}/>,
        <Step title="Racketeering" description={<>Shield or Sword: From each clearing move all but two Riverfolk warriors to the payments box.</>}/>,
        <Step title="Discard" description="the left-most card in the market." substeps={<Steps type='I' steps={[<Step title={<>Shield:</>} description='Discard the left-most card again.'/>]}/>}/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <Number value={1} /> for every  player (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title="Rivetfolk Company"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#56c3bc"
            />
            <div style={{padding: '16px 8px'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (G)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a supply of 15 warriors."/>,
                                        <Step title="Place Warriors." description="Place 1 warrior in each clearing on the river."/>,
                                        <Step title="Gain Starting Payments." description="Place 1 warrior in your Payments box."/>,
                                        <Step title="Stock Market." description="Draw 5 cards and add them to your Market."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="rivetfolk-company" level={level} labels={{beginner: 'one', expert: 'two', master: 'three'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait} faction={'rivetfolk-company'} isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Card title='Services'>
                            <Step title='' description='At the start of their Birdsong, other human players may purchase one service plus one per clearing with a trade post and any of their pieces. (Bot players may purchase services at any point during their turn and there is no limit to the number of services they can buy. They do not buy any services if the Rivetfolk have more points than they do. Subtract 1 from the price of serviecs for bot players. Unless explicitly stated, bot players do not buy the River Boats service.)' />
                            <Step title='' description="Services are paid for by placing warriors from the supply into your Payments. Use your own warriors for factions that have no warriors. The cost of services depends on the buyer's score:" />
                            <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem'}}>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>0 to 9: <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>2</b></div></div>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>10 to 19:  <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>3</b></div></div>
                                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>20 and higher:  <div style={{borderRadius: '50%', border: '4px solid black', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginLeft: '1rem'}}><b>4</b></div></div>
                            </div>
                            <Step title='Hand Card:' description="The buyer takes a card from the Riverfolk's market and adds it to their hand." />
                            <Step title='Riverboats:' description="The buyer treats rivers as paths until the end of their turn." />
                            <Step title='Mercenaries:' description='For battle and rule in Daylight and Evening, buyer treats Riverfolk warriors as their own. In battle, they must split Hits between their own pieces and Riverfolk warriors.' />
                        </Card>
                        <Card title='Protectionism'>
                            <div>If either of these conditions are met, they stay in effect until the end of your turn.<br/> If Payments is empty, activate all effects marked with Shield.<br/>If there are no warriors in your supply activate all effects marked with Sword.</div>
                        </Card>
                        <TradePosts tradeposts={tradeposts} onUpdateTradePosts={(newTradePosts) => {updateState({...state, tradeposts: newTradePosts})}}/>
                        <Card title="Ordered suit">
                            <Order order={orderedSuit} onChangeOrder={(newOrder) => updateState({...state, orderedSuit:newOrder})}/>
                        </Card>
                        <Card title="Birdsong" headerBackgroundColor="#f6a045" headerColor="white">
                            <Steps
                                type="1"
                                steps={[
                                    <Step title="Stock the market" description="by adding cards from the deck until there are 5 cards in the market."/>,
                                    <Step title="Craft" description={<>the first card added that shows an available item for <Number value={1}/> and then discard it.</>} />,
                                    <Step 
                                        title="Order Card"
                                        description="is the right-most card in the market"
                                    />
                                ]}
                            />
                            
                        </Card>
                        <Card title="Daylight" headerBackgroundColor="#6db6dc" headerColor="white">
                            <Steps 
                                type="1"
                                steps={[
                                   
                                    <Step 
                                        title="Build"
                                        description={<>a trade post in a <Suit suit={orderedSuit} /> clearing without one. Place {levelToRecruit[level]} into the same clearing.</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                    <Step title={<i>Clearing Tie:</i>} description={<i>Clearing with pieces of the player with the most warriors in Payments.</i>}/>,
                                                ]}
                                            />
                                        }
                                    />,
                                    <Step title="Recruit" description={<>one warrior in each {orderedSuit === 'bird' ? 'River': <Suit suit={orderedSuit} />} clearing.</>}
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
                                        title="Organise."
                                        description={<>Check conditions in Protectionism box now.<br/>Shield: Score <Number value={levelToPoints[level]} /> and place two warriors into such a clearing with your presence and most enemy pieces.</>}
                                    />,
                                    <Step title="Battle" description={<><br/>Shield: in all clearings, then skip to Evening.<br/>Sword: in all <Suit suit={orderedSuit} /> clearings.</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with least warriors in payments.</i>}/>,
                                                ]}
                                            />
                                        }
                                    />
                                ]}
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