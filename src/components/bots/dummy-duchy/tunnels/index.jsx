import Tunnel from '../../../../assets/tunnel.png';

export default function Tunnels({tunnels, onUpdateTunnels}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}>
                <div style={{minWidth: '80px'}}>Tunnels</div>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', maxWidth: '400px'}}>
                    {tunnels.map(({id, isPlaced}, index) => (
                        <div key={id} style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {
                            const before = tunnels.slice(0,index);
                            const after = tunnels.slice(index + 1);
                            onUpdateTunnels([...before, {...tunnels[index], isPlaced: !isPlaced}, ...after])
                        }}>
                        <img key={id} src={Tunnel} width="100%" alt='tunnel' style={{opacity: isPlaced ? '50%': '100%'}}/>
                        <div style={{
                                width: '100%',
                                height: '100%',
                                border: `4px solid ${isPlaced ? '#d2a88d': 'transparent'}`,
                                borderRadius: '100%',
                                position: 'absolute',
                                boxSizing: 'border-box',
                                top: 0,
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>
    )
}