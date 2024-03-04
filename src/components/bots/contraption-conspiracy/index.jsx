import Bomb from '../../../assets/bomb.png';
import BombCutout from '../../../assets/bomb-cutout.png';
import Snare from '../../../assets/snare.png';
import SnareCutout from '../../../assets/snare-cutout.png';
import Extortion from '../../../assets/extortion.png';
import ExtortionCutout from '../../../assets/extortion-cutout.png';
import Raid from '../../../assets/raid.png';
import RaidCutout from '../../../assets/raid-cutout.png';
import Step from "../../step";
import Header from "../../header";
import Card from "../../card";
import Steps from "../../steps";
import Order from "../../order";
import Suit from "../../suit";
import Plot, { PlotPreview } from "./plot";
import Number from "../../number";
import Level from '../../level';
import Trait from '../../trait';
import OneVP from '../../one-vp';
import { CONSTANTS } from '../../../utils';
import HumanRiverfolk from '../../human-riverfolk';
import Button from '../../button';


export default function ContraptionConspiracy({ state = {}, isRivetfolkPlaying, onDelete = () => {}, updateState = () => {}}) {

    const {isSetup = false, orderedSuit = 'bird', plots = [], traits = [], level = 'expert', isHumanRiverfolk = false, isStandardDeck = false} = state;
    const isBossMode = level === 'boss';
    const isMastermind = traits.find(({id}) => id === 'mastermind').isEnabled;
    const isVendetta = traits.find(({id}) => id === 'vendetta').isEnabled;
    const isGamble = traits.find(({id}) => id === 'gamble').isEnabled;
    const levelToRecruit = {
        'beginner': '1 warrior',
        'expert': '2 warriors',
        'master': '3 warriors',
        'boss': '3 warriors',
    }
    const canBuyServices = isRivetfolkPlaying || isHumanRiverfolk;
    const flippedPlots = plots.filter(({flipped}) => flipped);
    const numFlippedExtortions = flippedPlots.filter(({type}) => type === 'extortion').length;
    const unflippedBombIndex = plots.findIndex(({flipped, type}) => !flipped && type === 'bomb');
    const unflippedSnareIndex = plots.findIndex(({flipped, type}) => !flipped && type === 'snare');
    const unflippedExtortionIndex = plots.findIndex(({flipped, type}) => !flipped && type === 'extortion');
    const unflippedRaidIndex = plots.findIndex(({flipped, type}) => !flipped && type === 'raid');

    const flipPlot = (index) => {
         const before = plots.slice(0,index);
         const after = plots.slice(index + 1);
         updateState({...state, plots: [...before,{...plots[index], flipped: true}, ...after]})
    }
    const birdsongSteps = [
        <Step title="Reveal" description="the top card of the deck as order card."/>,
        <Step title="Craft" description={<>order card for <OneVP/> if it shows an available item.{canBuyServices ? CONSTANTS.riverfolkHandCardText:''}</>} />,
        <Step 
            title="Recruit"
            description={<>{levelToRecruit[level]} each in two <Suit suit={orderedSuit} /> clearings.</>}
            substeps={
                <Steps
                    type="I"
                    steps={[
                        <Step title={<i>Clearing Tie:</i>} description={<i>Target the clearing without a plot token, then with the most Corvid warriors.</i>}/>,
                        <Step 
                            title={<i>Warrior Limit:</i>}
                            description={<i>If you run out of warriors to place, immediately perform <b>The Plot Thickens</b> before placing the remaining warriors.</i>}
                        />
                    ]}
                />
            }
        />,
        <Step 
            title="Flip"
            description={<>each plot token <i>(no warrior needed in clearing). </i>
                {unflippedBombIndex  !== -1 && (<> <Button onClick={()=> flipPlot(unflippedBombIndex)} img={Bomb} alt="face-up Bomb plot token">place a</Button></>)}
                {unflippedSnareIndex  !== -1 && (<> <Button onClick={()=> flipPlot(unflippedSnareIndex)} img={Snare} alt="face-up Snare plot token">place a</Button></>)}
                {unflippedExtortionIndex  !== -1 && (<> <Button onClick={()=> flipPlot(unflippedExtortionIndex)} img={Extortion} alt="face-up Extortion plot token" >place a</Button></>)}
                {unflippedRaidIndex  !== -1 && (<> <Button onClick={()=> flipPlot(unflippedRaidIndex)} img={Raid} alt="face-up Raid plot token">place a</Button></>)}
                <> For each flip, gain <OneVP /> per face-up plot on the map (<Number value={flippedPlots.length} />), then resolve its flip effect.</>
                {isGamble ? <div style={{paddingLeft: '26px'}}><b>(Gamble)</b> First, have the human player with the most pieces there resolve the <b>Gamble</b> trait. </div>: ''}
                {isVendetta ? <div style={{paddingLeft: '26px'}}><b>(Vendetta)</b> Each plot has the immediate effect of a Bomb</div>: ''}
                <div style={{display: 'flex', gap: '0.25rem', margin: '1rem auto'}}>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                                    {plots.filter((({type}) => type === 'bomb')).map(({type, flipped, key}) => (
                                        <PlotPreview key={key} type={type} flipped={flipped} />
                                    ))}
                                </div>
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                                    {plots.filter((({type}) => type === 'snare')).map(({type, flipped, key}) => (
                                        <PlotPreview key={key} type={type} flipped={flipped}  />
                                    ))}
                                </div>
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                                    {plots.filter((({type}) => type === 'extortion')).map(({type, flipped, key}) => (
                                        <PlotPreview key={key} type={type} flipped={flipped}  />
                                    ))}
                                </div>
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                                    {plots.filter((({type}) => type === 'raid')).map(({type, flipped, key}) => (
                                        <PlotPreview key={key} type={type} flipped={flipped}  />
                                    ))}
                                </div>

                            </div>
                </>
            }
            
            />
    ];

    if (canBuyServices && isStandardDeck) {
        birdsongSteps.unshift(<Step title='(Riverfolk)' description={<>If the Riverfolk player does not have more victory points than you do and there is a "Favor" card in the Riverfolk Market, immediately buy and resolve its effect.</>} />)
    }
    
    const eveningSteps = [
        <Step title="Score" description={<> <OneVP /> per <img src={Extortion} alt='face-up Extortion plot token' height={24} width={24} style={{marginBottom: '-6px'}}/> on the map. (<Number value={numFlippedExtortions} />)</>}/>,
        <Step title="Discard" description="the order card."/>
    ];

    if (isBossMode) {
        eveningSteps.push(<Step title="Boss Mode." description={<>Score <OneVP /> for every two human players (rounded up).</>} />)
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
                        <Card title="Setup (I)">
                            <Steps
                                steps={
                                    [
                                        <Step title="Gather Warriors and Plots." description="Form supplies of 15 warriors and 8 face-down plot tokens near you."/>,
                                        <Step title="Place Starting Warriors." description="Place 1 warrior in the lowest priority clearing of each suit (total of 3)."/>
                                    ]
                                }
                            />
                        </Card >
                        <Card title="Deck">
                            <label htmlFor='base-deck' style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
                                <input id='base-deck'type="checkbox" checked={isStandardDeck}  onChange={() => updateState({...state, isStandardDeck: !isStandardDeck})}/>
                                <div>
                                    <div><b>Standard Deck</b></div>
                                    <div>Check this if playing with the Standard Deck</div>
                                </div>
                            </label>
                        </Card>
                        <Level  level={level} labels={{beginner: <>Whenever you <b>Recruit</b>, place <b>1 warrior</b> in each clearing.</>, expert: <>Whenever you <b>Recruit</b>, place <b>2 warriors</b> in each clearing.</>, master: <>Whenever you <b>Recruit</b>, place <b>3 warriors</b> in each clearing.</>}} onChangeLevel={(newLevel) => updateState({...state, level: newLevel})} />
                        {!isRivetfolkPlaying && (<HumanRiverfolk  onChange={(newIsHumanRiverfolk) => updateState({...state, isHumanRiverfolk: newIsHumanRiverfolk})}/>)}
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
                        <Card title="Plots">
                            <div style={{display: 'flex', gap: '1rem', maxWidth: '500px'}}>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                    <img style={{margin: '0 auto', minWidth: '1rem'}} src={BombCutout} width="32%." alt="bomb plots header" />
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
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                <img style={{margin: '0 auto', minWidth: '1rem'}} src={SnareCutout} width="32%" alt="snare plots header" />
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
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                <img style={{margin: '0 auto', minWidth: '1rem'}} src={ExtortionCutout} width="32%" alt="extortion plots header" />
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
                                <div style={{backgroundColor: 'black', width: '1px', flexDirection: 'column', display: 'flex'}}></div>
                                <div style={{display: 'flex', flex: '1', flexDirection: 'column', gap: '1rem'}}>
                                <img style={{margin: '0 auto', minWidth: '1rem'}} src={RaidCutout} width="32%" alt="raid plots header" />
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
                                        description={<>in each <Suit suit={orderedSuit} /> clearing with 2 or more Corvid warriors.{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[<Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most buildings and tokens there, then with the most victory points.</i>}/>]}
                                            />
                                        }
                                    />,
                                    <Step 
                                        title="Move"
                                        description={<>all but 2 of your warriors from each <Suit suit={orderedSuit} /> clearing with a face-up plot token to an adjacent clearing without a plot token.</>}
                                        substeps={
                                            <Steps 
                                                type="I"
                                                steps={[
                                                    <Step title={<i>Clearing Tie:</i>} description={<i>Move to the clearing with the most Corvid warriors.</i>}/>,
                                                    <Step title={<i>No Clearing:</i>} description={<i>If there is no adjacent clearing without a plot, move to the lowest priority clearing.</i>}/>,
                                                ]}
                                            />
                                        }
                                    />,
                                    <Step title="Plot." description={<>Remove 1 Corvid warrior from the <Suit suit={orderedSuit} /> clearing with the most Corvid warriors and no plot token to place a random face-down plot token there.{isMastermind ? <div style={{paddingLeft: '26px'}}><b>(Mastermind)</b> Repeat once.</div>: ''}</>} />,
                                    <Step
                                        title="The Plot Thickens."
                                        description="If there is such a clearing that has no plot token and more than 2 Corvid warriors, then remove 1 Corvid warrior and place a random face-down plot token there."
                                        substeps={
                                            <Steps type="I" steps={[<Step title={<i>Clearing Tie:</i>} description={<i>Place the plot token in the clearing with the most Corvid warriors.</i>}/>]} />
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
                                    <Step title="Bomb." description={<>When flipped, remove all human pieces in its clearing <i>(remove 2 pieces of each bot in the clearing, warriors first, instead of all their pieces.)</i>, then swap this plot token with a random plot token from your supply, placing the swapped plot face up. <i>(The replacement plot token does not trigger, and it can be another bomb.)</i></>}/>,
                                    <Step title="Snare." description={<>While face up, enemy pieces cannot be placed in or moved from its clearing <i>(as normal)</i>. <i>Bots ignore snare plot tokens for the purpose of targeting clearings to place or move pieces. If a bot would place in a clearing with a snare or move out of a clearing with a snare, remove the snare but do not perform this part of the action.</i></>} />,
                                    <Step title="Extortion." description="When flipped, each player with any faction pieces in its clearing must discard 1 card at random."/>,
                                    <Step title="Raid." description={<>When removed, place 1 warrior in each adjacent clearing <i>(as normal)</i>.</>} />,
                                ]}
                            />
                        </Card>
                    </>
                )}
            </div>
        </section>
    );
}