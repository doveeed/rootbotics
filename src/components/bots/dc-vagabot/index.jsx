
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Level from '../../level';
import Trait from '../../trait';
import OneVP from "../../one-vp";
import { CONSTANTS } from "../../../utils";
import HumanRiverfolk from "../../human-riverfolk";
import Items from "./items";
import VP2 from '../../../assets/vp2.png';

const characters = {
    thief: {id: 'thief', name: 'Thief', special:  <>Take a random card from the enemy in your clearing with the most victory points. On a tie, take it from such an enemy with the most pieces there.</>},
    tinker: {id: 'tinker', name: 'Tinker', special:  <>Search the discard pile for the topmost card with an available item and craft it. <i>(Do not score a point)</i></>},
    ranger: {id: 'ranger', name: 'Ranger', special:  <>If you have three or more damaged items, slip into a random adjacent forest.</>},
    vagrant: {id: 'vagrant', name: 'Vagrant', special:  <>Initiate a battle in your clearing. You choose the attacker and then the defender <i>(using setup priority)</i>, and you remove pieces for each.</>},
    scoundrel: {id: 'scoundrel', name: 'Scoundrel', special:  <>If your clearing has 3 or more enemy pieces, including 1 building or token, remove all enemy pieces there. Place any one of your items in your clearing, covering a building slot. Buildings cannot be placed in this slot. Score <OneVP />.</>},
    arbiter: {id: 'Arbiter', name: 'Arbiter', special:  <>Before rolling in battle, the defender may enlist the Arbiter if he is in the battle clearing. (If other bots are in play, they will interact with the Arbiter, whether played by a human or bot, in the same way.)
    The Arbiter scores one victory point and adds the number of items on his Battle Track to the defender's maximum rolled hits. Defending bots will enlist the Arbiter if they meet all three of the following conditions:
    I One. Their maximum rolled hits is lessthan three.
    II Two. Their maximum rolled hits is less than the number of enemy pieces in the battle.
    III Three. They have more victory points than the Arbiter.</>}
}
export default function DCVagabot({ state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', items = [], character = 'thief', isHumanRiverfolk = false} = state;
    const suitToSteps= {
        fox: ['explore', 'special', 'battle'],
        rabbit: ['special', 'aid', 'battle'],
        mouse: ['quest', 'aid', 'battle'],
        bird: ['explore', 'quest', 'battle']
    }

    const steps = {
        aid: <Step title="Aid." description={<>Move to the nearest clearing containing pieces of a player with any items if possible. Then exhaust one item to take one of their items and place it in your satchel. Score <OneVP/> and then they draw one card.</>} substeps={<Steps type="I" steps={[<Step title={<i>Player tie:</i>} description={<i>If multiple players with items have pieces in equal distance, select the player with the lower score.</i>}/>]}/>}/>,
        battle: <Step title="Battle." description={<>Move to the nearest clearing with any peices of the enemy with the most points, then exhaust one item to battle that player. Score <OneVP/> per enemy warrior removed. Repeat this action, exhausting two items per extra battle, as many times as possible.</>} substeps={<Steps type="I" steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Move to the clearing where the target player has the most tokens and buildings, then fewest warriors.</i>} />]} />}/>,
        explore: <Step title="Explore." description="Move to the nearest ruin, then exhoust one item to take an item from it."/>,
        quest: <Step title="Quest." description={<>Move to the nearest clearing matching your quest. Then exhaust any two items to discard your quest and score  <img src={VP2} alt="two victory points" width={24} style={{marginBottom: '-4px'}}/>. Then, replace the quest.</>} />,
        special: <Step title="Special." description={<>Exhaust one item to take the following action: {characters[character].special} Skip this action if it would have no effect.</>} />,
    }

    const isBossMode = level === 'boss';
    // const isIronWill = traits.some(({id, isEnabled}) => id === 'iron-will' && isEnabled);
    // const isBlitz = traits.some(({id, isEnabled}) => id === 'blitz' && isEnabled);
    const levelToRefresh = {
        'beginner': '3',
        'expert': '4',
        'master': '5',
        'boss': '5',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP/> if it shows an available item.{canBuyServices ? CONSTANTS.riverfolkHandCardText:''}</>} />,
        <Step title="Slip." description="If you have two or fewer undamaged items, move to a random adjacent forest, then go to Evening." />,
    ]

    
    const daylightSteps = suitToSteps[orderedSuit].map(step => steps[step]);
    

    const eveningSteps = [
        <Step title="Refresh" description={<>{levelToRefresh[level]} items. If you have no damaged items, refresh 2 more.</>} />,
        <Step title="Repair." description="If you are in a forest, repair all items. If not, repair one item. Repair unexhausted items before exhausted items." />,
        <Step title="Discard" description="the order card."/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
    }
    

    return (
        <section>
            <Header
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (A)">
                            <Steps
                                steps={
                                    [
                                        <Step title="" description=""/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level  level={level} labels={{'beginner': <>Whenever you <b>Recruit</b>, place <b>3 warriors</b>.</>, 'expert': <>Whenever you <b>Recruit</b>, place <b>4 warriors</b>.</>, 'master': <>Whenever you <b>Recruit</b>, place <b>5 warriors</b>.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<HumanRiverfolk  onChange={(newIsHumanRiverfolk) => updateState({...state, isHumanRiverfolk: newIsHumanRiverfolk})}/>)}
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait}  isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Items items={items} onUpdateItems={(newItems) => updateState({...state, items: newItems})} />
                        <Card title="Ordered suit">
                            <Order order={orderedSuit} onChangeOrder={(newOrder) => updateState({...state, orderedSuit:newOrder})}/>
                        </Card>
                        <Card title="Birdsong" headerBackgroundColor="#f6a045" headerColor="white">
                            <Steps
                                type="1"
                                steps={birdsongSteps}
                            />
                            
                        </Card>
                        <Items items={items} onUpdateItems={(newItems) => updateState({...state, items: newItems})} />
                        <Card title="Daylight" headerBackgroundColor="#6db6dc" headerColor="white">
                            <div style={{marginBottom: '1rem'}}>Take the following ordered actions. when ordered to move, exhaust one item per move.</div>
                            <Step description="" />
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