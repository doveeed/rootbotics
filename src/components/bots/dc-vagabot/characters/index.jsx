import { useSettings } from "../../../../hooks/use-settings";
import Card from "../../../card";

export default function Characters({characters, selectedCharacter, onChangeCharacter}) {
    const {factionColor} = useSettings();

    return (
        <Card title="Characters">
            {Object.values(characters).map(({id, name, special}) => (
                 <label htmlFor={id} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
                    <input id={id} type="checkbox" style={{accentColor: factionColor}} checked={selectedCharacter === id}  onChange={() => onChangeCharacter(id)}/>
                    <div>
                        <div><b>{name}</b></div>
                        <div>{special}</div>
                    </div>
                </label>
            ))}
        </Card>
    );
}