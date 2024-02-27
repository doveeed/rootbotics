import Marquise from '../assets/marquise.png';
import Eyrie from '../assets/eyrie.png';
import Alliance from '../assets/alliance.png';
import Vagabot from '../assets/vagabot.png';
import Cult from '../assets/cult.png';
import Rivetfolk from '../assets/rivetfolk.png';
import Duchy from '../assets/duchy.png';
import Conspiracy from '../assets/conspiracy.png';

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
            color = '#d17131';
            break;
        case 'dc-electric-eyrie':
            color = '#3764a2';
            break;
        case 'dc-automated-alliance':
            color = '#5da84c';
            break;
        case 'dc-vagabot':
            color = 'black';    
            break;
        case 'cogwheel-cult':
            color = '#e0d92a';
            break;
        case 'rivetfolk-company':
            color = '#54b4ac';
            break;
        case 'dummy-duchy':
            color = '#e6bf9e';
            break;
        case 'contraption-conspiracy':
            color = '#4c246c';
            break;
        default:
            break;
    }
    return color;
}

export function getFactionName(faction) {
    switch (faction) {
        case 'dc-mechanical-marquise-2point0':
            return "DC M. Marquise 2.0";
        case 'dc-electric-eyrie':
            return "DC Electric Eyrie";
        case 'dc-automated-alliance':
            return "DC Automated Alliance";
        case 'dc-vagabot':
            return 'DC Vagabot';
        case 'cogwheel-cult':
            return "Cogwheel Cult";
        case 'rivetfolk-company':
            return "Rivetfolk Company";
        case 'dummy-duchy':
            return "Dummy Duchy";
        case 'contraption-conspiracy':
            return "Contraption Conspiracy";
        default:
            return '';
    }
}

export function getFactionFontColor(faction) {
    switch (faction) {
        case 'dc-mechanical-marquise-2point0':
            return 'black';
        case 'dc-electric-eyrie':
        case 'dc-automated-alliance':
        case 'dc-vagabot':
            return 'white';
        case 'cogwheel-cult':
        case 'rivetfolk-company':
        case 'dummy-duchy':
            return 'black';
        case 'contraption-conspiracy':
            return 'white'
        default:
            return 'black';
    }
}

export function getFactionImageSrc(faction) {
    switch (faction) {
        case 'dc-mechanical-marquise-2point0':
            return Marquise;
        case 'dc-electric-eyrie':
            return Eyrie;
        case 'dc-automated-alliance':
            return Alliance;
        case 'dc-vagabot':
            return Vagabot;
        case 'cogwheel-cult':
            return Cult;
        case 'rivetfolk-company':
            return Rivetfolk;
        case 'dummy-duchy':
            return Duchy;
        case 'contraption-conspiracy':
            return Conspiracy;
        default:
            return undefined;
    }
}

export function getRandomKey() {
    return `${Math.random(10)}${Math.random(10)}${Math.random(10)}`;
}