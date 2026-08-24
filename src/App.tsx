import Router from './components/Router';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <Router />
      <Toaster position="top-center" richColors />
    </>
  );
}
