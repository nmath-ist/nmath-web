import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import EventPage from './EventPage';

export default function Router() {
  const [currentPage, setCurrentPage] = useState('home');
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash === 'repositorio') {
        // Redirect to external repository link
        window.open('https://drive.google.com/drive/folders/1nmath-repo-example', '_blank');
        // Reset hash to avoid staying on redirect
        window.location.hash = '';
        setCurrentPage('home');
      } else if (hash === 'eventos') {
        // Show events page
        setCurrentPage('events');
        setEventId(null);
      } else if (hash.startsWith('evento/')) {
        const id = hash.split('/')[1];
        setEventId(id);
        setCurrentPage('event');
      } else {
        setCurrentPage('home');
        setEventId(null);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'event' && eventId) {
    return <EventPage eventId={eventId} />;
  }

  if (currentPage === 'events') {
    return <EventPage eventId="overview" />;
  }

  return <MainPage />;
}