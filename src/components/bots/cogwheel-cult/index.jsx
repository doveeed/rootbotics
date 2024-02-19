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
import Gardens, { GardensPreview } from "./gardens";
import Suited from "../../../assets/suited.png";
import Bird from "../../../assets/bird.png";
import OneVP from "../../one-vp";
import { CONSTANTS, getFactionColor } from "../../../utils";
import HumanRiverfolk from "../../human-riverfolk";
import Button from "../../button";
import MouseGarden from '../../../assets/mouse-garden.png';
import RabbitGarden from '../../../assets/rabbit-garden.png';
import FoxGarden from '../../../assets/fox-garden.png';


export default function CogwheelCult({faction, state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', conspiracyIndex = 4, gardens = {}, isHumanRiverfolk = false} = state;
    const {mouse = [], rabbit = [], fox = []} = gardens;
    const isBossMode = level === 'boss';
    const isErratic = traits.some(({id, isEnabled}) => id === 'erratic' && isEnabled);
    const isMartyrs = traits.some(({id, isEnabled}) => id === 'martyrs' && isEnabled);
    const isFanatics = traits.some(({id, isEnabled}) => id === 'fanatics' && isEnabled);
    const isSpiteful = traits.some(({id, isEnabled}) => id === 'spiteful' && isEnabled);
    const gardenPoints = Math.max(mouse.findLast(({isPlaced}) => isPlaced)?.points || 0, rabbit.findLast(({isPlaced}) => isPlaced)?.points || 0, fox.findLast(({isPlaced}) => isPlaced)?.points || 0);
    const suitToNumPlacedGardens = {
        fox: gardens.fox.filter(({isPlaced}) => isPlaced).length,
        rabbit: gardens.rabbit.filter(({isPlaced}) => isPlaced).length,
        mouse: gardens.mouse.filter(({isPlaced}) => isPlaced).length,
    }
    const levelToCards = {
        'beginner': '3',
        'expert': '4',
        'master': '5',
        'boss': '5',
    }
    const placeGarden = (type) => {
        const index = gardens[type].findIndex(({isPlaced}) => !isPlaced);
        if (index === -1) {
            return;
        }
        const garden = gardens[type][index];
        const before = gardens[type].slice(0,index);
        const after = gardens[type].slice(index + 1);
            updateState({...state, gardens: {...state.gardens, [type]: [...before, { ...garden, isPlaced: true }, ...after]}});
    };
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Outcasts." description={<>The most common suit in Lost Souls becomes the order. In case of a tie, <Suit suit="bird" /> becomes the order.</>} />,
        <Step title="Perform Conspiracies" description={<>in <Suit suit={orderedSuit} /> clearings.</>} />,
    ]

    if (isErratic) {
        birdsongSteps.unshift(<Step title="(Erratic)" description="Add the top card of the deck to the Lost Souls."/>)
    }

    const daylightSteps = [
        <Step 
            title=""
            description={<>Reveal the top {levelToCards[level]} cards from the Lost Souls pile, and in the order in which they were revealed perform the ritual below for each.</>}
        />,
    ];

    if (canBuyServices) {
        daylightSteps.unshift(<Step title="(Riverfolk)" description={<>If there are less than {levelToCards[level]} cards in Lost Souls, buy <Suit suit={'fox'} />, <Suit suit={'rabbit'} />, and <Suit suit={'mouse'} /> cards until this is no longer the case. Do this even if the Riverfolk player has more victory points than you.</>}/>)
    }

    const eveningSteps = [
        <Step title="Score" description={<>victory points of right-most empty garden space on the Gardens Track. (<Number value={gardenPoints} />)</>}/>,
        <Step title="Discard Lost Souls." description="Discard all cards in your Lost Souls pile." />,
        <Step title="Return" description="revealed cards to Lost Souls"/>,
        <Step title="Reveal" description={<>the top card of the deck and craft it for <OneVP/> if it shows an available item. {canBuyServices ? <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do and the order card has no available craftable item, buy a card with an available craftable item from the Riverfolk Market and replace the order card. If multiple cards exist, pick the one with the most VP for the item. If multiple, choose randomly. <b>Do not buy a <Suit suit="bird" /> card.</b> Then add it to Lost Souls.</div>:''}</>}/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP/> for every two human players (rounded up).</>} />)
    }
    

    return (
        <section>
            <Header
                title="Cogwheel Cult"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor={getFactionColor(faction)}
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (F)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Pieces." description="Form a supply of 25 warriors, 5 mouse gardens, 5 rabbit gardens, and 5 fox gardens near you."/>,
                                        <Step title="Place Warriors." description="Place 4 warriors and 1 garden of matching printed suit in a random corner clearing that is not the starting corner clearing of another bot and, if possible, is diagonally opposite from a starting corner clearing. Then place 1 warrior in each adjacent clearing."/>,
                                        <Step title="Draw Lost Souls." description="Draw 3 cards and place them face up in your Lost Souls in the order drawn."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction={faction} level={level} labels={{'beginner': <>At the start of Daylight, Reveal the top <b>3 cards</b> from the lost Souls pile.</>, 'expert': <>At the start of Daylight, Reveal the top <b>4 cards</b> from the lost Souls pile.</>, 'master': <>At the start of Daylight, Reveal the top <b>5 cards</b> from the lost Souls pile.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
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
                        <Gardens gardens={gardens} onUpdateGardens={(gardens) => {updateState({...state, gardens}) }}/>
                        <Card title="Ordered suit">
                            <Order order={orderedSuit} onChangeOrder={(newOrder) => updateState({...state, orderedSuit:newOrder})}/>
                        </Card>
                        <Card title="Birdsong" headerBackgroundColor="#f6a045" headerColor="white">
                            <Steps
                                type="1"
                                steps={birdsongSteps}
                            />
                            
                        </Card>
                        <Card
                            title="Conspiracy Track"
                        >
                            <Conspiracies canBuyServices={canBuyServices} isSpiteful={isSpiteful} isFanatics={isFanatics} index={conspiracyIndex} onUpdateConspiracyIndex={(newIndex) => updateState({...state, conspiracyIndex: newIndex})} orderedSuit={orderedSuit} gardens={gardens} suitToNumPlacedGardens={suitToNumPlacedGardens} onSanctify={placeGarden} />
                        </Card>
                        <Card title="Daylight" headerBackgroundColor="#6db6dc" headerColor="white">
                            <Steps 
                                type="1"
                                steps={daylightSteps}
                            />
                            <div>
                                <div style={{display: 'flex'}}>
                                    <div ><img src={Suited} alt="rabbit, fox, mouse cards" width="48px" style={{margin: '0 0.5rem 0 1rem'}} /></div>
                                    <div>
                                        <Step title='' description={
                                        <>Place a warrior into clearing matching the revealed card. Then if you rule the clearing, also place a matching garden in the clearing.
                                        {suitToNumPlacedGardens.mouse < 5 && (<> <Button alt="mouse garden" img={MouseGarden} onClick={() => placeGarden('mouse')}>place a</Button></>) }
                                        {suitToNumPlacedGardens.rabbit < 5 && (<> <Button alt="rabbit garden" img={RabbitGarden} onClick={() => placeGarden('rabbit')}>place a</Button></>) }
                                        {suitToNumPlacedGardens.fox < 5 && (<> <Button alt="fox garden" img={FoxGarden} onClick={() => placeGarden('fox')}>place a</Button></>) }
                                        {canBuyServices ? CONSTANTS.riverfolkMercenariesBuildText: ''}</>}
                                            substeps={<><Steps type='I' steps={
                                                [<Step title={<i>Clearing Tie:</i>} description={<i>Place the warrior into the clearing with any free building slots, then the most enemy buildings.</i>} />]
                                            }/>  
                                        <GardensPreview gardens={gardens} isShowAll /></>}
                                        />
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div ><img src={Bird} alt="bird card" width="48px" style={{margin: '0 0.5rem 0 1rem'}} /></div>
                                    <div>
                                        <Step 
                                            title="" description={<>Move 1 of your warriors from the clearing with the most Lizard warriors to the Acolytes box. Then move this card to the discard pile.</>}
                                        />
                                        {isMartyrs && (
                                            <Step 
                                            title="(Martyrs)" description={<>Move 1 additional warrior from the supply to the Acolytes box.</>}
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