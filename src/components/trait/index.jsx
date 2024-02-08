
export default  function Trait({id, faction, name, description, isDefault, isEnabled, isSetup, onUpdate }) {
    if (isSetup && !isEnabled) {
        return null;
    }

    return (
        <div style={{display: 'flex', alignItems: 'start', marginBottom: '0.5rem'}} >
            {!isSetup && (<input id={`${faction}-${id}`} type="checkbox" checked={isEnabled} disabled={isDefault}  onChange={() => onUpdate(!isEnabled)}/>)}
            <label htmlFor={`${faction}-${id}`}>
                <div><b>{name}</b></div>
                <div>{description}</div>
            </label>
        </div>
    );
}