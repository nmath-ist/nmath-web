import { useEffect } from 'react';

// Atualiza <title> e as meta tags principais (description, og:*, twitter:*)
// enquanto a página de detalhe está montada, e repõe os valores originais
// do site quando o utilizador sai. É "best effort" para SEO/partilhas numa
// SPA sem SSR — não substitui pré-renderização no servidor, mas ajuda
// crawlers que executam JavaScript (como o Googlebot) e melhora o título
// mostrado no separador do browser.
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const prevOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const prevOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

    document.title = title;
    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[name="twitter:title"]', title);

    return () => {
      document.title = prevTitle;
      setMeta('meta[name="description"]', prevDescription);
      setMeta('meta[property="og:title"]', prevOgTitle);
      setMeta('meta[property="og:description"]', prevOgDescription);
    };
  }, [title, description]);
}
