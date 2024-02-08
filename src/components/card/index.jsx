
export default function Card ({ title = "", headerColor = 'black', headerBackgroundColor = 'transparent', children}) {
    return <div style={{ marginBottom: '0.5rem', border: '1px solid black', borderRadius: '4px'}}>
        <div style={{padding: `1rem 1rem ${headerBackgroundColor === 'transparent' ? '0' : '1rem'} 1rem`, color: headerColor, backgroundColor: headerBackgroundColor, marginBottom: '1rem', borderRadius: '4px 4px 0 0'}}>
            <h3>{title}</h3>
        </div>
        <div style={{padding: '0 1rem 1rem 1rem'}}>
            {children}
        </div>
    </div>
}