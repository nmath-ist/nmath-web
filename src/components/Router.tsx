import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';

export default function Router() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash === 'repositorio') {
        window.open('https://drive.google.com/drive/folders/1nmath-repo-example', '_blank');
        window.location.hash = '';
        setCurrentPage('home');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <MainPage />;
}
