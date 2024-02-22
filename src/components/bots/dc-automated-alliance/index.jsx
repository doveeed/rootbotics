
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Level from '../../level';
import Trait from '../../trait';
import Buildings, { BuildingsPreview } from "./buildings";
import OneVP from "../../one-vp";
import Sympathy, { SympathyPreview } from "./sympathy";
import SympathyImg from "../../../assets/sympathy.png";
import HumanRiverfolk from "../../human-riverfolk";
import Button from "../../button";
import Number from "../../number";
import FoxBase from '../../../assets/fox-base.png';
import MouseBase from '../../../assets/mouse-base.png';
import RabbitBase from '../../../assets/rabbit-base.png';

export default function DCAutomatedAlliance({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', buildings = {}, sympathy = [], isHumanRiverfolk = false} = state;
    const {fox, rabbit, mouse} = buildings;
    const isBossMode = level === 'boss';
    const isWildfire = traits.some(({id, isEnabled}) => id === 'wildfire' && isEnabled);
    const numPlacedSympathy = sympathy.filter(({isPlaced}) => isPlaced).length;
    const sympathyVP = sympathy.findLast(({isPlaced}) => isPlaced)?.points ||  0;
    
    const levelToOrganize = {
        'beginner': '4 or more',
        'expert': '3 or more',
        'master': '2 or more',
        'boss': '2 or more',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const placeSypmathy = () => {
        const index = sympathy.findIndex(({isPlaced}) => !isPlaced);
        const before = sympathy.slice(0,index);
        const after = sympathy.slice(index + 1);
        updateState({...state, sympathy: [...before, {...sympathy[index], isPlaced: true},...after]});
    }

    const placeBase = (type) => {
        updateState({...state, buildings: {...buildings, [type]: {...buildings[type], isPlaced: true}}})
    }

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do and the order card has no available craftable item, buy a card with an available craftable item from the Riverfolk Market and replace the order card. If multiple cards exist, pick a <Suit suit="bird" /> card, then pick the one with the most VP for the item. If multiple, choose randomly.{ orderedSuit !== 'bird' ? <> If there are no cards with available craftable items, buy any available <Suit suit="bird" /> card. If multiple, choose randomly.</> : ''} <b>Use Riverfolk warriors to pay.</b></div>:''}</>} />,
    ]

    if (orderedSuit !== 'bird' && numPlacedSympathy > 0 && !buildings[orderedSuit]?.isPlaced) {
        birdsongSteps.push(<Step title="Revolt." description={<>Remove all enemy pieces from the <Suit suit={orderedSuit} /> sympathetic clearing with the most enemy pieces, and place the <Suit suit={orderedSuit}/> base there. <Button onClick={() => placeBase(orderedSuit)} img={orderedSuit === 'fox' ? FoxBase: orderedSuit === 'mouse' ? MouseBase: RabbitBase} alt={`${orderedSuit} base`}>place the</Button></>}/>)
    }
    

    const daylightSteps = [
        <Step title="Spread Sympathy." description={<>Place the left-most token from the sympathy track into an unsympathetic clearing adjacent to a sympathetic clearing.{numPlacedSympathy < 10 && (<> <Button onClick={placeSypmathy} img={SympathyImg} alt="sympathy token">place a</Button></>)} Score the number of victory points revealed for the placed sympathy. (<Number value={sympathyVP} />)</>}
        substeps={
            <>
                <Steps type="I" steps={
                [
                    <Step title={<i>Clearing Tie:</i>} description={<i>{orderedSuit === 'bird' ? <>Place into the lowest priority clearing.</> : <>Avoid clearings with 3 or more warriors of a single player, then place in <Suit suit={orderedSuit} /> clearing.</>}</i>}/>,
                    <Step title={<i>Cannot Spread:</i>} description={<>If you cannot place a sympathy token <i>(because your Sympathy Track is empty, or because there is no clearing where you could place a sympathy token)</i>, score 5 victory points.</>}/>
                ]}/>
                <SympathyPreview sympathy={sympathy} />
            </>
        } />,
    ];

    if (orderedSuit === 'bird' && numPlacedSympathy > 0 && !(fox.isPlaced && rabbit.isPlaced && mouse.isPlaced)) {
        daylightSteps.push(<Step title="Surprise Revolt." description={<>Remove all enemy pieces from the sympathetic clearing with the most enemy pieces, and place the corresponding base there.
        {!fox.isPlaced && (<> <Button onClick={() => placeBase('fox')} img={FoxBase} alt="fox base">place the</Button></>)}
        {!rabbit.isPlaced && (<> <Button onClick={() => placeBase('rabbit')} img={RabbitBase} alt="rabbit base">place the</Button></>)}
        {!mouse.isPlaced && (<> <Button onClick={() => placeBase('mouse')} img={MouseBase} alt="mouse base">place the</Button></>)}</>}
        substeps={<BuildingsPreview buildings={buildings} />}/>)
    }

    daylightSteps.push(<Step title="Public Pity." description={<>If you did not revolt this turn, <b>Spread Sympathy</b> {numPlacedSympathy < 5 ? 'twice': 'once'}.</>}/>)

    const eveningSteps = [
        <Step title="Organize" description={<>In each clearing with a base and {levelToOrganize[level]} Alliance warriors, remove all Alliance warriors there and <b>Spread Sympathy</b>.</>}/>,
        <Step title="Recruit." description="Place a warrior in each clearing with a base." />,
        <Step title="Discard" description="the order card."/>,
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
    }

    if (isWildfire) {
        eveningSteps.push(<Step title="(Wildfire)" description={<>Immediately <b>Spread Sympathy</b>. Do not score victory points for placing this sympathy token.</>}/>)
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
                        <Card title="Setup (C)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Pieces." description="Form a supply of 10 warriors, 3 bases, and 10 sympathy tokens near you."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level level={level} labels={{'beginner': <>You <b>Organize</b> in each clearing with a base and <b>4 or more</b> Alliance warriors.</>, 'expert': <>You <b>Organize</b> in each clearing with a base and <b>3 or more</b> Alliance warriors.</>, 'master': <>You <b>Organize</b> in each clearing with a base and <b>2 or more</b> Alliance warriors.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<HumanRiverfolk onChange={(newIsHumanRiverfolk) => updateState({...state, isHumanRiverfolk: newIsHumanRiverfolk})}/>)}
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
                        <Card title="Sympathy Track and Bases">
                            <Sympathy sympathy={sympathy} onUpdateSympathy={(newSympathy) => updateState({...state, sympathy: newSympathy})}  />
                            <Buildings buildings={buildings} onUpdateBuildings={(newBuildings) => {updateState({...state, buildings: newBuildings})}} />
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