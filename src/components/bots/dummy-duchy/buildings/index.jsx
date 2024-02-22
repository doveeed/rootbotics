import Citadel1 from '../../../../assets/citadel1.png';
import Citadel2 from '../../../../assets/citadel2.png';
import CitadelBuilding from '../../../../assets/citadel-building.png';
import Market from '../../../../assets/market.png'
import MarketBuilding from '../../../../assets/market-building.png';
import { useSettings } from '../../../../hooks/use-settings';

export default function Buildings({buildings, onUpdateBuildings}) {
    const {factionColor } = useSettings();

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
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', maxWidth: '400px'}}>
                    {buildings.filter(({type}) => type === 'citadel').map(({id, isPlaced}, index) => (
                        <div key={id} style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {handleClick(id)}}>
                        <img key={id} src={isPlaced ? index < 2 ? Citadel1: Citadel2 : CitadelBuilding} width="100%" alt='citadel'/>
                        <div style={{
                                width: '100%',
                                height: '100%',
                                border: `4px solid ${isPlaced ? factionColor: 'transparent'}`,
                                borderRadius: '15%',
                                position: 'absolute',
                                boxSizing: 'border-box',
                                top: 0,
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: '80px'}}>Markets</div>
                <div style={{display: 'flex', gap: '1rem', maxWidth: '400px'}}>
                    {buildings.filter(({type}) => type === 'market').map(({id, isPlaced}) => (
                        <div key={id} style={{position: 'relative', cursor: 'pointer', display: 'flex', flex: '1'}} onClick={() => {handleClick(id)}}>
                        <img key={id} src={isPlaced ? Market : MarketBuilding} width="100%" title="market" alt='market'/>
                        <div style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                border: `4px solid ${isPlaced ? factionColor: 'transparent'}`,
                                borderRadius: '15%',
                                top: 0,
                                boxSizing: 'border-box',
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BuildingsPreview({buildings}) {
    const {factionColor } = useSettings();
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '1rem auto'}}>
            <div style={{display: 'flex', gap: '0.25rem',}}>
                    {buildings.filter(({type}) => type === 'citadel').map(({id, isPlaced}, index) => (
                        <div key={id} style={{position: 'relative', display: 'flex', flexGrow: '0', width: '2rem'}}>
                        <img key={id} src={isPlaced ? index < 2 ? Citadel1: Citadel2 : CitadelBuilding} width="100%" alt='citadel'/>
                        <div style={{
                                width: '100%',
                                height: '100%',
                                border: `2px solid ${isPlaced ? factionColor: 'transparent'}`,
                                borderRadius: '15%',
                                position: 'absolute',
                                boxSizing: 'border-box',
                                top: 0,
                            }}></div>
                        </div>
                    ))}
            </div>
            <div style={{display: 'flex', gap: '0.25rem'}}>
                {buildings.filter(({type}) => type === 'market').map(({id, isPlaced}) => (
                    <div key={id} style={{position: 'relative', display: 'flex', flexGrow: '0', width: '2rem'}}>
                    <img key={id} src={isPlaced ? Market : MarketBuilding} width="100%" title="market" alt='market'/>
                    <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            border: `2px solid ${isPlaced ? factionColor: 'transparent'}`,
                            borderRadius: '15%',
                            top: 0,
                            boxSizing: 'border-box',
                        }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}