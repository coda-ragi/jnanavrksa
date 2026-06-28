import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureList from './components/FeatureList';
import { MusicForm } from './components/MusicForm';
import { MusicLibrary } from './components/MusicLibrary';
import { SearchAndFilters } from './components/SearchAndFilters';
import { getInitialMusicItems, saveMusicItems } from './storage/musicStorage';
import Footer from './components/Footer';

function App() {
  const [musicItems, setMusicItems] = useState(getInitialMusicItems);
  const [filter, setFilter] = useState({
    type: '',
    tags: [],
    moods: [],
    source: ''
  });
  const [searchText, setSearchText] = useState('');

  const handleAddItem = (newItem) => {
    const updatedItems = [newItem, ...musicItems];
    setMusicItems(updatedItems);
    saveMusicItems(updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this music item?')) {
      const updatedItems = musicItems.filter((item) => item.id !== itemId);
      setMusicItems(updatedItems);
      saveMusicItems(updatedItems);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredItems = () => {
    return musicItems.filter((item) => {
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesSearch = (
          item.title.toLowerCase().includes(searchLower) ||
          item.artist.toLowerCase().includes(searchLower) ||
          item.notes.toLowerCase().includes(searchLower)
        );
        if (!matchesSearch) return false;
      }

      if (filter.type && item.type !== filter.type) return false;

      if (filter.tags.length > 0 && !filter.tags.every(tag => item.tags.includes(tag))) return false;

      if (filter.moods.length > 0 && !filter.moods.every(mood => item.moods.includes(mood))) return false;

      if (filter.source && item.source !== filter.source) return false;

      return true;
    });
  };

  const filteredItems = getFilteredItems();

  return (
    <>
      <Header /> 
      <main>
        <Hero />
        <FeatureList />
        <section className="app-workspace">
          <div className="workspace-container">
            <MusicForm onAddItem={handleAddItem} />
            <SearchAndFilters items={musicItems} onSearch={handleSearch} onFilter={handleFilter} />
            <MusicLibrary items={filteredItems} onDeleteItem={handleDeleteItem} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
