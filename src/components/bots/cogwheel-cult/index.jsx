import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import Conspiracies from "./conspiracies";
import Gardens from "./gardens";
import Suited from "../../../assets/suited.png";
import Bird from "../../../assets/bird.png";

export default function CogwheelCult({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', conspiracyIndex = 4, gardens = {}, isHumanRiverfolk = false} = state;
    const {mouse = [], rabbit = [], fox = []} = gardens;
    const isBossMode = level === 'boss';
    const isErratic = traits.find(({id}) => id === 'erratic').isEnabled;
    const isMartyrs = traits.find(({id}) => id === 'martyrs').isEnabled;
    const isFanatics = traits.find(({id}) => id === 'fanatics').isEnabled;
    const isSpiteful = traits.find(({id}) => id === 'spiteful').isEnabled;
    const gardenPoints = Math.max(mouse.findLast(({isPlaced}) => isPlaced)?.points || 0, rabbit.findLast(({isPlaced}) => isPlaced)?.points || 0, fox.findLast(({isPlaced}) => isPlaced)?.points || 0);
    const levelToCards = {
        'beginner': 'three',
        'expert': 'four',
        'master': 'five',
        'boss': 'five',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Outcasts." description="The most common suit in Lost Souls becomes the Order. In case of a tie, birds becomes the Order."/>,
        <Step title="Perform Conspiracies" description={<>in <Suit suit={orderedSuit} /> clearings.</>} />,
    ]

    if (isErratic) {
        birdsongSteps.unshift(<Step title="Add" description="the top card of the deck to the Lost Souls."/>)
    }

    const daylightSteps = [
        <Step 
            title=""
            description={<>Reveal the top {levelToCards[level]} cards from the Lost Souls pile, and in the order in which they were revealed perform the ritual below for each.</>}
        />,
    ];

    if (canBuyServices) {
        daylightSteps.unshift(<Step title="" description={<>If there are less than {levelToCards[level]} cards in Lost Souls, buy non-bird cards until this is no longer the case. Do this even if the Riverfolk or Rivetflok player has more points than you.</>}/>)
    }

    const eveningSteps = [
        <Step title="Score" description={<>points of rightmost empty garden space. (<Number value={gardenPoints} />)</>}/>,
        <Step title="Discard Lost Souls." description=""/>,
        <Step title="Return" description="revealed cards to Lost Souls"/>,
        <Step title="Reveal" description={<>the top card of the deck and craft it for <Number value={1} /> if it shows an available item. {canBuyServices ? 'If the drawn card has no craftable item and the Riverfolk have fewer points than you, buy a craftable item from the Riverfolk if available. Do not buy a Bird card. If multiple cards exist, pick the one with the most VP for the item. If multiple, choose randomly.':''} Then add it to Lost Souls.</>}/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <Number value={1} /> for every player (rounded up).</>} />)
    }
    

    return (
        <section>
            <Header
                title="Cogwheel Cult"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#f4e274"
            />
            <div style={{padding: '16px 8px'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (F)">
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
                        <Level faction="cogwheel-cult" level={level} labels={{'beginner': 'three', 'expert': 'four', 'master': 'five'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="cogwheel-cult-human-riverfolk"><input id="cogwheel-cult-human-riverfolk" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> Check this box if there is a human Riverfolk player in the game.</label>
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
                        <Card
                            title="Conspiracy Track"
                        >
                            <Conspiracies canBuyServices={canBuyServices} isSpiteful={isSpiteful} isFanatics={isFanatics} index={conspiracyIndex} onUpdateConspiracyIndex={(newIndex) => updateState({...state, conspiracyIndex: newIndex})} orderedSuit={orderedSuit}/>
                        </Card>
                        <Gardens gardens={gardens} onUpdateGardens={(gardens) => {updateState({...state, gardens})}}/>
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
                            <div>
                                <div style={{display: 'flex'}}>
                                    <div ><img src={Suited} alt="rabbit, fox, mouse cards" title="rabbit, fox, mouse cards" width="48px" style={{margin: '0 0.5rem 0 1rem'}} /></div>
                                    <div>
                                        <Step title='' description={<>Place a warrior into clearing matching the revealeed card. Then if you rule the clearing, also place a matching garden in the clearing.{canBuyServices ? ' If the Riverfolk player has fewer points than you do and buying Mercenaries would allow you to place a garden, buy Mercenaries.': ''}</>}
                                            substeps={<Steps type='I' steps={
                                                [<Step title={<i>Clearing Tie:</i>} description={<i>Place warrior into clearing with free building slots, then most enemy buildings.</i>} />]
                                            }/>}
                                        />
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div ><img src={Bird} alt="bird card" title="bird card" width="48px" style={{margin: '0 0.5rem 0 1rem'}} /></div>
                                    <div>
                                        <Step 
                                            title="" description={<>Move one of your warriors from the clearing with the most Lizard warriors to the Acolytes box. Then move this card to the discard pile.</>}
                                        />
                                        {isMartyrs && (
                                            <Step 
                                            title="Martyrs." description={<>Move one warrior from the supply to the Acolytes box.</>}
                                        />
                                        )}
                                    </div>
                                </div>
                            </div>
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