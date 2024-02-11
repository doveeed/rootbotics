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
import Ministers, {ministerNameActionMapping} from './ministers';
import Buildings from './buildings';
import OneVP from '../../one-vp';


export default function DummyDuchy({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], ministers, buildings, level = 'expert', isHumanRiverfolk = false} = state;
    const isBossMode = level === 'boss';
    const isOverwhelm = traits.find(({id}) => id === 'overwhelm').isEnabled;
    const isInvaders = traits.find(({id}) => id === 'invaders').isEnabled;
    const lowestOrderedUnswayed = ministers.find(({suit, isSwayed}) => (orderedSuit === 'bird' || suit === orderedSuit) && !isSwayed);
    const highestUnswayed = ministers.slice().reverse().find(({isSwayed}) => !isSwayed);
    const isCaptainSwayed = ministers.some(({name, isSwayed}) => name === 'Captain' && isSwayed);
    const isForemoleSwayed = ministers.some(({name, isSwayed}) => name === 'Foremole' && isSwayed);
    const swayedActionMinisters = ministers.filter(({isSwayed, name}) => isSwayed && name !== 'Captain' && name !== 'Foremole');
    const levelToRecruit = {
        beginner: 1,
        expert: 2,
        master: 3,
        boss: 3
    }
    const totalRecruit = buildings.filter(({type})=> type === 'citadel').reduce((total, {isPlaced, recruit}) => {
        if (isPlaced) {
            return total + recruit;
        }
        return total;
    }, levelToRecruit[level] + (isForemoleSwayed ? 1 : 0))
    const numPlacedMarkets = buildings.filter(({type, isPlaced}) => type === 'market' && isPlaced).length;
    const numPlacedCitadels = buildings.filter(({type, isPlaced}) => type === 'citadel' && isPlaced).length;
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Reveal" description={<>the top card of the deck as order card.</>} />,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? ' If the Riverfolk player has fewer points than you do and the order card has no craftable item, buy a craftable item from the Riverfolk, if available, and replace the order card. If multiple cards exist, pick the one with the most victory points for the item. If multiple, choose randomly.':''}</>} />,
        <Step 
            title="Recruit"
            description={<>{totalRecruit} {totalRecruit === 1 ? 'warrior':  'warriors'}, in the Burrow.</>}
        />
    ];

    if (canBuyServices) {
        birdsongSteps.unshift(<Step description={<>If the Riverfolk player has fewer points than you do and there is an "Ambush" card in the Riverfolk Market, immediately buy it and place it in front of you.</>} />)
    };

    const eveningSteps = [
        <Step 
            title="Rally."
            description={<>In each <Suit suit={orderedSuit} /> clearing without a Citadel or Market and less than 3 Duchy warriors, move your warriors into an adjacent clearing with a Citadel or a Market. If there is no such clearing, instead place the warriors into the Burrow. Then in each clearing you rule with more than 4 Duchy warriors, place all but four of your Warriors from that clearing into the burrow.</>}
            substeps={<Steps type='I' steps={[<Step title={<i><b>Target Clearing Tie:</b></i>} description={<><i>Such a clearing with the least of your warriors.</i></>}/>]}/>}    
        />,
        <Step title="Score" description={<><OneVP /> per market on the map. (<Number value={numPlacedMarkets} />)</>}/>,
    ];

    if (lowestOrderedUnswayed || highestUnswayed) {
       eveningSteps.push(<Step 
        title="Sway"
        description={<>the {lowestOrderedUnswayed ? lowestOrderedUnswayed.name: highestUnswayed.name }</>}
    />);
    }

    eveningSteps.push(<Step title="Discard" description="the order card."/>)

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two players (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title="Dummy Duchy"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#e5bc9d"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (H)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Pieces." description="Form supplies of 20 warriors, 3 tunnel tokens, and 9 crowns."/>,
                                        <Step title="Prepare the Burrow." description="Place the Burrow near the map."/>,
                                        <Step title="Surface." description="Place 2 warriors and 1 tunnel in a corner clearing that is not the starting corner clearing of another bot and, if possible, is diagonally opposite from a starting corner clearing. Then place 2 warriros in each clearing adjacent to the chosen corner clearing, exept the Burrow."/>,
                                        <Step title="Sway Starting Ministers." description="Draw 2 cards and discard them. For each, place a crown oon the topmost maching unswayed minister on your faction board."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="dummy-duchy" level={level} labels={{beginner: 'one', expert: 'two', master: 'three'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="dummy-duchy-human-riverfolk"><input id="dummy-duchy-human-riverfolk" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> Check this box if there is a human Riverfolk player in the game.</label>
                        </Card>)}
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait} faction={'dummy-duchy'} isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Card title="Buildings">
                            <Buildings buildings={buildings} onUpdateBuildings={(newBuildings) => updateState({...state, buildings: newBuildings})}/>
                        </Card>
                        <Card title="Minister Track">
                            <Ministers ministers={ministers} onUpdateMinisters={(newMinisters) => updateState({...state, ministers: newMinisters})} />
                        </Card>
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
                            <Steps 
                                type="1"
                                steps={[
                                    <Step
                                        title="Dig."
                                        description={<>If there are {isOverwhelm ? '3': '4'} or more warriors in the burrow:<br/>Place a tunnel and move {isOverwhelm ? 3: 4} warriors from your burrow into such a <Suit suit={orderedSuit} /> clearing with no tunnel and none of your buildings.{isOverwhelm ? ' Repeat once.': ''}</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                <Step title={<i>Clearing Tie:</i>} description={<i>{isInvaders ? 'Such a clearing with the most enemy buildings, but least enemy warriors.' : orderedSuit === 'bird' ? 'Such a clearing with the most enemy buildings and tokens.': 'Such a clearing with the most empty building slots, then fewest enemy warriors.'}</i>}/>,
                                                <Step title={<i>No tunnel:</i>} description={<i>Move the tunnel in the clearing with the least Duchy warriors to the target clearing.</i>}/>
                                            ]}
                                            />
                                        }
                                    />,
                                    <Step 
                                        title="Battle"
                                        description={<>in each each <Suit suit={orderedSuit} /> clearing.{isCaptainSwayed ? <><br/><b>Captian:</b> deal an extra hit in clearings with a tunnel.</>: ''}{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you have two or fewer warriors in a clearing, and at least one Riverfolk warrior is present there, then buy Mercenaries.': ''}</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings, then most pieces, then with the most points there.</i>}/>,
                                                ]}
                                            />
                                        }
                                    />,
                                    <Step title="Build" description={<>in such a clearing that you rule with most Duchy warriors.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you did not build,  and buying Mercenaries would allow you to rule and build, then buy Mercenaries and build.': ''} Place a Citadel if you have more than 8 warriors in your supply, otherwise place a Market. Score <OneVP /> if you can't place a building while there are still buildings on this board.</>} />,
                                    <Step
                                        title="Ministers."
                                        description={<>Take the actions of all Swayed Ministers from top to bottom. <i>(Captain and Foremole are always active and have no action)</i></>}
                                        substeps={
                                            swayedActionMinisters.length > 0 && <Steps type='I'
                                                steps={swayedActionMinisters.length > 0 && swayedActionMinisters.map(({name}) => (<Step title={`${name}:`} description={<>{ministerNameActionMapping[name]}{name === 'Baron of Dirt' ? <> <Number value={numPlacedMarkets} /></>: name ==='Earl of Stone' ? <> <Number value={numPlacedCitadels} /></>: ''}</>}/>))}
                                            />
                                        }
                                    />,
                                    
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