import { createContentHandler } from './_content.js';

export default createContentHandler(
  'photo_albums',
  ['title', 'drive_url', 'sort_order', 'published'],
  { requiredFields: ['title', 'drive_url'] }
);
