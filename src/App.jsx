import { useState } from 'react'
import './App.css'
import nodetypes from './nodetypes.js'

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [node, setNode] = useState('')

  function handleSubmit() {
    if (node.trim() !== '') {
      setIsEditing(false)
      setNode('')
    }
  }

  return (
    <div className="app-shell">
      <div className="logo-row">
        <div className="logo">SAMA</div>
        <div className="subtitle">A personal catalog</div>
      </div>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Add node"
          className="add-node-button"
        >
          +
        </button>
      ) : (
        <div className="link-form">
          <input
            id="link-input"
            type="text"
            value={node}
            onChange={(e) => setNode(e.target.value)}
            placeholder="Enter a node"
            className="link-input"
          />
          <button onClick={handleSubmit} className="link-submit-button">
            Done
          </button>
        </div>
      )}
    </div>
  )
}

export default App
