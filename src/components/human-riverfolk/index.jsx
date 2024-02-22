import { useSettings } from "../../hooks/use-settings";
import Card from "../card";

export default function HumanRiverfolk({isHumanRiverfolk,  onChange}) {
    const {faction, factionColor} = useSettings();

    return (
        <Card title="Human Riverfolk">
            <label htmlFor={`${faction}-human-riverfolk`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                <input id={`${faction}-human-riverfolk`} type="checkbox" onChange={() => onChange(!isHumanRiverfolk)} checked={isHumanRiverfolk} style={{accentColor: factionColor}} />
                <div>Check this box if there is a human Riverfolk player in the game.</div>
            </label>
        </Card>
    )
}