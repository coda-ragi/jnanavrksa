import { useState } from 'react'
import './App.css'

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [link, setLink] = useState('')

  return (
    <div className="app-shell">
      <div className="logo-row">
        <div className="logo">SAMA</div>
        <div className="subtitle">My personal space</div>
      </div>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Add link"
          className="add-link-button"
        >
          +
        </button>
      ) : (
        <div className="link-form">
          <label htmlFor="link-input" className="link-label">
            Enter a link
          </label>
          <input
            id="link-input"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="link-input"
          />
          <button onClick={() => setIsEditing(false)} className="link-submit-button">
            Done
          </button>
        </div>
      )}
    </div>
  )
}

export default App
