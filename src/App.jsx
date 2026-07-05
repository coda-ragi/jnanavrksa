import { useState } from 'react'

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [link, setLink] = useState('')

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Add link
        </button>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '320px',
            padding: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <label htmlFor="link-input" style={{ fontWeight: '600' }}>
            Enter a link
          </label>
          <input
            id="link-input"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            style={{
              padding: '0.6rem',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
            }}
          />
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: '0.6rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#16a34a',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
export default App
