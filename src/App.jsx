import { useEffect, useState, Component } from "react";
import ContraptionConspiracy from "./components/bots/contraption-conspiracy";
import Menu from "./components/menu";
import DummyDuchy from "./components/bots/dummy-duchy";
import CogwheelCult from "./components/bots/cogwheel-cult";
import RivetfolkCompany from "./components/bots/rivetfolk-company";
import Rootbotics from './assets/rootbotics.png';
import DCMechanicalMarquise2point0 from "./components/bots/dc-mechanical-marquise-2point0";
import DCElectricEyrie from "./components/bots/dc-electric-eyrie";
import DCAutomatedAlliance from "./components/bots/dc-automated-alliance";
import Map from "./components/map";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div style={{display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center'}}><h1>Something went wrong.</h1></div>;
    }

    return this.props.children; 
  }
}

function App() {

  const [bots, updateBots] = useState([]);
  const isRivetfolkPlaying = bots.some(({faction}) => faction === 'rivetfolk-company');
  const isNoBots = bots.length === 0;
  const maps = ['fall', 'winter', 'lake', 'mountain'];

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
      <ErrorBoundary>
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
              faction={faction}
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
          {isNoBots && (
            <div style={{padding: '0.5rem 1rem', display: 'flex',flexDirection: 'column', gap: '2rem', maxWidth: '740px', margin: '0 auto'}}>
              {maps.map (map => <Map key={map} type={map} />)}
            </div>
          )}
        </main>
      </ErrorBoundary>
        <footer>
        <button style={{width: '100%', backgroundColor: '#fcf8e8', border: 'none', cursor: 'pointer', padding: '24px 16px'}} onClick={() => {window.scrollTo(0,0)}}>Back to top</button>
      </footer>
    </div>
    
  );
}

export default App;
