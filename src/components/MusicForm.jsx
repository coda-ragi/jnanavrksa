import React, { useState } from 'react';

export function MusicForm({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [type, setType] = useState('track');
  const [source, setSource] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [moods, setMoods] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      alert('Please enter at least a title and artist.');
      return;
    }

    const now = new Date().toISOString();
    
    const newItem = {
      id: `music-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      artist: artist.trim(),
      type,
      source: source.trim(),
      sourceUrl: sourceUrl.trim(),
      notes: notes.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      moods: moods.split(',').map(mood => mood.trim()).filter(Boolean),
      collectionIds: [],
      createdAt: now,
      updatedAt: now,
    };

    onAddItem(newItem);

    setTitle('');
    setArtist('');
    setType('track');
    setSource('');
    setSourceUrl('');
    setNotes('');
    setTags('');
    setMoods('');
  };

  return (
    <form onSubmit={handleSubmit} className="music-form">
      <h3>Add to Your Library</h3>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Midnight City" required />
      </div>

      <div className="form-group">
        <label htmlFor="artist">Artist *</label>
        <input id="artist" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="e.g. M83" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="track">Track</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
            <option value="discovery">Discovery</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="source">Source</label>
          <input id="source" type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Bandcamp" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sourceUrl">Source URL</label>
        <input id="sourceUrl" type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Personal Notes</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Why it matters to you..." rows="3" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. ambient, vinyl" />
        </div>

        <div className="form-group">
          <label htmlFor="moods">Moods</label>
          <input id="moods" type="text" value={moods} onChange={(e) => setMoods(e.target.value)} placeholder="e.g. late-night" />
        </div>
      </div>

      <button type="submit" className="submit-button">Save to Library</button>
    </form>
  );
}

export default MusicForm;
