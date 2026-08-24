// Gera um "slug" simples a partir de um título, para URLs mais legíveis
// tipo /anuncios/42-titulo-do-anuncio. O ID continua a ser a parte que
// importa para encontrar o item — o slug é só estético/SEO.
export function slugify(text: string): string {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function announcementUrl(item: { id: number | string; title: string }): string {
  const slug = slugify(item.title);
  return slug ? `/anuncios/${item.id}-${slug}` : `/anuncios/${item.id}`;
}

// Extrai o ID numérico do início de um segmento de URL tipo
// "42-titulo-do-anuncio" ou apenas "42".
export function parseIdFromSlug(segment: string): number | null {
  const match = /^(\d+)/.exec(segment || '');
  return match ? Number(match[1]) : null;
}
