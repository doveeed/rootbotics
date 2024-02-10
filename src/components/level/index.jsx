import Card from '../card';
import OneVP from '../one-vp';

export default function Level({faction,level, labels,onChangeLevel}) {

    const onChange = (event) => onChangeLevel(event.target.value);
    
    return (
        <Card title="Difficulty Level">
            <div>
                <input type='radio' checked={level === 'beginner'} value="beginner" id={`${faction}-beginner`} onChange={onChange} />
                <label htmlFor={`${faction}-beginner`}>Beginner = {labels['beginner']}</label>
            </div>
            <div>
                <input type='radio' checked={level === 'expert'} value="expert" id={`${faction}-expert`} onChange={onChange} />
                <label htmlFor={`${faction}-expert`}>Expert = {labels['expert']}</label>
            </div>
            <div>
                <input type='radio' checked={level === 'master'} value="master" id={`${faction}-master`} onChange={onChange} />
                <label htmlFor={`${faction}-master`}>Master = {labels['master']}</label>
            </div>
            <div>
                <input type='radio' checked={level === 'boss'} value="boss" id={`${faction}-boss`} onChange={onChange} />
                <label htmlFor={`${faction}-boss`}>Boss Mode (Coop) = {labels['master']} + Each round score <OneVP/> for every two players (rounded up).</label>
            </div>
    </Card>

    )
}