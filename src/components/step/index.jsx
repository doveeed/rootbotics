
export default function Step ({title = "", description ="", substeps}) {
    return <div >
        <div style={{marginBottom: '4px', lineHeight: '1.25rem'}}>
        <span>
            <b>{title}</b>
        </span>
        {' '}
        <span>{description}</span>
        </div>
        {substeps}
    </div>
}