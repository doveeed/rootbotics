
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import Buildings from "./buildings";
import Decree from "./decree";
import OneVP from "../../one-vp";
import { CONSTANTS } from "../../../utils";

export default function DCElectricEyrie({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, traits = [], level = 'expert', buildings = [], isHumanRiverfolk = false, decree = {}} = state;
    const {fox, mouse, rabbit, bird} = decree;
    const isBossMode = level === 'boss';
    const isWarTax = traits.some(({id, isEnabled}) => id === 'war-tax' && isEnabled);
    const isNobility = traits.some(({id, isEnabled}) => id === 'nobility' && isEnabled);
    const isSwoop = traits.some(({id, isEnabled}) => id === 'swoop' && isEnabled);
    const isRelentless = traits.some(({id, isEnabled}) => id === 'relentless' && isEnabled);
    const levelToModifier = {
        'beginner': -1,
        'expert': 0,
        'master': 1,
        'boss': 1,
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;
    const pointsToScore = buildings.findLast(({isPlaced}) => isPlaced)?.points || 0;

    const isBuyDecreeCard = (fox === 0 || mouse === 0 || rabbit === 0);

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? <>{isBuyDecreeCard ? <div style={{paddingLeft: '26px'}}><b>(Riverfolk) </b>If the Riverfolk player has fewer points than you do, there is a {fox === 0 ? <><Suit suit='fox' /> </>:''}{mouse === 0 ? <><Suit suit="mouse" /> </>:''}{rabbit === 0 ? <><Suit suit="rabbit" /> </>:''}card in the Market, and the order card suit is {fox > 0 ? <><Suit suit='fox' /> </>:''}{mouse > 0 ? <><Suit suit="mouse" /> </>:''}{rabbit > 0 ? <><Suit suit="rabbit" /> </>:''}{<> <Suit suit="bird" /></>}, buy a {fox === 0 ? <><Suit suit='fox' /> </>:''}{mouse === 0 ? <><Suit suit="mouse" /> </>:''}{rabbit === 0 ? <><Suit suit="rabbit" /> </>:''}card from the Market and replace the order card. If there are multpile, choose one at random.</div>: ''}{CONSTANTS.riverfolkHandCardText}</>:''}</>} />,
        <Step title="Add" description="the order card to the matching Decree column." />
    ]

    const daylightSteps = [
        <Step title="Resolve the Decree" description={<>by taking the actions below in order.</>} />
    ];

    if (fox > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{fox} warrior(s) in a <Suit suit="fox" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in such a clearing with the most enemy pieces, then feweest Eyrie warriors, then lowest priority.</i>} />]}
            />}
        />,)
    }

    if (mouse > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{mouse} warrior(s) in a <Suit suit="mouse" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in such a clearing with the most enemy pieces, then feweest Eyrie warriors, then lowest priority.</i>} />]}
            />}
        />,)
    }

    if (rabbit > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{rabbit} warrior(s) in a <Suit suit="rabbit" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in such a clearing with the most enemy pieces, then feweest Eyrie warriors, then lowest priority.</i>} />]}
            />}
        />,)
    }

    if (bird > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{bird + levelToModifier[level]} warrior(s) in a <Suit suit="bird" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in such a clearing with the most enemy pieces, then feweest Eyrie warriors, then lowest priority.</i>} />]}
            />}
        />,)
    }

    if (fox > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="fox" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {fox}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to such a clearing with no roost, then fewest enemy pieces, then lowest priority.</i>} />]}
            />}
        />)
    }

    if (mouse > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="mouse" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {mouse}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to such a clearing with no roost, then fewest enemy pieces, then lowest priority.</i>} />]}
            />}
        />)
    }

    if (rabbit > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="rabbit" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {rabbit}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to such a clearing with no roost, then fewest enemy pieces, then lowest priority.</i>} />]}
            />}
        />)
    }

    if (bird > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="bird" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {bird}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to such a clearing with no roost, then fewest enemy pieces, then lowest priority.</i>} />]}
            />}
        />)
    }

    if (fox > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="fox" /> clearing.{ fox >= mouse && fox >= rabbit && fox >= bird ? <b> Deal 1 extra hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in such a clearing with no roost, then most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle such a player with most buildings there, then most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (mouse > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="mouse" /> clearing.{ mouse >= fox && mouse >= rabbit && mouse >= bird ? <b> Deal 1 extra hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in such a clearing with no roost, then most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle such a player with most buildings there, then most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (rabbit > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="rabbit" /> clearing.{ rabbit >= fox && rabbit >= mouse && rabbit >= bird ? <b> Deal 1 extra hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in such a clearing with no roost, then most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle such a player with most buildings there, then most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (bird > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="bird" /> clearing.{ bird >= fox && bird >= mouse && bird >= rabbit ? <b> Deal 1 extra hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in such a clearing with no roost, then most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle such a player with most buildings there, then most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (isRelentless) {
        daylightSteps.push(<Step title="(Relentless)" description={<>Remove all defenseless buildings and tokens in any clearing where you have warriors.{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}/>)
    }

    daylightSteps.push(<Step title="Build." description={<>Place a roost in the clearing you rule of highest priority with no roost. If you cannot place a roost, you fall into Turmoil.{canBuyServices ? CONSTANTS.riverfolkMercenariesBuildText: ''}</>}/>)

    if (isSwoop) {
        daylightSteps.push(<Step title="(Swoop)" description="Recruit two warriors in the highest priority clearing in which you have no pices."/>)
    }
    
    const eveningSteps = [
        <Step title="Score" description={<>victory points listed on the rightmost empty space on the Roosts track. (<Number value={pointsToScore} />)</>} />,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title="DC Electric Eyrie"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#406eb1"
                color="white"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (B)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a supply of 20 warriors."/>,
                                        <Step title="Place Warriors." description="Place 1 roost and 6 warriors in the corner clearing diagonally opposite from the clearing with the Keep token. If the Marquise is not playing, place those pieces in a random corner clearing."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="dc-electric-eyrie" level={level} labels={{'beginner': 'one fewer', 'expert': 'the same', 'master': 'one more'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="dc-electric-eyrie"><input id="dc-electric-eyrie" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> {CONSTANTS.humanRiverfolkLabelText}</label>
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
                        <Card title="Decree & Roosts">
                            <Decree decree={decree} onUpdateDecree={(newDecree) => updateState({...state, decree: newDecree})}/>
                            <Buildings buildings={buildings} onUpdateBuildings={(newBuildings) => {updateState({...state, buildings: newBuildings})}}/>
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
                                steps={daylightSteps}
                            />
                        </Card>
                        <Card title="Evening" headerBackgroundColor='#8a8892' headerColor='white'>
                            <Steps 
                                type="1"
                                steps={eveningSteps}
                            />
                        </Card>
                        <Card title="Turmoil">
                            <div style={{marginBottom: '0.5rem'}}>If you cannot place a roost{isNobility ? ' or a warrior' : ''}...</div>
                            <Steps
                                type="1"
                                steps={[
                                    <Step title="Humiliate:" description={<>{isNobility ? 'Score' : 'Lose'} 1 point per Bird card <i>(including Viziers)</i> in the Decree. (<Number value={bird} isNegative={isNobility ? false : true}/>)</>}/>,
                                    <Step title="Purge:" description={<>Discard Decree, except Viziers.</>}/>,
                                    <Step title="Rest:" description={<>Go to Evening.</>}/>
                                ]}
                            />
                        </Card>
                    </>
                )}
            </div>
        </section>
    );
}