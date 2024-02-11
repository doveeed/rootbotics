import { useState } from "react";

export default function Menu ({bots, onAddBot = () => {}}) {
    const botFactions = bots.map(bot => bot.faction);
    const options = [
        {faction: 'dc-mechanical-marquise-2point0', name: 'DC Mechanical Marquise 2.0'},
        {faction: 'dc-electric-eyrie', name: 'DC Electric Eyrie'},
        {faction: 'dc-automated-alliance', name: 'DC Automated Alliance'},
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
                level: 'expert',
            }
        }
        switch(faction) {
            case 'cogwheel-cult':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'pilgrims',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Pilgrims',
                            },
                            {
                                id: 'robot-revenge',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Robot Revenge',
                            },
                            {
                                id: 'spiteful',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Spiteful',
                            },
                            {
                                id: 'erratic',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Erratic',
                            },
                            {
                                id: 'fanatics',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Fanatics',
                            },
                            {
                                id: 'martyrs',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Martyrs',
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
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'nimble',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Nimble',
                            },
                            {
                                id: 'embedded-agents',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Embedded Agents',
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'gamble',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Gamble',
                            },
                            {
                                id: 'backup-plans',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Backup Plans',
                            },
                            {
                                id: 'mastermind',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Mastermind',
                            },
                            {
                                id: 'vendetta',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Vendetta',
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
            case 'dc-automated-alliance':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        traits: [
                            {
                                id: 'automated-outrage',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Automated Outrage',
                            },
                            {
                                id: 'automated-ambush',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Automated Ambush',
                            },
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                        ],
                        buildings: {
                            fox: {suit: 'fox', isPlaced: false},
                            rabbit: {suit: 'rabbit', isPlaced: false},
                            mouse: {suit: 'mouse', isPlaced: false},
                        },
                        sympathy: [
                            {
                                id: 'sympathy-1',
                                isPlaced: false,
                                points: 0,
                            },
                            {
                                id: 'sympathy-2',
                                isPlaced: false,
                                points: 1,
                            },
                            {
                                id: 'sympathy-3',
                                isPlaced: false,
                                points: 1,
                            },
                            {
                                id: 'sympathy-4',
                                isPlaced: false,
                                points: 1,
                            },
                            {
                                id: 'sympathy-5',
                                isPlaced: false,
                                points: 1,
                            },
                            {
                                id: 'sympathy-6',
                                isPlaced: false,
                                points: 2,
                            },
                            {
                                id: 'sympathy-7',
                                isPlaced: false,
                                points: 2,
                            },
                            {
                                id: 'sympathy-8',
                                isPlaced: false,
                                points: 3,
                            },
                            {
                                id: 'sympathy-9',
                                isPlaced: false,
                                points: 3,
                            }, 
                            {
                                id: 'sympathy-10',
                                isPlaced: false,
                                points: 4,
                            }
                        ]
                    },
                }
                break;
            case 'dc-electric-eyrie':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        traits: [
                            {
                                id: 'lords-of-the-forest',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Lords of the Forest',
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'nobility',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Nobility',
                            },
                            {
                                id: 'relentless',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Relentless',
                            },
                            {
                                id: 'swoop',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Swoop',
                            },
                            {
                                id: 'war-tax',
                                isDefault: false,
                                isEnabled: false,
                                name: 'War Tax',
                            },
                        ],
                        decree: {
                            fox: 0,
                            mouse: 0,
                            rabbit: 0,
                            bird: 2,
                        },
                        buildings: [
                            {id: 'roost-1', isPlaced: false, points: 0}, 
                            {id: 'roost-2', isPlaced: false, points: 1},
                            {id: 'roost-3', isPlaced: false, points: 2},
                            {id: 'roost-4', isPlaced: false, points: 3},
                            {id: 'roost-5', isPlaced: false, points: 4},
                            {id: 'roost-6', isPlaced: false, points: 5},
                            {id: 'roost-7', isPlaced: false, points: 6}]
                    }
                }
                break;
            case 'dc-mechanical-marquise-2point0':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        traits: [
                            {
                                id: 'the-keep',
                                isDefault: true,
                                isEnabled: true,
                                name: 'The Keep'
                            },
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'hospitals',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Hospitals',
                            },
                            {
                                id: 'iron-will',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Iron Will',
                            },
                            {
                                id: 'fortified',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Fortified',
                            },
                        ],
                        buildings: {
                            sawmill: [{id: 'sawmill-1', type: 'sawmill', isPlaced: false, points: 0}, {id: 'sawmill-2', type: 'sawmill', isPlaced: false, points: 1}, {id: 'sawmill-3', type: 'sawmill', isPlaced: false, points: 2}, {id: 'sawmill-4', type: 'sawmill', isPlaced: false, points: 3}, {id: 'sawmill-5', type: 'sawmill', isPlaced: false, points: 4}, {id: 'sawmill-6', type: 'sawmill', isPlaced: false, points: 5}],
                            workshop: [{id: 'workshop-1', type: 'workshop', isPlaced: false, points: 0}, {id: 'workshop-2', type: 'workshop', isPlaced: false, points: 1}, {id: 'workshop-3', type: 'workshop', isPlaced: false, points: 2}, {id: 'workshop-4', type: 'workshop', isPlaced: false, points: 3}, {id: 'workshop-5', type: 'workshop', isPlaced: false, points: 4}, {id: 'workshop-6', type: 'workshop', isPlaced: false, points: 5}],
                            recruiter: [{id: 'recruiter-1', type: 'recruiter', isPlaced: false, points: 0}, {id: 'recruiter-2', type: 'recruiter', isPlaced: false, points: 1}, {id: 'recruiter-3', type: 'recruiter', isPlaced: false, points: 2}, {id: 'recruiter-4', type: 'recruiter', isPlaced: false, points: 3}, {id: 'recruiter-5', type: 'recruiter', isPlaced: false, points: 4}, {id: 'recruiter-6', type: 'recruiter', isPlaced: false, points: 5}],
                        }
                    }

                }
                break;
            case 'dummy-duchy':
                bot = {
                    ...bot,
                    state: {
                        ...bot.state,
                        traits: [
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'cost-of-errors',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Cost of Errors',
                            },
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'foundations',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Foundations',
                            },
                            {
                                id: 'investors',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Investors',
                            },
                            {
                                id: 'overwhelm',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Overwhelm',
                            },
                            {
                                id: 'invaders',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Invaders',
                            },

                        ],
                        ministers: [
                            {
                                name: 'Captain',
                                suit: 'fox',
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Marshal',
                                suit: 'rabbit',
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Foremole',
                                suit: 'mouse',
                                level: 1,
                                isSwayed: false,
                            },
                            {
                                name: 'Brigadier',
                                suit: 'fox',
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Banker',
                                suit: 'rabbit',
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Mayor',
                                suit: 'mouse',
                                level: 2,
                                isSwayed: false,
                            },
                            {
                                name: 'Earl of Stone',
                                suit: 'fox',
                                level: 3,
                                isSwayed: false,
                            },
                            {
                                name: 'Baron of Dirt',
                                suit: 'rabbit',
                                level: 3,
                                isSwayed: false,
                            },
                            {
                                name: 'Duchess of Mud',
                                suit: 'mouse',
                                level: 3,
                                isSwayed: false,
                            }
                        ],
                        buildings: [{
                            id: 'citadel-1',
                            type: 'citadel',
                            isPlaced: false,
                            recruit: 1,
                        },{
                            id: 'citadel-2',
                            type: 'citadel',
                            isPlaced: false,
                            recruit: 1,
                        },{
                            id: 'citadel-3',
                            type: 'citadel',
                            isPlaced: false,
                            recruit: 2,
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
                        traits: [
                            {
                                id: 'poor-manual-dexterity',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Poor Manual Dexterity',
                            },
                            {
                                id: 'hates-surprises',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Hates Surprises',
                            },
                            {
                                id: 'market',
                                isDefault: true,
                                isEnabled: true,
                                name: 'Market',
                            },
                            {
                                id: 'greedy',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Greedy',
                            },
                            {
                                id: 'involved',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Involved',
                            },
                            {
                                id: 'garrison',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Garrison',
                            },
                            {
                                id: 'ferocious',
                                isDefault: false,
                                isEnabled: false,
                                name: 'Ferocious',
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
    const isHidden = filteredOptions.length === 0;

    return (
        <div style={{position: "relative"}}>
            {!isHidden && (<button 
            style={{background: 'none', border: 'none', cursor: "pointer"}}
            onClick={()=> setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} fill="black"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path></svg>
            </button>)}
            {isOpen && (
                <div style={{ position: "absolute", right: '0', top: '54px', width: '300px', backgroundColor: 'white', cursor: "pointer"}}>
                    {filteredOptions.map(({faction, name}, index) => (
                        <div key={`${faction}-${index}`} style={{padding: '0.5rem'}} onClick={() => {
                            setIsOpen(false)
                            addBot(faction)}
                        }>{name}</div>
                    ))}
                </div>
            )}
        </div>
    )

}