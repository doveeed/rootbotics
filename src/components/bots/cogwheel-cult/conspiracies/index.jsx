import Number from "../../../number";
import Step from "../../../step";
import Steps from "../../../steps";
import Suit from "../../../suit";
import Blank from '../../../../assets/blank.png';

export default function Conspiracies({canBuyServices, index, isSpiteful, isFanatics, onUpdateConspiracyIndex, orderedSuit}) {
    const conspiracies = ['Convert', 'Crusade', 'Convert', 'Crusade', 'Sanctify'];
    const selectedConspiracy = conspiracies[index];

    return (
    <div>
        <div style={{marginBottom: '16px'}}>To <b>Perform Conspiracies</b>, remove all warriors in the Acolytes box one by one. For each warrior move the Outcast marker along the Conspiracy track from left to right and preform the Conspiracy it lands on when the Outcast marker moves off the end of the track, place it back on the leftmost slot of the track. Do not remove Acolytes if the action can't be taken.</div>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '16px'}}>
                {conspiracies.map((name, i) => {
                    return (
                    <div 
                        key={i}
                        style={{
                            border: '4px solid black',
                            fontWeight: 'bold',
                            display: 'flex',
                            flex: '1',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: index === i ? 'black': 'transparent',
                            color: index === i ? 'white': 'black',
                            cursor: "pointer",
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onClick={() => onUpdateConspiracyIndex(i)}
                    
                    >
                        <img src={Blank} alt="blank" width="100%"/>
                        <div style={{position: 'absolute', width: '100%', wordBreak: 'break-all', textAlign: 'center'}}>{name}</div>
                    </div>)
                })}
            </div>

            <div>
                {selectedConspiracy === 'Convert' && (
                    <><Step
                        title=""
                        description={<>Remove an enemy warrior in a <Suit suit={orderedSuit} /> clearing and place a Lizard warrior there.</>}
                        substeps={<Steps type="I" steps={[<Step title={<i>Player Tie:</i>} description={<i>Target clearing with most enemy buildings.</i>} />, <Step title={<i>Clearing Tie:</i>} description={<i>Target player with most points</i>} />]}/>}
                    />
                    {isFanatics && (<Step title="Fanatics." description="battle in the above clearing, dealing an extra hit." substeps={<Steps type="I"  steps={[<Step title={<i>Player Tie:</i>} description={<i>Target palyer with most defensless buildings, then with most points.</i>}/>]}/>}/>)}
                    </>
                )}
                {selectedConspiracy === 'Crusade' && (
                    <>
                    <Step
                        title=""
                        description={<>Battle in each <Suit suit={orderedSuit} /> clearing in which you have two or more warriors.{canBuyServices ? '  If the Riverfolk player has fewer points than you do, you only have two warriors there, and at least one Riverfolk warrior is present, then buy Mercenaries.': ''}</>}
                        substeps={<Steps type="I" steps={[<Step title={<i>Defender Tie:</i>} description={<i>Battle the player with most points there.</i>} />]}/>}
                    />
                    {isSpiteful && <><b>Spiteful.</b> Score <Number value={1} /> if you removed at least one token in any clearing</>}
                    </>
                )}
                {selectedConspiracy === 'Sanctify' && (
                    <Step
                        title=""
                        description={<>Remove an enemy building in a <Suit suit={orderedSuit} /> clearing and place a matching garden there.</>}
                        substeps={<Steps type="I" steps={[<Step title={<i>Player Tie:</i>} description={<i>Target player with most points.</i>} />, <Step title={<i>Clearing Tie:</i>} description={<i>Target clearing with least enemy warriors.</i>} />]}/>}
                    />
                )}
            </div>
        </div>)
}