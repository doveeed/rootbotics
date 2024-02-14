import { getFactionColor } from "../../utils";
import Card from "../card";

export default function HumanRiverfolk({isHumanRiverfolk, faction, onChange}) {
    const accentColor = getFactionColor(faction);

    return (
        <Card title="Human Riverfolk">
            <label htmlFor={`${faction}-human-riverfolk`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                <input id={`${faction}-human-riverfolk`} type="checkbox" onChange={() => onChange(!isHumanRiverfolk)} checked={isHumanRiverfolk} style={{accentColor}} />
                <div>Check this box if there is a human Riverfolk player in the game.</div>
            </label>
        </Card>
    )
}