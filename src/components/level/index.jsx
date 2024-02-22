import { useSettings } from '../../hooks/use-settings';
import Card from '../card';
import OneVP from '../one-vp';

export default function Level({level, labels,onChangeLevel}) {
    const {faction, factionColor} = useSettings();

    const onChange = (event) => onChangeLevel(event.target.value);
    const accentColor = factionColor;
    
    return (
        <Card title="Difficulty Level">
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label htmlFor={`${faction}-beginner`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                    <input type='radio' checked={level === 'beginner'} value="beginner" id={`${faction}-beginner`} onChange={onChange} style={{accentColor}} />
                    <div ><div><b>Beginner</b></div><div>{labels['beginner']}</div></div>
                </label>
                <label htmlFor={`${faction}-expert`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                    <input type='radio' checked={level === 'expert'} value="expert" id={`${faction}-expert`} onChange={onChange} style={{accentColor}} />
                    <div ><div><b>Expert</b></div><div>{labels['expert']}</div></div>
                </label>
                <label htmlFor={`${faction}-master`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                    <input type='radio' checked={level === 'master'} value="master" id={`${faction}-master`} onChange={onChange} style={{accentColor}} />
                    <div ><div><b>Master</b></div><div>{labels['master']}</div></div>
                </label>
                <label htmlFor={`${faction}-boss`} style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer'}}>
                    <input type='radio' checked={level === 'boss'} value="boss" id={`${faction}-boss`} onChange={onChange} style={{accentColor}} />
                    <div><div><b>Boss Mode (Co-op)</b></div><div>{labels['master']}<br/>Each round, score <OneVP/> for every two human players (rounded up).</div></div>
                </label>
            </div>
    </Card>

    )
}