
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
import Items, { ItemsPreview, isBattleTrack } from "./items";
import VP2 from '../../../assets/vp2.png';
import Characters from "./characters";

const characters = {
    thief: {id: 'thief', name: 'Thief', special:  <>Take a random card from the enemy in your clearing with the most victory points. On a tie, take it from such an enemy with the most pieces there.</>},
    tinker: {id: 'tinker', name: 'Tinker', special:  <>Search the discard pile for the topmost card with an available item and craft it, gaining no points.</>},
    ranger: {id: 'ranger', name: 'Ranger', special:  <>If you have any damaged items, repair 1 damaged item, unexhausted before exhausted.</>},
    vagrant: {id: 'vagrant', name: 'Vagrant', special:  <>Initiate a battle in your clearing. Select the player with the most pieces as Attacker, and the player with the second-most pieces as Defender. Only select yourself if there are no other options, and always as Attacker. When removing pieces, prioritise buildings over tokens (choose randomly between multiple types of buildings or tokens).</>},
    scoundrel: {id: 'scoundrel', name: 'Scoundrel', special:  <>If your clearing has 3 or more enemy pieces, including 1 building or token, remove all enemy pieces there. Place any one of your items in your clearing, covering a building slot. Buildings cannot be placed in this slot. Score <OneVP />.</>},
    arbiter: {id: 'arbiter', name: 'Arbiter', special:  <>Before rolling in battle, the defender may enlist the Arbiter if the pawn is in the battle clearing. <i>(If other bots are in play, they will interact with the Arbiter, whether played by a human or bot, in the same way.)</i> The Arbiter scores one victory point and adds the number of items on his Battle Track to the defender's maximum rolled hits. Defending bots will enlist the Arbiter if they meet all three of the following conditions:
    <br/><br/>I. Their maximum rolled hits is less than three.
    <br/>II. Their maximum rolled hits is less than the number of enemy pieces in the battle.
    <br/>III. They have more victory points than the Arbiter.</>}
}
export default function DCVagabot({ state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', items = [], character = 'thief', isHumanRiverfolk = false} = state;
    const suitToSteps= {
        fox: ['explore', 'special', 'battle'],
        rabbit: ['special', 'aid', 'battle'],
        mouse: ['quest', 'aid', 'battle'],
        bird: ['explore', 'quest', 'battle']
    }

    const totalDamagedItems = items.filter(({isDamaged}, index) => !isBattleTrack(index) && isDamaged).length;
    const totalUndamagedItems = items.filter(({isDamaged}, index) => !(isBattleTrack(index) || isDamaged)).length;

    const maxHits = items.length >= 12 ? <>3, <b>deal an extra hit</b></> : items.length >= 9 ? 3 : items.length >= 6 ? 2 : 1;
    const isBossMode = level === 'boss';
    const isAdventurer = traits.some(({id, isEnabled}) => id === 'adventurer' && isEnabled);
    const isBerserker = traits.some(({id, isEnabled}) => id === 'berserker' && isEnabled);
    const isHelper = traits.some(({id, isEnabled}) => id === 'helper' && isEnabled);
    const isMarksman = traits.some(({id, isEnabled}) => id === 'marksman' && isEnabled);
    const levelToRefresh = {
        'beginner': 3,
        'expert': 4,
        'master': 5,
        'boss': 5,
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const steps = {
        aid: <Step title="Aid." description={<>Move to the nearest clearing containing pieces of a player with any items in their Crafted Items box if possible. Then exhaust 1 item to take 1 of their items and place it in your satchel. Score <OneVP/> and then they draw 1 card.{isHelper && (<div style={{paddingLeft: '26px'}}><b>(Helper)</b> If there are no players with available items in their Crafted Items box, move to the nearest clearing containing pieces of the player with the lowest score. Exhaust 1 item to score <OneVP/> and then the aided player draws 1 card.</div>)}</>} substeps={<Steps type="I" steps={[<Step title={<i>Player tie:</i>} description={<i>If multiple players with items have pieces in equal distance, select the player with the lower score.</i>}/>]}/>}/>,
        battle: <Step title={`Battle.${isBerserker && ' (Berserker)'}`} description={<>Move to the nearest clearing with {isBerserker ? 'the most pieces' : 'any peices of the enemy with the most points'}, then exhaust 1 item to battle {isBerserker ? 'the player with the most pieces there' : 'that player'}. Your maximum Rolled Hits is {maxHits}. Score <OneVP/> per enemy warrior removed.{!isAdventurer && <> Repeat this action, exhausting 2 items per extra battle, as many times as possible.</>}{isMarksman && (<div style={{paddingLeft: '26px'}}><b>(Marksman)</b> Deal 1 immediate Hit to the Defender <i>(scoring a point if a warrior is removed)</i> before the dice are rolled.</div>)}{isAdventurer && (<div style={{paddingLeft: '26px'}}><b>(Adventurer)</b> Do not repeat this action.</div>)}</>} substeps={isBerserker ? undefined : <Steps type="I" steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Move to the clearing where the target player has the most tokens and buildings, then fewest warriors.</i>} />]} />}/>,
        explore: <Step title="Explore." description="Move to the nearest ruin, then exhoust 1 item to take an item from it."/>,
        quest: <Step title="Quest." description={<>Move to the nearest clearing matching your quest. Then exhaust any 2 items to discard your quest and score  <img src={VP2} alt="two victory points" width={24} style={{marginBottom: '-4px'}}/>. Then, replace the quest.</>} />,
        special: <Step title="Special." description={<>Exhaust 1 item to take the following action: {characters[character].special} Skip this action if it would have no effect.</>} />,
    }

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP/> if it shows an available item.{canBuyServices ? CONSTANTS.riverfolkHandCardText:''}</>} />,
    ]

    if (totalUndamagedItems <= 2) {
        birdsongSteps.push(
            <Step title="Slip." description="Move to a random adjacent forest, then go to Evening." />);
    }

    
    const daylightSteps = suitToSteps[orderedSuit].filter((step) => !(character === 'arbiter' && step === 'special')).map(step => steps[step]);
    
    if (isAdventurer) {
        daylightSteps.push(<Step title="(Adventurer)" description={<>Move to the nearest clearing matching your quest. Then exhaust any 2 items to discard your quest and score  <img src={VP2} alt="two victory points" width={24} style={{marginBottom: '-4px'}}/>. Then, replace the quest. Repeat this action as many times as possible</>}/>)
    }

    const eveningSteps = [
        <Step title="Refresh" description={<>up to {levelToRefresh[level] + (totalDamagedItems === 0 ? 2: 0)} items.{isBerserker && (<div style={{paddingLeft: '26px'}}><b>(Berserker)</b> Refresh 1 additional item.</div>)}</>} />,
        <Step title="Repair." description={<>If you are in a forest, repair all items. If not, repair 1 item. Repair unexhausted items before exhausted items.</>} />,
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
                        <Card title="Setup (D)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Choose Character." description="Pick a character from the options below."/>,
                                        <Step title="Place Pawn." description="Place your Vagabot pawn in the forest adjacent to the most clearings. If there are multiple such forests, decide randomly among those."/>,
                                        <Step title="Get Quests." description="Shuffle the quest deck, draw 1 quest card, and place it face up near you. This quest can only be completed by the bot."/>,
                                        <Step title="Populate Ruins." description='Take the 4 items marked "R" and place 1 randomly under each ruin.' />,
                                    ]
                                }
                            />
                        </Card >
                        <Characters characters={characters} selectedCharacter={character} onChangeCharacter={(updates) => updateState({...state, ...updates})}/>
                        <Level  level={level} labels={{'beginner': <>Refresh <b>3 items</b> in Evening.</>, 'expert':  <>Refresh <b>4 items</b> in Evening.</>, 'master':  <>Refresh <b>5 items</b> in Evening.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<HumanRiverfolk isHumanRiverfolk={isHumanRiverfolk} onChange={(newIsHumanRiverfolk) => updateState({...state, isHumanRiverfolk: newIsHumanRiverfolk})}/>)}
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
                        <Card title={characters[character].name} >
                            <Step title="Special:" description={characters[character].special} />
                        </Card>
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
                        <Card title="Daylight" headerBackgroundColor="#6db6dc" headerColor="white">
                        <ItemsPreview items={items} />
                            <div style={{marginBottom: '1rem'}}>Take the following ordered actions. when ordered to move, exhaust 1 item per move.</div>
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