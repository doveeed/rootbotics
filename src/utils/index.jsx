
export const CONSTANTS = {
    eyrieNobilityText: <div style={{paddingLeft: '26px'}}><b>(Nobility)</b> If you cannot place a warrior, you fall into Turmoil.</div>,
    eyrieWarTaxText:  <div style={{paddingLeft: '26px'}}><b>(War Tax)</b> If you remove a token or building, the owner of the token or building loses 1 victory point.</div>,
    humanRiverfolkLabelText: 'Check this box if there is a human Riverfolk player in the game',
    riverfolkHandCardText: <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do and the order card has no available craftable item, buy a card with an available craftable item from the Riverfolk Market and replace the order card. If multiple cards exist, pick the one with the most VP for the item. If multiple, choose randomly.</div>,
    riverfolkMercenariesBattleText: <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do, you have 2 or fewer warriors there, the Riverfolk is not the defender, and at least 1 Riverfolk warrior is present, then buy Mercenaries.</div>,
    riverfolkMercenariesBuildText: <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do and buying Mercenaries would allow you to rule and build, buy Mercenaries.</div>,
    riverfolkRiverBoatsText: <div style={{paddingLeft: '26px'}}><b>(Riverfolk)</b> If the Riverfolk player does not have more victory points than you do, treat rivers as paths. If at least one move would use the river, then buy River Boats.</div>,
}

export function getFactionColor(faction) {
    let color = 'black';

    switch (faction) {
        case 'dc-mechanical-marquise-2point0':
            color = '#e27b38';
            break;
        case 'dc-electric-eyrie':
            color = '#406eb1';
            break;
        case 'dc-automated-alliance':
            color = '#6db456';
            break;
        case 'cogwheel-cult':
            color = '#f4e274';
            break;
        case 'rivetfolk-company':
            color = '#56c3bc';
            break;
        case 'dummy-duchy':
            color = '#e5bc9d';
            break;
        case 'contraption-conspiracy':
            color = '#3c2d90';
            break;
        default:
            break;
    }
    return color;
}