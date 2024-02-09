import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import Buildings from "./buildings";

export default function DCMechanicalMarquise2point0({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', buildings = {}, isHumanRiverfolk = false} = state;
    const {sawmill = [], workshop = [], recruiter = []} = buildings;
    const numBuiltSawmills = sawmill.filter(({isPlaced}) => isPlaced).length;
    const numBuiltWorkshops = workshop.filter(({isPlaced}) => isPlaced).length;
    const numBuiltRecruiters = recruiter.filter(({isPlaced}) => isPlaced).length;
    const birdBuild = numBuiltSawmills >= numBuiltWorkshops && numBuiltSawmills >= numBuiltRecruiters
        ? 'sawmill'
        : numBuiltWorkshops > numBuiltSawmills && numBuiltWorkshops >= numBuiltRecruiters
        ? 'workshop'
        : 'recruiter';
    const suitToBuilding= {
        fox: 'sawmill',
        rabbit: 'workshop',
        mouse: 'recruiter',
    }
    const pointsToScore = orderedSuit === 'bird' ? 1: buildings[suitToBuilding[orderedSuit]].findLast(({isPlaced}) => isPlaced).points
    const isBossMode = level === 'boss';
    const isIronWill = traits.find(({id}) => id === 'iron-will').isEnabled;
    const levelToRecruit = {
        'beginner': 'three',
        'expert': 'four',
        'master': 'five',
        'boss': 'five',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <Number value={1}/> if it shows an available item.{canBuyServices ? ' If the Riverfolk player has fewer points than you do and the order card has no craftable item, buy a craftable item from the Riverfolk, if available, and replace the order card. If multiple cards exist, pick a Bird card, then pick the one with the most VP for the item. If multiple, choose randomly. If theer are no craftable items available and the order card is not Bird, buy any available Bird card. If there are multiple, choose randomly.':''}</>} />,
    ]

    const daylightSteps = orderedSuit === 'bird' ? [
        <Step title="Battle" description={<>in all clearings.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you have two or fewer warriors in a clearing, and at least one Riverfolk warrior is present there, then buy Mercenaries.': ''}</>}
        substeps={<Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]

        }/>}/>,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among the two lowest priority clearings you rule. If you rule only one clearing, place all warriors there. Score <Number value={1}/> for every two warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {birdBuild} of the type with the most pieces on the map in the clearing you rule with the most Marquise warriors. When tied, place a sawmill, then a workshop.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you did not build, and buying Mercenaries would allow you to rule and build, then buy Mercenaries and build.': ''}</>} />,
        <Step title="Move" description={<>all but three of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action. After completing all moves, also <b>Battle</b> in all clearings you moved into.</>}/>,
    ]: [
        <Step title="Battle" description={<>in each <Suit suit={orderedSuit} /> clearing.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you have two or fewer warriors in a clearing, and at least one Riverfolk warrior is present there, then buy Mercenaries.': ''}</>}
        substeps={
        <Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]}/>} />,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among ordered clearings you rule. Score <Number value={1}/> for every two warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {suitToBuilding[orderedSuit]} in the clearing you rule with the most Marquise warriors.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you did not build, and buying Mercenaries would allow you to rule and build, then buy Mercenaries and build.': ''}</>} />,
        <Step title="Move" description={<>all but three of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action.</>}/>,
        
    ];

    const eveningSteps = [
        <Step title="Expand." description={<>If you did not place a building this turn and would <b>Score</b> less than three victory points. Discard and draw a new order card, then repeat Daylight. You may only <b>Expand</b> {isIronWill ? 'twice': 'once'} per turn.</>}/>,
        <Step title="Score" description={<><Number value={pointsToScore} /> victory points of rightmost empty space on the <Suit suit={orderedSuit} /> Buildings track.</>} />,
        <Step title="Discard" description="the order card."/>,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <Number value={1} /> for every player (rounded up).</>} />)
    }
    

    return (
        <section>
            <Header
                title="DC Mechanical Marquise 2.0"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="orange"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (A)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a supply of 25 warriors."/>,
                                        <Step title="Place Warriors." description="Place 4 warriors and 1 garden of matching printed suit in a random corner clearing that is not the starting corner clearing of another bot and, if possible, is diagonally opposite from a starting corner clearing. Then place 1 warrior in each adjacent clearing."/>,
                                        <Step title="Draw Lost Souls." description="Draw 3 cards and place them face up in your lost souls in the order drawn."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="dc-mechanical-marquise-2point0" level={level} labels={{'beginner': 'three', 'expert': 'four', 'master': 'five'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="dc-mechanical-marquise-2point0"><input id="dc-mechanical-marquise-2point0" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> Check this box if there is a human Riverfolk player in the game.</label>
                        </Card>)}
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait} faction={'cogwheel-cult'} isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Card title="Ordered suit">
                            <Order order={orderedSuit} onChangeOrder={(newOrder) => updateState({...state, orderedSuit:newOrder})}/>
                        </Card>
                        <Buildings buildings={buildings} onUpdateBuildings={(newBuildings) => {updateState({...state, buildings: newBuildings})}}/>
                        <Card title="Birdsong" headerBackgroundColor="#f6a045" headerColor="white">
                            <Steps
                                type="1"
                                steps={birdsongSteps}
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