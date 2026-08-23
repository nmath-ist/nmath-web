import { useState, useEffect } from 'react';
import MainPage from './MainPage';
import AdminPortal from './AdminPortal';

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

  return <MainPage />;
}
