import Number from "../number";

const traitIdDescriptionMap = {
    'backup-plans': 'When one of your tokens is removed, place a warrior from your supply into the clearing wich contained the token.',
    'cost-of-errors': 'Whenever any number of Duchy buildings are removed, remove the crown furthest towards the bottom of the minister track.',
    'embedded-agents': 'In battle as defender with a facedown plot token, you deal an extra hit.',
    'erratic': 'At the beginning of your turn, add the top card of the deck to the Lost Souls.',
    'fanatics': <>Whenever you <b>Convert</b>, also battle in that clearing dealing an extra hit. <i><b>Player Tie:</b> Target palyer with most defensless buildings, then with most points.</i></>,
    'ferocious': 'As Attacker you always have a Maximum Rolled Hits of three.',
    'fortified': 'Your buildings each take two hits to remove in battle. Taking a single hit with a building has no effect',
    'foundations': <>Cost of Errors now only removes the crown furthest towards the bottom of the minister track <b>matching</b> the clearing in which the buildings were removed.</>,
    'gamble': <>Whenever a plot token would be flipped, the human player with the most pieces in the clearing must first guess the type of token. If correct, the token effect does not trigger and the token is removed after scoring points for flipped tokens, and the player draws a card. If incorrect, gain <Number value={1}/> </>,
    'garrison': 'Trade Posts are never defenseless and increase your possible Hits by 1 as if they were a warrior.',
    'greedy': <>Grain <Number value={1} /> when the player with the highest score uses one or more of your services.</>,
    'hates-surprises': 'Ambush cards cannot be played against you.',
    'hospitals': 'At the end of battle as defender, if two or more Marquise warriors were removed in the battle, place one warrior in the clearing with the keep token.',
    'invaders': 'During the Dig action, target ordered clearings with the most enemy buildings, but the least enemy warriors. If you cannot Build due to no free building slots, battle in all clearings instead.',
    'investors': <>When Cost of Errors is triggered by a human player, that player has to discard a card matching the clearing which a building was removed. If they discard a matching card, lose one victory point. If they can't, immediately sway a Minister matching the clearing.</>,
    'involved': "If a human player did not buy your Mercenary services on their turn, your warriors belong to all other players for rule and battle purposes as if the player's oppenents bought the Mercenary ServiceWorker. Vagabond can buy Mercenaries to avoid this, but does not gain the benefits of the service",
    'iron-will': <><b>Expand</b> may happen twice per turn instead of only once.</>,
    'market': 'The market is a row of five cards visible to all players. While players can freely look at the cards at all times, the order of the market has to be maintained as new cards are added to the right side.',
    'martyrs': 'Whenever you perform a ritual for a Bird card in Daylight, move an aditional warrior from the supply to your Acolytes.',
    'mastermind': 'Perform "Plot" twice each turn.',
    'nimble': 'You can move regardless of who rules your clearing.',
    'overwhelm': 'The Dig action requires and moves only there warriors (instead of four), and is repeated a second time each turn.',
    'pilgrims': 'You rule any clearing where you have any gardens.',
    'poor-manual-dexterity': <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <Number value={1} />.</>,
    'spiteful': <>Whenever you <b>Crusade</b>, score one victory point if you removed at least one token in any clearing.</>,
    'robot-revenge': "When one or more of your warriors are removed during another player's turn, place one of them into the Acolytes Box.",
    'the-keep': 'Only you can place pieces in the clearing with the keep token.',
    'vendetta': 'Whenever any token is flipped, it has the immediate effect of a Bomb',
}

export default  function Trait({id, faction, name, description, isDefault, isEnabled, isSetup, onUpdate }) {
    if (isSetup && !isEnabled) {
        return null;
    }

    return (
        <div style={{display: 'flex', alignItems: 'start', marginBottom: '0.5rem'}} >
            {!isSetup && (<input id={`${faction}-${id}`} type="checkbox" checked={isEnabled} disabled={isDefault}  onChange={() => onUpdate(!isEnabled)}/>)}
            <label htmlFor={`${faction}-${id}`}>
                <div><b>{name}</b></div>
                <div>{traitIdDescriptionMap[id]}</div>
            </label>
        </div>
    );
}