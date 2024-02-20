import { getFactionName } from "../../utils";
import Button from "../button";

export default function DeleteModal({faction, onConfirm, onCancel}) {
    return (
    <div style={{display: 'flex', position: 'fixed', top: 0, width: '100vw', height: '100vh', zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.6)', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '520px', minHeight: '50%', borderRadius: '0.5rem', alignItems: 'center', padding: '1rem', backgroundColor: '#fcf8e8'}}>
      <h2 style={{display: 'flex'}}>You are about to delete</h2>
      <div style={{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <b style={{fontSize: '2rem', marginBottom: '1rem'}}>{getFactionName(faction)}</b>
        <div>This cannot be undone.</div>
        </div>
      <div style={{display: 'flex', gap: '1rem'}}><Button onClick={onConfirm}>Confirm</Button><Button onClick={onCancel}>Cancel</Button></div>
      </div>
    </div>);
  }