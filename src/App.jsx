import { useEffect, useState } from "react";
import ContraptionConspiracy from "./components/bots/contraption-conspiracy";
import Menu from "./components/menu";
import DummyDuchy from "./components/bots/dummy-duchy";
import CogwheelCult from "./components/bots/cogwheel-cult";
import RivetfolkCompany from "./components/bots/rivetfolk-company";
import Rootbotics from './assets/rootbotics.png';


function App() {

  const [bots, updateBots] = useState([]);
  const isRivetfolkPlaying = bots.some(({faction}) => faction === 'rivetfolk-company');
  const isNoBots = bots.length === 0;

  useEffect(() => {
    try {
      const bots = JSON.parse(window.localStorage.getItem('bots'));
      console.log('DAH: saved bots', bots);
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
        {isNoBots && (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>Click + to add a bot.</div>)}
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
      <footer>
        {!isNoBots && (<button style={{width: '100%', backgroundColor: '#fcf8e8', border: 'none', cursor: 'pointer', padding: '24px 16px'}} onClick={() => {window.scrollTo(0,0)}}>Back to top</button>)}
      </footer>
    </div>
  );
}

export default App;
