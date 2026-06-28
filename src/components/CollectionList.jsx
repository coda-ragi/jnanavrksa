import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { hasStorage, saveCollections, getAllCollections, addCollection, updateCollection, deleteCollection } from '../storage/collectionsStorage.js';

export function CollectionList({ onAdd, onEdit, onDelete, selectedIds = [], onSelectionChange }) {
  const [collections, setCollections] = useState(getAllCollections());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      setCollections(getAllCollections());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAdd = () => {
    if (!newCollectionName.trim()) return;

    const newCollection = {
      id: nanoid(),
      name: newCollectionName.trim(),
      description: newCollectionDescription.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = addCollection(newCollection);
    setNewCollectionName('');
    setNewCollectionDescription('');
    setIsAdding(false);
  };

  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setEditName(collection.name);
    setEditDescription(collection.description);
  };

  const saveEdit = () => {
    if (!editName.trim()) return;

    const updatedCollection = {
      ...getAllCollections().find(c => c.id === editingId),
      name: editName.trim(),
      description: editDescription.trim(),
      updatedAt: new Date().toISOString(),
    };

    updateCollection(updatedCollection);
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection? Items in this collection will become uncategorized.')) {
      deleteCollection(id);
    }
  };

  const toggleItemSelection = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="collection-list">
      <div className="collection-header">
        <h3>Collections</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="add-collection-button"
        >
          + Add Collection
        </button>
      </div>

      {isAdding && (
        <div className="collection-form">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name"
            autoFocus
          />
          <textarea
            value={newCollectionDescription}
            onChange={(e) => setNewCollectionDescription(e.target.value)}
            placeholder="Description (optional)"
            rows="2"
          />
          <div className="collection-form-actions">
            <button onClick={handleAdd}>Save</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="collections-grid">
        {collections.map(collection => (
          <div key={collection.id} className="collection-card">
            {editingId === collection.id ? (
              <div className="collection-edit-form">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="2"
                />
                <div className="collection-edit-actions">
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <h4>{collection.name}</h4>
                {collection.description && <p>{collection.description}</p>}
                <p className="collection-meta">
                  Created: {new Date(collection.createdAt).toLocaleDateString()}
                </p>
                <div className="collection-actions">
                  <button
                    onClick={() => handleEdit(collection)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(collection.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {collections.length === 0 && !isAdding && (
        <p className="empty-collections">No collections yet. Create one above!</p>
      )}
    </div>
  );
}