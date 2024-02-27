import { useState } from "react"
import Map from "../map";
import Button from "../button";

const shuffle =(suits) => {
    const array = [...suits]
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default function Maps() {
    const [type, setType] = useState('fall');
    const [isOpen, setIsOpen] = useState(false);
    const [suits, updateSuits] = useState(shuffle(['fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse','fox', 'rabbit', 'mouse']));

    return (
        <div>
            <button style={{background: 'none', border: 'none', cursor: "pointer"}} onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24}>
                    <path d="M48.17 113.34A32 32 0 0032 141.24V438a32 32 0 0047 28.37c.43-.23.85-.47 1.26-.74l84.14-55.05a8 8 0 003.63-6.72V46.45a8 8 0 00-12.51-6.63zM212.36 39.31A8 8 0 00200 46v357.56a8 8 0 003.63 6.72l96 62.42A8 8 0 00312 466V108.67a8 8 0 00-3.64-6.73zM464.53 46.47a31.64 31.64 0 00-31.5-.88 12.07 12.07 0 00-1.25.74l-84.15 55a8 8 0 00-3.63 6.72v357.46a8 8 0 0012.52 6.63l107.07-73.46a32 32 0 0016.41-28v-296a32.76 32.76 0 00-15.47-28.21z" />
                </svg>
            </button>
            {isOpen && (<div style={{backgroundColor: '#fcf8e8', border: '2px solid black', position: 'absolute', top: '80px', right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0.5rem', boxSizing: 'border-box', maxHeight: 'calc(100vh - 80px)', overflow: 'auto'}}>
                <div style={{display: 'flex', gap: '4px', marginBottom: '1rem'}}>
                    <Button onClick={() => setType('fall')}>Fall</Button>
                    <Button onClick={() => setType('winter')}>Winter</Button>
                    <Button onClick={() => setType('lake')}>Lake</Button>
                    <Button onClick={() => setType('mountain')}>Mountain</Button>
                </div>
                <Map type={type} suits={suits} />
                {type !== 'fall' && <Button style={{width: 'fit-content'}} onClick={() => updateSuits(shuffle(suits))}>Shuffle</Button>}
            </div>)}
        </div>
    );
}