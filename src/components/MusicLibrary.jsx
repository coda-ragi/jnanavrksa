import { MusicCard } from './MusicCard.jsx'

export function MusicLibrary({ items, onDeleteItem }) {
  return (
    <section id="library" aria-labelledby="library-heading">
      <h2 id="library-heading">Library</h2>
      <p>
        Phase 1 starts with manual entries. The goal is to understand the shape of
        the music library before adding integrations or automation.
      </p>

      {items.length === 0 ? (
        <p className="empty-library">Your library is empty. Add some music above!</p>
      ) : (
        <div className="music-grid">
          {items.map((item) => (
            <MusicCard key={item.id} item={item} onDeleteItem={onDeleteItem} />
          ))}
        </div>
      )}
    </section>
  )
}
