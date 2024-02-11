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
import OneVP from "../../one-vp";

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


    const pointsToScore = orderedSuit === 'bird' ? buildings[birdBuild].findLast(({isPlaced}) => isPlaced)?.points || 0: buildings[suitToBuilding[orderedSuit]].findLast(({isPlaced}) => isPlaced)?.points || 0;
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
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? ' If the Riverfolk player has fewer points than you do and the order card has no craftable item, buy a craftable item from the Riverfolk, if available, and replace the order card. If multiple cards exist, pick a Bird card, then pick the one with the most victory points for the item. If multiple, choose randomly. If theer are no craftable items available and the order card is not Bird, buy any available Bird card. If there are multiple, choose randomly.':''}</>} />,
    ]

    const daylightSteps = orderedSuit === 'bird' ? [
        <Step title="Battle" description={<>in all clearings.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you have two or fewer warriors in a clearing, and at least one Riverfolk warrior is present there, then buy Mercenaries.': ''}</>}
        substeps={<Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]

        }/>}/>,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among the two lowest priority clearings you rule. If you rule only one clearing, place all warriors there. Score <OneVP /> for every two warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {birdBuild} in the clearing you rule with the most Marquise warriors.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you did not build, and buying Mercenaries would allow you to rule and build, then buy Mercenaries and build.': ''}</>} />,
        <Step title="Move" description={<>all but 3 of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action. After completing all moves, also <b>Battle</b> in all clearings you moved into.</>}/>,
    ]: [
        <Step title="Battle" description={<>in each <Suit suit={orderedSuit} /> clearing.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you have two or fewer warriors in a clearing, and at least one Riverfolk warrior is present there, then buy Mercenaries.': ''}</>}
        substeps={
        <Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]}/>} />,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among ordered clearings you rule. Score <OneVP /> for every two warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {suitToBuilding[orderedSuit]} in the clearing you rule with the most Marquise warriors.{canBuyServices ? ' If the Riverfolk player has fewer points than you do, you did not build, and buying Mercenaries would allow you to rule and build, then buy Mercenaries and build.': ''}</>} />,
        <Step title="Move" description={<>all but 3 of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action.</>}/>,
        
    ];

    const eveningSteps = [
        <Step title="Expand." description={<>If you did not place a building this turn and would <b>Score</b> less than 3 victory points. Discard and draw a new order card, then repeat Daylight. You may only <b>Expand</b> {isIronWill ? 'twice': 'once'} per turn.</>}/>,
        <Step title="Score" description={<>victory points of rightmost empty space on the {orderedSuit === 'bird' ? birdBuild: suitToBuilding[orderedSuit]} Buildings track. (<Number value={pointsToScore} />)</>} />,
        <Step title="Discard" description="the order card."/>,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two players (rounded up).</>} />)
    }
    

    return (
        <section>
            <Header
                title="DC M. Marquise 2.0"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#e27b38"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (A)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a supply of 25 warriors."/>,
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