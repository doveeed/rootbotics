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
import { CONSTANTS } from "../../../utils";

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
    const isIronWill = traits.some(({id, isEnabled}) => id === 'iron-will' && isEnabled);
    const isBlitz = traits.some(({id, isEnabled}) => id === 'blitz' && isEnabled);
    const levelToRecruit = {
        'beginner': '3',
        'expert': '4',
        'master': '5',
        'boss': '5',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player has fewer victory points than you do and the order card has no craftable item, buy a card with an available craftable item from the Riverfolk Market and replace the order card. If multiple cards exist, pick a Bird card, then pick the one with the most VP for the item. If multiple, choose randomly.{orderedSuit !== 'bird' ? ' If there are no craftable items available, buy any available Bird card. If there are multiple, choose randomly.': ''}</div>:''}</>} />,
    ]

    const daylightSteps = orderedSuit === 'bird' ? [
        <Step title="Battle" description={<>in all clearings.{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}</>}
        substeps={<Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]

        }/>}/>,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among the two lowest priority clearings you rule. If you rule only one clearing, place all warriors there. Score <OneVP /> for every 2 warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {birdBuild} in the clearing you rule with the most Marquise warriors.{canBuyServices ? CONSTANTS.riverfolkMercenariesBuildText: ''}</>} />,
        <Step title="Move" description={<>all but 3 of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action. After completing all moves, also <b>Battle</b> in all clearings you moved into.</>}/>,
    ]: [
        <Step title="Battle" description={<>in each <Suit suit={orderedSuit} /> clearing.{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}</>}
        substeps={
        <Steps type="I" steps={
            [
                <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most points there.</i>}/>
            ]}/>} />,
        <Step title="Recruit" description={<>{levelToRecruit[level]} warriors evenly among ordered clearings you rule. Score <OneVP /> for every two warriors that could not be recruited.</>}/>,
        <Step title="Build" description={<>a {suitToBuilding[orderedSuit]} in the clearing you rule with the most Marquise warriors.{canBuyServices ? CONSTANTS.riverfolkMercenariesBuildText: ''}</>} />,
        <Step title="Move" description={<>all but 3 of your warriors from each <Suit suit={orderedSuit} /> clearing to the adjacent clearing with the most enemy pieces. Each warrior may only move once during this action.</>}/>,
    ];
    
    if (isBlitz) {
        daylightSteps.push(<Step title="(Blitz)" description="Select the highest priority clearing you rule with out any enemy pieces. Move all but 1 warirer from the clearing and battle in the destination if oponents are present."
        substeps={<Steps type="I" steps={[
            <Step title={<i>Destination Tie:</i>} description={<i>Move to such a clearing with the most enemy pieces there.</i>}/>,
            <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most pieces there, then with most victory points there.</i>}/>
        ]} />}
        />)
    }

    const eveningSteps = [
        <Step title="Expand." description={<>If you did not place a building this turn and would <b>Score</b> less than 3 victory points. Discard and draw a new order card, then repeat Daylight.{ isIronWill ? <div style={{paddingLeft: '26px'}}><b>(Iron Will) </b>You may only <b>Expand</b> twice per turn.</div> : <> You may only <b>Expand</b> once per turn.</>}</>}/>,
        <Step title="Score" description={<>victory points of right-most empty space on the {orderedSuit === 'bird' ? birdBuild: suitToBuilding[orderedSuit]} Buildings Track. (<Number value={pointsToScore} />)</>} />,
        <Step title="Discard" description="the order card."/>,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
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
                                        <Step title="Gather Pieces." description="Form a supply of 25 warriors, 6 sawmills, 6 workshops, and 6 recruiters near you."/>,
                                        <Step title="Place Keep." description="Place the keep token in a random corner clearing."/>,
                                        <Step title="Garrison." description="Place a warrior in each clearing except the clearing in the diagonally opposite corner from the clearing with the keep tken. Place an extra warrior in the clearing with the keep token."/>,
                                        <Step title="Place Starting Buildings." description="Randomly place 1 sawmill, 1 workshop, and 1 recruiter among the clearings adjacent to the clearing with the keep token, placing only one building per clearing."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="dc-mechanical-marquise-2point0" level={level} labels={{'beginner': <>Whenever you <b>Recruit</b>, place <b>3 warriors</b>.</>, 'expert': <>Whenever you <b>Recruit</b>, place <b>4 warriors</b>.</>, 'master': <>Whenever you <b>Recruit</b>, place <b>5 warriors</b>.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
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