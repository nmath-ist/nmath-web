import { createContentHandler } from './_content.js';

export default createContentHandler(
  'magazine_editions',
  [
    'title', 'issue', 'cover_image_url', 'description', 'highlights',
    'publish_date', 'link', 'is_current', 'sort_order', 'published',
  ],
  { requiredFields: ['title', 'cover_image_url', 'link'] }
);
