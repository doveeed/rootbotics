
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Level from '../../level';
import Trait from '../../trait';
import Buildings from "./buildings";
import OneVP from "../../one-vp";
import Sympathy from "./sympathy";

export default function DCAutomatedAlliance({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {
    const {isSetup = false, orderedSuit = 'bird', traits = [], level = 'expert', buildings = {}, sympathy = [], isHumanRiverfolk = false} = state;
    const {fox, rabbit, mouse} = buildings;
    const isBossMode = level === 'boss';
    const numPlacedSympathy = sympathy.filter(({isPlaced}) => isPlaced).length;
    
    const levelToOrganize = {
        'beginner': 'four or more',
        'expert': 'three or more',
        'master': 'two or more',
        'boss': 'two or more',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP /> if it shows an available item.{canBuyServices ? <><br/><b>(Riverfolk)</b> if the Riverfolk player has fewer points than you do and the order card has no craftable item, buy a craftable item from the Riverfolk, if available, and replace the order card. If multiple cards exist, pick a Bird card, then pick the one with the most victory points for the item. If multiple, choose randomly. If there are no craftable items available and the order card is not Bird, buy any available Bird card. If there are multiple, choose randomly. <b>Use Riverfolk warriors to pay.</b></>:''}</>} />,
    ]

    if (orderedSuit !== 'bird' && numPlacedSympathy > 0 && !buildings[orderedSuit]?.isPlaced) {
        birdsongSteps.push(<Step title="Revolt." description={<>Remove all enemy pieces from the <Suit suit={orderedSuit} /> sympathetic clearing with the most enemy pices, and place the <Suit suit={orderedSuit}/> base there.</>}/>)
    }
    

    const daylightSteps = [
        <Step title="Spread Sympathy." description={<>Place the left-most token from the sympathy track into an unsympathetic clearing adjacent to a sympathetic clearing.</>}
        substeps={
        <Steps type="I" steps={
            [
                <Step title={<i>Clearing Tie:</i>} description={<i>{orderedSuit === 'bird' ? <>Place into the lowest priority clearing.</> : <>Avoid clearings with 3 or more warriors of a single player, then place in <Suit suit={orderedSuit} /> clearing.</>}</i>}/>
            ]}/>} />,
    ];

    if (orderedSuit === 'bird' && numPlacedSympathy > 0 && !(fox?.isPlaced && rabbit?.isPlaced && mouse?.isPlaced)) {
        daylightSteps.push(<Step title="Surprise Revolt." description={<>Remove all enemy pieces from the <Suit suit={orderedSuit} /> sympathetic clearing with the most enemy pices, and place the <Suit suit={orderedSuit}/> base there.</>}/>)
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
    

    return (
        <section>
            <Header
                title="DC Automated Alliance"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#6db456"
                color="white"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (C)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a supply of 10 warriors."/>,
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="dc-automated-alliance" level={level} labels={{'beginner': 'four', 'expert': 'three', 'master': 'two'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="dc-automated-alliance"><input id="dc-automated-alliance" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> Check this box if there is a human Riverfolk player in the game.</label>
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
                        <Card title="Sympathy and Bases">
                            <Sympathy sympathy={sympathy} onUpdateSympathy={(newSympathy) => updateState({...state, sympathy: newSympathy})}/>
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
                    </>
                )}
            </div>
        </section>
    );
}