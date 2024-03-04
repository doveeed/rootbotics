import { useSettings } from "../../../../hooks/use-settings";
import { getRandomKey } from "../../../../utils";
import Card from "../../../card";

export default function Characters({characters, selectedCharacter, onChangeCharacter}) {
    const {factionColor} = useSettings();

    const handleUpdateCharacter = (id) => {
        let items = [{key: getRandomKey(), isExausted: false, isDamaged: false}, {key: getRandomKey(), isExausted: false, isDamaged: false}, {key: getRandomKey(), isExausted: false, isDamaged: false}, {key: getRandomKey(), isExausted: false, isDamaged: false}]
        
        if (id === 'tinker') {
            items = [...items.slice(0, -1)];
        }
        
        onChangeCharacter({character: id, items})
    }

    return (
        <Card title="Characters">
            {Object.values(characters).map(({id, name, special}) => (
                 <label htmlFor={id} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', cursor: 'pointer'}} >
                    <input id={id} type="checkbox" style={{accentColor: factionColor}} checked={selectedCharacter === id}  onChange={() => handleUpdateCharacter(id)}/>
                    <div>
                        <div><b>{name}</b></div>
                        <div>{special}</div>
                    </div>
                </label>
            ))}
        </Card>
    );
}