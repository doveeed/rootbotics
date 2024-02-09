import Card from "../../../card";
import MouseGarden from '../../../../assets/mouse-garden.png';
import RabbitGarden from '../../../../assets/rabbit-garden.png';
import FoxGarden from '../../../../assets/fox-garden.png';

export default function Gardens({gardens, onUpdateGardens} ) {
    const {mouse = [], rabbit = [], fox = []} = gardens;
    const handleClick = ({index, type}) => {
        const garden = gardens[type][index];
        const before = gardens[type].slice(0,index);
        const after = gardens[type].slice(index + 1);
            onUpdateGardens({mouse, rabbit, fox, [type]: [...before, { ...garden, isPlaced: !garden.isPlaced }, ...after]});
    } 

    return (
        <Card title="Gardens">
            <div>
                <div style={{marginBottom: '1rem'}}><i>When a garden is removed from the map, discard the top card in your Lost Souls.</i></div>
                <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem', width: '100%'}}>{mouse.map(({id, type, isPlaced, points}, index) => {
                    return (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%'}} src={MouseGarden} width="100%" alt="mouse garden" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '2rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? '#f4e274' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    );
                })}</div>
                 <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem', width: '100%'}}>{rabbit.map(({id, type, isPlaced, points}, index) => {
                    return (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%'}} src={RabbitGarden} width="100%" alt="rabbit garden" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '2rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? '#f4e274' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    );
                })}</div>
                <div style={{display: "flex", gap: '1rem', flexWrap: "wrap", marginBottom: '1rem', width: '100%'}}>{fox.map(({id, type, isPlaced, points}, index) => {
                    return (
                        <div  key={id} style={{position: "relative", cursor: "pointer", display: 'flex', flex: '1'}} onClick={() => handleClick({index, type})}>
                            <img style={{opacity: isPlaced ? '50%' : '100%'}} src={FoxGarden} width="100%" alt="fox garden" />
                            <div style={{width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box', alignItems: "center", justifyContent: 'center', 
                                fontSize: '2rem',
                                fontWeight: 'bold', borderRadius: '15%', border: `4px solid ${isPlaced ? '#f4e274' : 'transparent'}`,position: "absolute", top: 0}}>{isPlaced && (<>+{points}</>)}</div>
                        </div>
                    );
                })}</div>
            </div>
        </Card>
    );
}