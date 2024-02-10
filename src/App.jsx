import { useEffect, useState } from "react";
import ContraptionConspiracy from "./components/bots/contraption-conspiracy";
import Menu from "./components/menu";
import DummyDuchy from "./components/bots/dummy-duchy";
import CogwheelCult from "./components/bots/cogwheel-cult";
import RivetfolkCompany from "./components/bots/rivetfolk-company";
import Rootbotics from './assets/rootbotics.png';
import Fall from './assets/fall.png';
import Winter from './assets/winter.png';
import Lake from './assets/lake.png';
import Mountain from './assets/mountain.png';
import DCMechanicalMarquise2point0 from "./components/bots/dc-mechanical-marquise-2point0";
import DCElectricEyrie from "./components/bots/dc-electric-eyrie";
import DCAutomatedAlliance from "./components/bots/dc-automated-alliance";


function App() {

  const [bots, updateBots] = useState([]);
  const isRivetfolkPlaying = bots.some(({faction}) => faction === 'rivetfolk-company');
  const isNoBots = bots.length === 0;

  useEffect(() => {
    try {
      const bots = JSON.parse(window.localStorage.getItem('bots'));
      if (!bots) {
        return;
      }
      updateBots(bots);
    } catch(e){
      console.error(e);
    }
  }, [])

  const handleUpdateBots = (newBots) => {
    window.localStorage.setItem('bots', JSON.stringify(newBots));
    updateBots(newBots)
  }

  return (
    <div className="App">
      <header style={{display: "flex", flexShrink: 0,alignItems: "center", padding: '0 8px', position: 'sticky', top: 0, backgroundColor: '#fcf8e8', zIndex: 2, height: '80px'}}>
        <h1 style={{flex: '1'}}>
          <div style={{maxWidth: '300px', alignItems: 'center', display: 'flex'}}><img src={Rootbotics} alt="rootbotics logo" width="100%" /></div></h1>
        
        <Menu bots={bots} onAddBot={(newBot) => {handleUpdateBots([...bots, {...newBot}])}} />
      </header>
      <main style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        {isNoBots && (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 'calc(100vh - 80px)'}}>Click + to add a bot.</div>)}
      {bots.map((bot,index) => {
        const {faction, state, key} = bot;
        let Faction;
        switch (faction) {
          case 'cogwheel-cult':
            Faction = CogwheelCult;
            break;
          case 'contraption-conspiracy':
            Faction = ContraptionConspiracy;
            break;
          case 'dc-automated-alliance':
            Faction = DCAutomatedAlliance;
            break;
          case 'dc-electric-eyrie':
            Faction = DCElectricEyrie;
            break;
          case 'dc-mechanical-marquise-2point0':
            Faction = DCMechanicalMarquise2point0;
            break;
          case 'dummy-duchy':
            Faction = DummyDuchy;
            break;
          case 'rivetfolk-company':
            Faction = RivetfolkCompany;
            break;
          default:
            return null;
        }
        return (
          <Faction
            key={key}
            state={state}
            isRivetfolkPlaying={isRivetfolkPlaying}
            onDelete={() => {
              const before = bots.slice(0,index);
              const after = bots.slice(index + 1);
              handleUpdateBots([...before, ...after])
            }}
            updateState={(newState) => {
              const before = bots.slice(0,index);
              const after = bots.slice(index + 1);
              handleUpdateBots([...before,{...bot, state: {...newState}}, ...after])
            }}
          />
        );
      })}
      </main>
      {isNoBots && (
          <div style={{padding: '0.5rem 1rem', display: 'flex',flexDirection: 'column', gap: '2rem', maxWidth: '740px', margin: '0 auto'}}>
           <div>
            <h2 style={{textAlign: 'center'}}>Fall</h2>
            <img src={Fall} width="100%" alt="Fall map clearing priority setup"/>
           </div>
           <div>
            <h2 style={{textAlign: 'center'}}>Winter</h2>
            <img src={Winter} width="100%" alt="Winter map clearing priority setup"/>
           </div>
           <div>
            <h2 style={{textAlign: 'center'}}>Lake</h2>
            <img src={Lake} width="100%" alt="Lake map clearing priority setup"/>
           </div>
           <div>
            <h2 style={{textAlign: 'center'}}>Mountain</h2>
            <img src={Mountain} width="100%" alt="Mountain map clearing priority setup"/>
           </div>
          </div>
        )}
        <footer>
        <button style={{width: '100%', backgroundColor: '#fcf8e8', border: 'none', cursor: 'pointer', padding: '24px 16px'}} onClick={() => {window.scrollTo(0,0)}}>Back to top</button>
      </footer>
    </div>
    
  );
}

export default App;
