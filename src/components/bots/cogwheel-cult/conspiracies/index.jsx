import Step from "../../../step";
import Steps from "../../../steps";
import Suit from "../../../suit";
import Blank from '../../../../assets/blank.png';
import OneVP from "../../../one-vp";
import { CONSTANTS } from "../../../../utils";

export default function Conspiracies({canBuyServices, index, isSpiteful, isFanatics, onUpdateConspiracyIndex, orderedSuit}) {
    const conspiracies = ['Convert', 'Crusade', 'Convert', 'Crusade', 'Sanctify'];
    const selectedConspiracy = conspiracies[index];

    return (
    <div>
        <div style={{marginBottom: '16px'}}>To <b>Perform Conspiracies</b>, remove all warriors in the Acolytes box one by one. For each warrior move the Outcast marker along the Conspiracy track from left to right and preform the Conspiracy it lands on when the Outcast marker moves off the end of the track, place it back on the left-most slot of the track. Do not remove Acolytes if the action can't be taken.</div>
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
                        substeps={<Steps type="I" steps={[<Step title={<i>Player Tie:</i>} description={<i>Target the clearing with the most enemy buildings.</i>} />, <Step title={<i>Clearing Tie:</i>} description={<i>Target the player with the most victory points</i>} />]}/>}
                    />
                    {isFanatics && (<Step title="(Fanatics)" description={<>Battle in the clearing in which you removed an enemy warrior. <b>Deal an extra hit.</b></>} substeps={<Steps type="I"  steps={[<Step title={<i>Player Tie:</i>} description={<i>Target the player with the most defensless buildings, then with the most victory points.</i>}/>]}/>}/>)}
                    </>
                )}
                {selectedConspiracy === 'Crusade' && (
                    <>
                    <Step
                        title=""
                        description={<>Battle in each <Suit suit={orderedSuit} /> clearing in which you have two or more warriors.{canBuyServices ? CONSTANTS.riverfolkMercenariesBattleText: ''}{isSpiteful && <div style={{paddingLeft: '26px'}}><b>(Spiteful)</b> Score <OneVP /> if you removed at least 1 token in any clearing</div>}</>}
                        substeps={<Steps type="I" steps={[<Step title={<i>Defender Tie:</i>} description={<i>Battle the player with the most victory points.</i>} />]}/>}
                    />
                    </>
                )}
                {selectedConspiracy === 'Sanctify' && (
                    <Step
                        title=""
                        description={<>Remove an enemy building in a <Suit suit={orderedSuit} /> clearing and place a matching garden there.</>}
                        substeps={<Steps type="I" steps={[<Step title={<i>Player Tie:</i>} description={<i>Target the player with the most victory points.</i>} />, <Step title={<i>Clearing Tie:</i>} description={<i>Target clearing with least enemy warriors.</i>} />]}/>}
                    />
                )}
            </div>
        </div>)
}