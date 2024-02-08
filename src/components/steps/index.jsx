
export default function Steps ({steps = [], type = '1'}) {
    return (
            <div>
                <ol type={type}>
                    {steps.map((step, index) => (<li key={index}>{step}</li>))}
                </ol>
            </div>
    );
}