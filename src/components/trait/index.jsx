import { getFactionColor } from "../../utils";
import OneVP from "../one-vp";

const traitIdDescriptionMap = {
    'automated-ambush': 'In battle as defender with any Alliance warriors, you deal an extra hit.',
    'automated-outrage': <>Whenever a human player removes a sympathy token or moves any warriors into a sympathetic clearing, they must discard a matching card. If they cannot, you score <OneVP />.</>,
    'backup-plans': 'When one of your tokens is removed, place a warrior from your supply into the clearing wich contained the token.',
    'blitz': <>After your <b>Move</b> action, select the highest priority clearing you rule without any enemy pieces. Move all but one warrior from the clearing and battle in the destination if opponents are present.</>,
    'cost-of-errors': 'Whenever any number of Duchy buildings are removed, remove the crown furthest towards the bottom of the minister track.',
    'embedded-agents': 'In battle as defender with a facedown plot token, you deal an extra hit.',
    'erratic': 'At the beginning of your turn, add the top card of the deck to the Lost Souls.',
    'fanatics': <>Whenever you <b>Convert</b>, also battle in that clearing dealing an extra hit. <i><b>Player Tie:</b> Target palyer with most defensless buildings, then with most points.</i></>,
    'ferocious': 'As Attacker you always have a Maximum Rolled Hits of 3.',
    'fortified': 'Your buildings each take 2 hits to remove in battle. Taking a single hit with a building has no effect.',
    'foundations': <>Cost of Errors now only removes the crown furthest towards the bottom of the minister track <b>matching</b> the clearing in which the buildings were removed.</>,
    'gamble': <>Whenever a plot token would be flipped, the human player with the most pieces in the clearing must first guess the type of token. If correct, the token effect does not trigger and the token is removed after scoring points for flipped tokens, and the player draws a card. If incorrect, gain <OneVP />.</>,
    'garrison': 'Trade Posts are never defenseless and increase your possible Hits by 1 as if they were a warrior.',
    'greedy': <>Gain <OneVP/> when the player with the highest score uses one or more of your services.</>,
    'hates-surprises': 'Ambush cards cannot be played against you.',
    'hospitals': 'At the end of battle as defender, if 2 or more Marquise warriors were removed in the battle, place 1 warrior in the clearing with the keep token.',
    'invaders': <>During the <b>Dig</b> action, target ordered clearings with the most enemy buildings, but the least enemy warriors. If you cannot Build due to no free building slots, battle in all clearings instead.</>,
    'investors': <>When Cost of Errors is triggered by a human player, that player has to discard a card matching the clearing which a building was removed. If they discard a matching card, lose 1 victory point. If they can't, immediately sway a Minister matching the clearing.</>,
    'involved': "If a human player did not buy your Mercenary services on their turn, your warriors belong to all other players for rule and battle purposes as if the player's oppenents bought the Mercenaries service. Vagabond can buy Mercenaries to avoid this, but does not gain the benefits of the service",
    'iron-will': <><b>Expand</b> may happen twice per turn instead of only once.</>,
    'lords-of-the-forest': 'You rule any clearings where you are tied in presence.',
    'market': 'The Market is a row of five cards visible to all players. While players can freely look at the cards at all times, the order of the Market has to be maintained as new cards are added to the right side.',
    'martyrs': 'Whenever you perform a ritual for a Bird card in Daylight, move an aditional warrior from the supply to your Acolytes.',
    'mastermind': 'Perform "Plot" twice each turn.',
    'nimble': 'You can move regardless of who rules your clearing.',
    'nobility': 'Turmoil is now triggered if you are unable to place a roost or if you are unable to place a warrior. Whenever you fall into Turmoil, you do not lose victory points. Instead, you score on victory pount per Bird card in the Decree.',
    'overwhelm': <>The <b>Dig</b> action requires and moves only 3 warriors (instead of 4), and is repeated a second time each turn.</>,
    'pilgrims': 'You rule any clearing where you have any gardens.',
    'poor-manual-dexterity': <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <OneVP />.</>,
    'popularity': 'Enemies can only score on victory point per turn for removing your sympathy tokens.',
    'relentless': 'After resolving the Decree, remove all defenseless buildings and tokens in any clearing where you have warriors.',
    'robot-revenge': "When 1 or more of your warriors are removed during another player's turn, place 1 of them into the Acolytes Box.",
    'spiteful': <>Whenever you <b>Crusade</b>, score <OneVP /> if you removed at least 1 token in any clearing.</>,
    'swoop': 'At the end of Daylight, recruit 2 warriors in the highest priority clearing in which you have no pieces.',
    'the-keep': 'Only you can place pieces in the clearing with the keep token.',
    'vendetta': 'Whenever any token is flipped, it has the immediate effect of a Bomb',
    'veterans': <>In battle as defender, use the same die result as the attacker. <i>(both players use the higher die to determine hits rolled)</i></>,
    'war-tax': <>Whenever you destroy a token or building, the owner of the token loses 1 victory point.</>,
    'wildfire': <>A the end of evening, <b>Spread Sympathy</b>. Do not score victory points for placing this sympathy token.</>
}

export default  function Trait({id, faction, name, isDefault, isEnabled, isSetup, onUpdate }) {
    if (isSetup && !isEnabled) {
        return null;
    }

    const accentColor = getFactionColor(faction); 

    return (
        <label htmlFor={`${faction}-${id}`} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
            {!isSetup && (<input id={`${faction}-${id}`} type="checkbox" style={{accentColor}} checked={isEnabled} disabled={isDefault}  onChange={() => onUpdate(!isEnabled)}/>)}
            <div>
                <div><b>{name}</b></div>
                <div>{traitIdDescriptionMap[id]}</div>
            </div>
        </label>
    );
}