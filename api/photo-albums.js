import { createContentHandler } from './_content.js';

export default createContentHandler(
  'photo_albums',
  ['title', 'drive_url', 'album_date', 'sort_order', 'published'],
  { requiredFields: ['title', 'drive_url', 'album_date'] }
);
