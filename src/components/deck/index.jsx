import { useSettings } from "../../hooks/use-settings"
import Card from "../card";


export default function Deck({deck, onUpdateDeck}) {
    const {faction, factionColor: accentColor} = useSettings();

    return (
        <Card title="Deck">
            <label htmlFor={`${faction}-standard`} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
                <input id={`${faction}-standard`} type="checkbox" checked={deck === 'standard'}  onChange={() => onUpdateDeck('standard')} style={{accentColor}}/>
                <div>
                    <div><b>Standard</b></div>
                    <div>Check this if playing with the Standard Deck</div>
                </div>
            </label>
            <label htmlFor={`${faction}-exiles`} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
                <input id={`${faction}-exiles`} type="checkbox" checked={deck === 'exiles'}  onChange={() => onUpdateDeck('exiles')} style={{accentColor}}/>
                <div>
                    <div><b>Exiles & Partisans</b></div>
                    <div>Check this if playing with the Exiles & Partisans Deck</div>
                </div>
            </label>
        </Card>
    )
}