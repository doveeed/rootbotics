import { useState } from "react";
import Number from "../number";
import Mole from '../../assets/mole.png';

export default function Menu ({bots, onAddBot = () => {}}) {
    const botFactions = bots.map(bot => bot.faction);
    const options = [
        {faction: 'cogwheel-cult', name: 'Cogwheel Cult'},
        {faction: 'rivetfolk-company', name: 'Rivetfolk Company'},
        {faction: 'dummy-duchy', name: 'Dummy Duchy'},
        {faction: 'contraption-conspiracy', name: 'Contraption Conspiracy'},
    ];
    const [isOpen, setIsOpen] = useState(false);

    const addBot = (faction) => {
        const key = `${Math.random(10)}${Math.random(10)}${Math.random(10)}`;
        let bot = {
            key,
            faction,
            state: {
                isSetup: false, 
                orderedSuit: 'bird',
                isHumanRiverfolk: false,
            }
        }
        switch(faction) {
            case 'cogwheel-cult':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        level: 'expert',
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                                description: <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <Number value={1} />.</>
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                                description: 'Ambush cards cannot be played against you.'
                            },
                            {
                                id: 'pilgrims',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Pilgrims',
                                description: 'You rule any clearing where you have any gardens.'
                            },
                            {
                                id: 'robot-revenge',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Robot Revenge',
                                description: "When one or more of your warriors are removed during another player's turn, place one of them into the Acolytes Box."
                            },
                            {
                                id: 'spiteful',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Spiteful',
                                description: <>Whenever you <b>Crusade</b>, score one victory point if you removed at least one token in any clearing.</>,
                            },
                            {
                                id: 'erratic',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Erratic',
                                description: 'At the beginning of your turn, add the top card of the deck to the Lost Souls.'
                            },
                            {
                                id: 'fanatics',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Fanatics',
                                description: <>Whenever you <b>Convert</b>, also battle in that clearing dealing an extra hit. <i><b>Player Tie:</b> Target palyer with most defensless buildings, then with most points.</i></>,
                            },
                            {
                                id: 'martyrs',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Martyrs',
                                description: 'Whenever you perform a ritual for a Bird card in Daylight, move an aditional warrior from the supply to your Acolytes.',
                            },
                        ],
                        conspiracyIndex: 4,
                        gardens: {
                            mouse: [{id: 'mouse-1', type: 'mouse', isPlaced: false, points: 0},{id: 'mouse-2', type: 'mouse', isPlaced: false, points: 2},{id: 'mouse-3', type: 'mouse', isPlaced: false, points: 2},{id: 'mouse-4', type: 'mouse', isPlaced: false, points: 3},{id: 'mouse-5', type: 'mouse', isPlaced: false, points: 4}],
                            rabbit: [{id: 'rabbit-1', type: 'rabbit', isPlaced: false, points: 0},{id: 'rabbit-2', type: 'rabbit', isPlaced: false, points: 2},{id: 'rabbit-3', type: 'rabbit', isPlaced: false, points: 2},{id: 'rabbit-4', type: 'rabbit', isPlaced: false, points: 3},{id: 'rabbit-5', type: 'rabbit', isPlaced: false, points: 4}],
                            fox: [{id: 'fox-1', type: 'fox', isPlaced: false, points: 0},{id: 'fox-2', type: 'fox', isPlaced: false, points: 2},{id: 'fox-3', type: 'fox', isPlaced: false, points: 2},{id: 'fox-4', type: 'fox', isPlaced: false, points: 3},{id: 'fox-5', type: 'fox', isPlaced: false, points: 4}],
                        }
                    }
                }
                break;
            case 'contraption-conspiracy':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        level: 'expert',
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                                description: <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <Number value={1} />.</>
                            },
                            {
                                id: 'nimble',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Nimble',
                                description: 'You can move regardless of who rules your clearing.'
                            },
                            {
                                id: 'embedded-agents',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Embedded Agents',
                                description: 'In battle as defender with a facedown plot token, you deal an extra hit.'
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                                description: 'Ambush cards cannot be played against you.'
                            },
                            {
                                id: 'gamble',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Gamble',
                                description: <>Whenever a plot token would be flipped, the human player with the most pieces in the clearing must first guess the type of token. If correct, the token effect does not trigger and the token is removed after scoring points for flipped tokens, and the player draws a card. If incorrect, gain <Number value={1}/> </>
                            },
                            {
                                id: 'backup-plans',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Backup Plans',
                                description: 'When one of your tokens is removed, place a warrior from your supply into the clearing wich contained the token.',
                            },
                            {
                                id: 'mastermind',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Mastermind',
                                description: 'Perform "Plot" twice each turn.'
                            },
                            {
                                id: 'vendetta',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Vendetta',
                                description: 'Whenever any token is flipped, it has the immediate effect of a Bomb'
                            }
                        ],
                        plots: [
                            {type: 'bomb', flipped: false, key: 'bomb-1'},
                            {type: 'bomb', flipped: false, key: 'bomb-2'},
                            {type: 'snare', flipped: false, key: 'snare-1'},
                            {type: 'snare', flipped: false, key: 'snare-2'},
                            {type: 'extortion', flipped: false, key: 'extortion-1'},
                            {type: 'extortion', flipped: false, key: 'extortion-2'},
                            {type: 'raid', flipped: false, key: 'raid-1'},
                            {type: 'raid', flipped: false, key: 'raid-2'},
                        ],
                    }
                    
                }
                break;
            case 'dummy-duchy':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        level: 'expert',
                        traits: [
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                                description: 'Ambush cards cannot be played against you.'
                            },
                            {
                                id: 'cost-of-errors',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Cost of Errors',
                                description: 'Whenever any number of Duchy buildings are removed, remove the crown furthest towards the bottom of the minister track.'
                            },
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                                description: <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <Number value={1} />.</>
                            },
                            {
                                id: 'foundations',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Foundations',
                                description: <>Cost of Errors now only removes the crown furthest towards the bottom of the minister track <b>matching</b> the clearing in which the buildings were removed.</>
                            },
                            {
                                id: 'investors',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Investors',
                                description: <>When Cost of Errors is triggered by a human player, that player has to discard a card matching the clearing which a building was removed. If they discard a matching card, lose one victory point. If they can't, immediately sway a Minister matching the clearing.</>
                            },
                            {
                                id: 'overwhelm',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Overwhelm',
                                description: 'The Dig action requires and moves only there warriors (instead of four), and is repeated a second time each turn.'
                            },
                            {
                                id: 'invaders',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Invaders',
                                description: 'During the Dig action, target ordered clearings with the most enemy buildings, but the least enemy warriors. If you cannot Build due to no free building slots, battle in all clearings instead.'
                            },

                        ],
                        ministers: [
                            {
                                name: 'Captain',
                                suit: 'fox',
                                action: 'As attacker, deal an extra hit in clearings with a tunnel.',
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Marshal',
                                suit: 'rabbit',
                                action: 'Place a warrior from your supply into such a clearing that has at least one of your buildings and the least of your warriors.',
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Foremole',
                                suit: 'mouse',
                                action: <>You have an additional revealed <img src={Mole} alt="Duchy warrior" height={24} width={24} style={{marginBottom: '-6px'}}/> </>,
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Brigadier',
                                suit: 'fox',
                                action: 'Repeat the Dig Action if there are at least 3 warriors in the burrow, targeting the clearing with the most enemy buildings and tokens.',
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Banker',
                                suit: 'rabbit',
                                action: 'Repeat the Build Action',
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Mayor',
                                suit: 'mouse',
                                action: <>Return a warrior to your supplf from the clearing you rule with the most of your warriors Score <Number value={1} />.</>,
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Earl of Stone',
                                suit: 'fox',
                                action: <>Score <Number value={1} /> per citadel on the map.</>,
                                level: 3,
                                isSwayed: false,
                            },
                            {
                                name: 'Baron of Dirt',
                                suit: 'rabbit',
                                action: <>Score <Number value={1} /> per market on the map.</>,
                                level: 3,
                                isSwayed: false,
                            },
                            {
                                name: 'Duchess of Mud',
                                suit: 'mouse',
                                action: <>Score <Number value={2} /> if all tunnels are on the map.</>,
                                level: 3,
                                isSwayed: false,
                            }
                        ],
                        buildings: [{
                            id: 'citadel-1',
                            type: 'citadel',
                            isPlaced: false,
                        },{
                            id: 'citadel-2',
                            type: 'citadel',
                            isPlaced: false,
                        },{
                            id: 'citadel-3',
                            type: 'citadel',
                            isPlaced: false,
                        },{
                            id: 'market-1',
                            type: 'market',
                            isPlaced: false,
                        },{
                            id: 'market-2',
                            type: 'market',
                            isPlaced: false,
                        },{
                            id: 'market-3',
                            type: 'market',
                            isPlaced: false,
                        }],
                    }
                }
                break;
            case 'rivetfolk-company':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        level: 'expert',
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                                description: <>You have no hand of cards. You cannot discard cards. If a human would take a card from you, they draw a card instead. If a human would give a card to you, they discard it, and you score <Number value={1} />.</>
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                                description: 'Ambush cards cannot be played against you.'
                            },
                            {
                                id: 'market',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Market',
                                description: 'The market is a row of five cards visible to all players. While players can freely look at the cards at all times, the order of the market has to be maintained as new cards are added to the right side.'
                            },
                            {
                                id: 'greedy',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Greedy',
                                description: <>Grain <Number value={1} /> when the player with the highest score uses one or more of your services.</>
                            },
                            {
                                id: 'involved',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Involved',
                                description: "If a human player did not buy your Mercenary services on their turn, your warriors belong to all other players for rule and battle purposes as if the player's oppenents bought the Mercenary ServiceWorker. Vagabond can buy Mercenaries to avoid this, but does not gain the benefits of the service"
                            },
                            {
                                id: 'garrison',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Garrison',
                                description: 'Trade Posts are never defenseless and increase your possible Hits by 1 as if they were a warrior.'
                            },
                            {
                                id: 'ferocious',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Ferocious',
                                description: 'As Attacker you always have a Maximum Rolled Hits of three.'
                            },
                        ],
                        tradeposts: {
                            mouse: [
                                {id: 'mouse-1', type: 'mouse', points: 0, isPlaced: false},
                                {id: 'mouse-2', type: 'mouse', points: 1, isPlaced: false},
                                {id: 'mouse-3', type: 'mouse', points: 2, isPlaced: false}
                            ],
                            rabbit: [
                                {id: 'rabbit-1', type: 'rabbit', points: 0, isPlaced: false},
                                {id: 'rabbit-2', type: 'rabbit', points: 1, isPlaced: false},
                                {id: 'rabbit-3', type: 'rabbit', points: 2, isPlaced: false}
                            ],
                            fox: [
                                {id: 'fox-1', type: 'fox', points: 0, isPlaced: false},
                                {id: 'fox-2', type: 'fox', points: 1, isPlaced: false},
                                {id: 'fox-3', type: 'fox', points: 2, isPlaced: false}
                            ],
                        }
                    }
                }
                break;
            default:
                break;
        }
        onAddBot(bot);
    }
    
    const filteredOptions = options.filter(({faction})=> !botFactions.includes(faction));

    return (
        <div style={{position: "relative"}}>
            <button 
            style={{background: 'none', border: 'none', cursor: "pointer"}}
             disabled={filteredOptions.length === 0}
            onClick={()=> setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} fill="black"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path></svg>
            </button>
            {isOpen && (
                <div style={{ position: "absolute", right: '0', width: '200px', backgroundColor: 'white', cursor: "pointer"}}>
                    {filteredOptions.map(({faction, name}, index) => (
                        <div key={`${faction}-${index}`} onClick={() => {
                            setIsOpen(false)
                            addBot(faction)}
                        }>{name}</div>
                    ))}
                </div>
            )}
        </div>
    )

}