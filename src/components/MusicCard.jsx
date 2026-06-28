export function MusicCard({ item, onDeleteItem }) {
  return (
    <article className="music-card">
      <span className="music-type">{item.type}</span>
      <h3>{item.title}</h3>
      <p className="music-artist">by {item.artist}</p>
      
      {item.source && (
        <p className="music-source">
          Source: {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
              {item.source}
            </a>
          ) : (
            item.source
          )}
        </p>
      )}

      {item.notes && <p className="music-notes">{item.notes}</p>}

      <TagList label="Tags" values={item.tags || []} />
      <TagList label="Moods" values={item.moods || []} />

      <button 
        className="delete-button" 
        onClick={() => onDeleteItem(item.id)}
        aria-label={`Delete ${item.title}`}
      >
        Delete
      </button>
    </article>
  )
}

function TagList({ label, values }) {
  if (values.length === 0) {
    return null
  }

  return (
    <div>
      <p>{label}</p>
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  )
}
