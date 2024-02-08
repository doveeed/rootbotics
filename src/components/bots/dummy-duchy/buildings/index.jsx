import Citadel1 from '../../../../assets/citadel1.png';
import Citadel2 from '../../../../assets/citadel2.png';
import CitadelBuilding from '../../../../assets/citadel-building.png';
import Market from '../../../../assets/market.png'
import MarketBuilding from '../../../../assets/market-building.png';
export default function Buildings({buildings, onUpdateBuildings}) {

    const handleClick = (id) => {
        const index = buildings.findIndex(({id: buildingId}) => buildingId === id);
        const building = buildings[index];

        const before = buildings.slice(0,index);
        const after = buildings.slice(index + 1);
        onUpdateBuildings([...before, { ...building, isPlaced: !building.isPlaced}, ...after])

    }
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: '80px'}}>Citadels</div>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    {buildings.filter(({type}) => type === 'citadel').map(({id, isPlaced}, index) => (
                        <div key={id} style={{position: 'relative', cursor: 'pointer'}} onClick={() => {handleClick(id)}}>
                        <img key={id} 
                        
                        src={isPlaced ? index < 2 ? Citadel1: Citadel2 : CitadelBuilding} height={80} width={80} title="citadel" alt='citadel'/>
                        <div style={{
                                width: '72px',
                                height: '72px',
                                border: `4px solid ${isPlaced ? '#d2a88d': 'transparent'}`,
                                borderRadius: '12px',
                                position: 'absolute',
                                top: 0,
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: '80px'}}>Markets</div>
                <div style={{display: 'flex', gap: '1rem'}}>
                    {buildings.filter(({type}) => type === 'market').map(({id, isPlaced}) => (
                        <div key={id} style={{position: 'relative', cursor: 'pointer'}} onClick={() => {handleClick(id)}}>
                        <img key={id} 
                        
                        src={isPlaced ? Market : MarketBuilding} height={80} width={80} title="market" alt='market'/>
                        <div style={{
                                width: '72px',
                                height: '72px',
                                border: `4px solid ${isPlaced ? '#d2a88d': 'transparent'}`,
                                borderRadius: '12px',
                                position: 'absolute',
                                top: 0,
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}