import Extortion from '../../../assets/extortion.png'
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Plot from "./plot";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import OneVP from '../../one-vp';


export default function ContraptionConspiracy({state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {


    const {isSetup = false, orderedSuit = 'bird', plots = [], traits = [], level = 'expert', isHumanRiverfolk = false} = state;
    const isBossMode = level === 'boss';
    const isMastermind = traits.find(({id}) => id === 'mastermind').isEnabled;
    const isVendetta = traits.find(({id}) => id === 'vendetta').isEnabled;
    const isGamble = traits.find(({id}) => id === 'gamble').isEnabled;
    const levelToRecruit = {
        'beginner': 'one warrior',
        'expert': 'two warriors',
        'master': 'three warriors',
        'boss': 'three warriors',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;
    const flippedPlots = plots.filter(({flipped}) => flipped);
    const numFlippedExtortions = flippedPlots.filter(({type}) => type === 'extortion').length;

    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP/> if it shows an available item.{canBuyServices ? ' If the Riverfolk player has fewer points than you do and the order card has no craftable item, buy a craftable item from the Riverfolk, if available, and replace the order card. If multiple cards exist, pick the one with the most VP for the item. If multiple, choose randomly.':''}</>} />,
        <Step 
            title="Recruit"
            description={<>{levelToRecruit[level]} in each of two <Suit suit={orderedSuit} /> clearings.</>}
            substeps={
                <Steps
                    type="I"
                    steps={[
                        <Step title={<i>Clearing Tie:</i>} description={<i>Such a clearing without a plot token, then with the most Corvid warriors.</i>}/>,
                        <Step 
                            title={<i>Warrior Limit:</i>}
                            description={<i>If you run out of warriors to place, immediately perform "The Plot Thickens" before placing the remaining warriors.</i>}
                        />
                    ]}
                />
            }
        />,
        <Step 
        title="Flip"
        description={<>each plot token <i>(no warrior needed in clearing).</i> {isGamble ? 'First, have the human player with the most pieces there resolve the Gamble. ': ''}For each flip, gain <OneVP /> per face-up plot on the map (<Number value={flippedPlots.length} />), then resolve its flip effect.{isVendetta ? ' (each plot has the immediate effect of a Bomb)': ''}</>}
        />
    
    ];

    if (canBuyServices) {
        birdsongSteps.unshift(<Step title='Buy Favor Card' description={<>If the Riverfolk player has fewer points than you do and there is a "Favor" card in the Riverfolk Market, immediately buy and resolve its effect.</>} />)
    }
    
    const eveningSteps = [
        <Step title="Score" description={<> <OneVP /> per <img src={Extortion} alt='face-up Extortion plot token' height={24} width={24} style={{marginBottom: '-6px'}}/> on the map. (<Number value={numFlippedExtortions} />)</>}/>,
        <Step title="Discard" description="the order card."/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two players (rounded up).</>} />)
    }

    return (
        <section>
            <Header
                title="Contraption Conspiracy"
                isSetup={isSetup}
                onChangeSetup={() => updateState({...state, isSetup: !isSetup})}
                onDelete={onDelete}
                backgroundColor="#3c2d90"
                color="white"
            />
            <div style={{padding: '16px 8px', maxWidth: '740px', margin: '0 auto'}}>
                {!isSetup && (
                    <>
                        <Card title="Setup (I)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors." description="Form a Supply of 15 near you."/>,
                                        <Step title="Get Plots." description="Form a Supply of 8 plot tokens near you. Turn them facedown."/>,
                                        <Step title="Place Starting Warriors." description="Place 1 warrior in the lowest priority clearing of each suit (total of 3)."/>
                                    ]
                                }
                            />
                        </Card >
                        <Level faction="contraption-conspiracy" level={level} labels={{beginner: 'one', expert: 'two', master: 'three'}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<Card title="Human Riverfolk">
                            <label htmlFor="contraption-conspiracy-human-riverfolk"><input id="contraption-conspiracy-human-riverfolk" type="checkbox" onChange={() => updateState({...state, isHumanRiverfolk: !isHumanRiverfolk})} checked={isHumanRiverfolk} /> Check this box if there is a human Riverfolk player in the game.</label>
                        </Card>)}
                    </>
                )}
                <Card title='Traits'>
                    {traits.map((trait, index) => (<Trait key={trait.id} {...trait} faction={'contraption-conspiracy'} isSetup={isSetup} onUpdate={(isEnabled) => {
                        const before = traits.slice(0,index);
                        const after = traits.slice(index + 1);
                        updateState({...state, traits: [...before, {...trait, isEnabled}, ...after]})
                    }}/>))}
                </Card>
                {isSetup && (
                    <>
                        <Card title="Plots">
                            <div style={{display: 'flex', gap: '1rem', maxWidth: '500px'}}>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                    {plots.filter((({type}) => type === 'bomb')).map(({type, flipped, key}) => (
                                        <Plot key={key} type={type} flipped={flipped} 
                                            onFlip={() => {
                                                const index = plots.findIndex((plot) => plot.key === key);
                                                const before = plots.slice(0,index);
                                                const after = plots.slice(index + 1);
                                                const newPlot = {
                                                    type,
                                                    flipped: !flipped,
                                                    key,
                                                };
                                                updateState({...state, plots: [...before, newPlot,...after]})
                                            }
                                        }/>
                                    ))}
                                </div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                {plots.filter((({type}) => type === 'snare')).map(({type, flipped, key}) => (
                                        <Plot key={key} type={type} flipped={flipped} 
                                            onFlip={() => {
                                                const index = plots.findIndex((plot) => plot.key === key);
                                                const before = plots.slice(0,index);
                                                const after = plots.slice(index + 1);
                                                const newPlot = {
                                                    type,
                                                    flipped: !flipped,
                                                    key,
                                                };
                                                updateState({...state, plots: [...before, newPlot,...after]})
                                            }
                                        }/>
                                    ))}
                                </div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                {plots.filter((({type}) => type === 'extortion')).map(({type, flipped, key}) => (
                                        <Plot key={key} type={type} flipped={flipped} 
                                            onFlip={() => {
                                                const index = plots.findIndex((plot) => plot.key === key);
                                                const before = plots.slice(0,index);
                                                const after = plots.slice(index + 1);
                                                const newPlot = {
                                                    type,
                                                    flipped: !flipped,
                                                    key,
                                                };
                                                updateState({...state, plots: [...before, newPlot,...after]})
                                            }
                                        }/>
                                    ))}
                                </div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                {plots.filter((({type}) => type === 'raid')).map(({type, flipped, key}) => (
                                        <Plot key={key} type={type} flipped={flipped} 
                                            onFlip={() => {
                                                const index = plots.findIndex((plot) => plot.key === key);
                                                const before = plots.slice(0,index);
                                                const after = plots.slice(index + 1);
                                                const newPlot = {
                                                    type,
                                                    flipped: !flipped,
                                                    key,
                                                };
                                                updateState({...state, plots: [...before, newPlot,...after]})
                                            }
                                        }/>
                                    ))}
                                </div>

                            </div>
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
                                        title="Battle"
                                        description={<>in each <Suit suit={orderedSuit} /> clearing with two or more Corvid warriors.{canBuyServices ? '  If the Riverfolk player has fewer points than you do, you have two or fewer warriors there, and at least one Riverfolk warrior is present, then buy Mercenaries.': ''}</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[<Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most buildings and tokens there, then with the most points there.</i>}/>]}
                                            />
                                        }
                                    />,
                                    <Step 
                                        title="Move"
                                        description={<>all but two of your warriors from each <Suit suit={orderedSuit} /> clearing with a face-up plot token to an adjacent clearing without a plot token.</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                    <Step title={<i>Clearing Tie:</i>} description={<i>Move to the clearing with the most Corvid warriors.</i>}/>,
                                                    <Step title={<i>No Clearing:</i>} description={<i>If there is no adjacent clearing without a plot, move to lowest priority clearing.</i>}/>,
                                                ]}
                                            />
                                        }
                                    />,
                                    <Step title="Plot." description={<>Remove one Corvid warrior from the <Suit suit={orderedSuit} /> clearing with the most Corvid warriors and no plot token to place a random face-down plot token there.{isMastermind ? ' Repeat once.': ''}</>} />,
                                    <Step
                                        title="The Plot Thickens."
                                        description="If there is such a clearing that has no plot token and more than two Corvid warriors, then remove one Corvid warrior and place a random facedown plot token there."
                                        substeps={
                                            <Steps type="I" steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Place the token in the clearing with the most Corvid warriors.</i>}/>]} />
                                        }
                                    />
                                ]}
                            />
                        </Card>
                        <Card title="Evening" headerBackgroundColor='#8a8892' headerColor='white'>
                            <Steps 
                                type="1"
                                steps={eveningSteps}
                            />
                        </Card>
                        <Card title="Plots">
                            <Steps 
                                type="1"
                                steps={[
                                    <Step title="Bomb." description={<>When flipped, remove all human pieces in its clearing <i>(remove two pieces of each bot in the clearing, warriors first, instead of all their pieces.)</i>, then swap this token with a random plot token from your supply, placing the swapped plot face up. <i>(The replacement token does not trigger, and it can be another bomb.)</i></>}/>,
                                    <Step title="Snare." description={<>While face up, enemy pieces cannot be placed in or moved from its clearing <i>(as normal)</i>. <i>Bots ignore snare tokens for the purpose of targeting clearings to place or move pieces. If a bot would place in a clearing with a snare or move out of a clearing with a snare, remove the snare but do not perform this part of the action.</i></>} />,
                                    <Step title="Extortion." description="When flipped, each player with any faction pieces in its clearing must discard one card at random."/>,
                                    <Step title="Raid." description={<>When removed, place one warrior in each
                                        adjacent clearing <i>(as normal)</i>.</>} />,
                                ]}
                            />
                        </Card>
                    </>
                )}
            </div>
        </section>
    );
}