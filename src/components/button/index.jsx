
export default function Button({text, img, alt, onClick, style = {}, children, ...rest}) {
    return (<button {...rest} style={{alignItems: 'center', background: 'none', border: `2px solid ${rest.disabled ? 'darkgray': 'black'}`, borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', fontSize: '0.75rem', fontWeight: 'bold', lineHeight: '1rem', padding: '2px 4px',...style}} onClick={onClick}>{children}{img ? (<img style={{marginLeft: '0.25rem'}} src={img} alt={alt} width={16} height={16} />):''}</button>)
}