import { createContentHandler } from './_content.js';

export default createContentHandler(
  'announcements',
  [
    'title', 'excerpt', 'category', 'event_date', 'read_time',
    'featured', 'icon', 'full_content', 'sort_order', 'published',
  ],
  { requiredFields: ['title', 'excerpt', 'event_date'] }
);
