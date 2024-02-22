import { useSettings } from "../../hooks/use-settings"

export default function Header({ isSetup, onChangeSetup, onDelete}) {
    const {factionColor, name, fontColor} = useSettings();
    
    return (
        <div style={{
            color: fontColor,
            padding: '16px 8px',
            backgroundColor: factionColor,
            display: 'flex',
            flexDirection: 'row',
            position: 'sticky',
            top: '80px',
            zIndex: 1
        }}>
            <div style={{ maxWidth: '740px', margin: '0 auto', width: '100%', display: 'flex'}}>
            <h2 style={{flex: '1'}}>{name}</h2>
            <button style={{background: 'none', border: 'none', cursor: "pointer"}} onClick={onChangeSetup}>
                {!isSetup
                    ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} fill={fontColor}><path d="M256 48C141.601 48 48 141.601 48 256s93.601 208 208 208 208-93.601 208-208S370.399 48 256 48zm0 374.399c-91.518 0-166.399-74.882-166.399-166.399S164.482 89.6 256 89.6 422.4 164.482 422.4 256 347.518 422.399 256 422.399z"></path></svg>)
                    : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} fill={fontColor}><path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm-42.7 318.9L106.7 260.3l29.9-29.9 76.8 76.8 162.1-162.1 29.9 29.9-192.1 191.9z"></path></svg>)}</button>
            <button style={{background: 'none', border: 'none', cursor: "pointer"}}onClick={onDelete}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} fill={fontColor}><path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"></path></svg></button>
            </div>
        </div>
    )
}