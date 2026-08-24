import { useState, useEffect } from 'react';
import MainPage from './MainPage';
import AdminPortal from './AdminPortal';
import AnnouncementsPage from './AnnouncementsPage';
import AnnouncementDetailPage from './AnnouncementDetailPage';
import MagazinePage from './MagazinePage';
import OracleEpisodesPage from './OracleEpisodesPage';
import PhotosPage from './PhotosPage';
import { parseIdFromSlug } from './slug';

export default function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (path.startsWith('/admin')) {
    return <AdminPortal />;
  }
  if (path.startsWith('/anuncios')) {
    // /anuncios/42-titulo-do-anuncio -> página de detalhe
    // /anuncios ou /anuncios/ -> lista completa
    const rest = path.replace(/^\/anuncios\/?/, '');
    const id = rest ? parseIdFromSlug(rest) : null;
    if (id !== null) {
      return <AnnouncementDetailPage id={id} />;
    }
    return <AnnouncementsPage />;
  }
  if (path.startsWith('/revista')) {
    return <MagazinePage />;
  }
  if (path.startsWith('/oraculo')) {
    return <OracleEpisodesPage />;
  }
  if (path.startsWith('/fotos')) {
    return <PhotosPage />;
  }

  return <MainPage />;
}
