import { createContentHandler } from './_content.js';

export default createContentHandler(
  'flagship_events',
  [
    'title', 'short_description', 'category', 'stats', 'icon',
    'year_links', 'sort_order', 'published',
  ],
  { requiredFields: ['title'] }
);
