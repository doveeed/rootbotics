
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import Buildings, { BuildingsPreview } from "./buildings";
import Decree from "./decree";
import OneVP from "../../one-vp";
import { CONSTANTS, getFactionColor, getFactionName } from "../../../utils";
import HumanRiverfolk from "../../human-riverfolk";
import Button from "../../button";
import Roost from "../../../assets/roost.png";

export default function DCElectricEyrie({faction, state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
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
    const numPlacedRoosts = buildings.filter(({isPlaced}) => isPlaced).length;

    const isBuyDecreeCard = (fox === 0 || mouse === 0 || rabbit === 0);

    const placeRoost = () => {
        const index = buildings.findIndex(({isPlaced}) => !isPlaced);
        const before = buildings.slice(0,index);
        const after = buildings.slice(index + 1);
        updateState({...state, buildings: [...before, { ...buildings[index], isPlaced: true }, ...after]});
    
    }

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? <>{isBuyDecreeCard ? <div style={{paddingLeft: '26px'}}><b>(Riverfolk) </b>If the Riverfolk player does not have more victory points than you do, there is a {fox === 0 ? <><Suit suit='fox' /> </>:''}{mouse === 0 ? <><Suit suit="mouse" /> </>:''}{rabbit === 0 ? <><Suit suit="rabbit" /> </>:''}card in the Market, and the order card suit is {fox > 0 ? <><Suit suit='fox' /> </>:''}{mouse > 0 ? <><Suit suit="mouse" /> </>:''}{rabbit > 0 ? <><Suit suit="rabbit" /> </>:''}{<> <Suit suit="bird" /></>}, buy a {fox === 0 ? <><Suit suit='fox' /> </>:''}{mouse === 0 ? <><Suit suit="mouse" /> </>:''}{rabbit === 0 ? <><Suit suit="rabbit" /> </>:''}card from the Market and replace the order card. If there are multpile, choose one at random.</div>: ''}{CONSTANTS.riverfolkHandCardText}</>:''}</>} />,
        <Step title="Add" description="the order card to the matching Decree column." />
    ]

    const daylightSteps = [
        <Step title="Resolve the Decree" description={<>by taking the actions below in order.</>} />
    ];

    if (fox > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{fox} {fox === 1 ? 'warrior':'warriors'} in a <Suit suit="fox" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in the clearing with the most enemy pieces, then the fewest Eyrie warriors, then the lowest priority.</i>} />]}
            />}
        />,)
    }

    if (mouse > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{mouse} {mouse === 1 ? 'warrior':'warriors'} in a <Suit suit="mouse" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in the clearing with the most enemy pieces, then the fewest Eyrie warriors, then the lowest priority.</i>} />]}
            />}
        />,)
    }

    if (rabbit > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{rabbit} {rabbit === 1 ? 'warrior':'warriors'} in a <Suit suit="rabbit" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in the clearing with the most enemy pieces, then the fewest Eyrie warriors, then the lowest priority.</i>} />]}
            />}
        />,)
    }

    if (bird > 0) {
        daylightSteps.push(<Step 
            title="Recruit"
            description={<>{bird + levelToModifier[level]} {bird + levelToModifier[level] === 1 ? 'warrior':'warriors'} in a <Suit suit="bird" /> clearing with a roost.{isNobility ? CONSTANTS.eyrieNobilityText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Recruit in the clearing with the most enemy pieces, then the fewest Eyrie warriors, then the lowest priority.</i>} />]}
            />}
        />,)
    }

    if (fox > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="fox" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {fox}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to the clearing with no roost, then the fewest enemy pieces, then the lowest priority.</i>} />]}
            />}
        />)
    }

    if (mouse > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="mouse" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {mouse}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to the clearing with no roost, then the fewest enemy pieces, then the lowest priority.</i>} />]}
            />}
        />)
    }

    if (rabbit > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="rabbit" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {rabbit}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to the clearing with no roost, then the fewest enemy pieces, then the lowest priority.</i>} />]}
            />}
        />)
    }

    if (bird > 0) {
        daylightSteps.push(<Step 
            title="Move"
            description={<>from the <Suit suit="bird" /> clearing you rule with the most of your warriors to an adjacent clearing. Leave enough warriors to exactly rule the origin clearing or {bird}, whichever is higher. Do not consider clearings in which no warrior would move.{canBuyServices ? CONSTANTS.riverfolkRiverBoatsText : ''}</>}
            substeps={<Steps type="I"
                steps={[<Step title={<i>Destination Tie:</i>} description={<i>Move to the clearing with no roost, then the fewest enemy pieces, then the lowest priority.</i>} />]}
            />}
        />)
    }

    if (fox > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="fox" /> clearing.{ fox >= mouse && fox >= rabbit && fox >= bird ? <b> Deal 1 extra Hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in the clearing with no roost, then the most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings there, then the most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (mouse > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="mouse" /> clearing.{ mouse >= fox && mouse >= rabbit && mouse >= bird ? <b> Deal 1 extra Hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in the clearing with no roost, then the most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings there, then the most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (rabbit > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="rabbit" /> clearing.{ rabbit >= fox && rabbit >= mouse && rabbit >= bird ? <b> Deal 1 extra Hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in the clearing with no roost, then the most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings there, then the most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (bird > 0) {
        daylightSteps.push(
            <Step 
                title="Battle"
                description={<>in a <Suit suit="bird" /> clearing.{ bird >= fox && bird >= mouse && bird >= rabbit ? <b> Deal 1 extra Hit.</b> : ''}{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}
                substeps={<Steps type="I"
                    steps={[
                    <Step title={<i>Clearing Tie:</i>} description={<i>Battle in the clearing with no roost, then the most defensless buildings.</i>} />,
                    <Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings there, then the most pieces there.</i>} />,
                ]}
            />}
        />
        )
    }

    if (isRelentless) {
        daylightSteps.push(<Step title="(Relentless)" description={<>Remove all defenseless buildings and tokens in any clearing where you have warriors.{isWarTax ? CONSTANTS.eyrieWarTaxText : ''}</>}/>)
    }

    if (numPlacedRoosts < 7) {
        daylightSteps.push(
            <Step title="Build."
                description={<>Place a roost in the clearing you rule of highest priority with no roost. If you cannot place a roost, you fall into Turmoil. <Button onClick={placeRoost} img={Roost} alt="roost">place a</Button>{canBuyServices ? CONSTANTS.riverfolkMercenariesBuildText: ''}</>}
                substeps={<BuildingsPreview buildings={buildings}/>}    
            />)
    } else {
        daylightSteps.push(<Step title="Fall into Turmoil" description="since there are no more roosts to place." />)
    }
    
    if (isSwoop) {
        daylightSteps.push(<Step title="(Swoop)" description="Recruit 2 warriors in the highest priority clearing in which you have no pieces."/>)
    }
    
    const eveningSteps = [
        <Step title="Score" description={<>victory points listed on the right-most empty space on the Roosts Track. (<Number value={pointsToScore} />)</>} />,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title={getFactionName(faction)}
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor={getFactionColor(faction)}
                color="white"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (B)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Pieces." description="Form a supply of 20 warriors and 7 roosts near you."/>,
                                        <Step title="Place Warriors." description="Place 1 roost and 6 warriors in the corner clearing diagonally opposite from the clearing with the keep token. If the Marquise is not playing, place those pieces in a random corner clearing."/>,
                                        <Step title="Tuck Viziers." description={<>Set the <Suit suit="bird" /> card count 2 in the Decree (<Suit suit="fox" />, <Suit suit="rabbit" />, and <Suit suit="mouse" /> should be 0).</>} />
                                    ]
                                }
                            />
                        </Card >
                        <Card title="Decree">
                            <Decree decree={decree} onUpdateDecree={(newDecree) => updateState({...state, decree: newDecree})}/>
                        </Card>
                        <Level faction={faction} level={level} labels={{'beginner': <>Whenever you <b>Recruit</b> for <Suit suit="bird" />, place <b>one fewer</b> warrior than the card count.</>, 'expert': <>Whenever you <b>Recruit</b> for <Suit suit="bird" />, place <b>the same</b> number of warriors as the card count.</>, 'master': <>Whenever you <b>Recruit</b> for <Suit suit="bird" />, place <b>one more</b> warrior than the card count.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<HumanRiverfolk faction={faction} onChange={(newIsHumanRiverfolk) => updateState({...state, isHumanRiverfolk: newIsHumanRiverfolk})}/>)}
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
                        <Card title="Decree & Roosts Track">
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
                                    <Step title={<>Humiliate:</>} description={<>{isNobility ? <><b>(Nobility) </b>Score</> : 'Lose'} 1 victory point per <Suit suit="bird" /> card <i>(including Viziers)</i> in the Decree. (<Number value={bird} isNegative={isNobility ? false : true}/>)</>}/>,
                                    <Step title="Purge:" description={<>Discard Decree, except Viziers. <Button onClick={()=> updateState({...state, decree: {fox: 0, mouse: 0, rabbit: 0, bird: 2}})} >Purge Decree</Button></>}/>,
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