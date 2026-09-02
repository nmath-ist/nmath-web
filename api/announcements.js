import { createContentHandler } from './_content.js';

export default createContentHandler(
  'announcements',
  [
    'title', 'excerpt', 'category', 'event_date', 'event_end_date',
    'featured', 'icon', 'full_content', 'sort_order', 'published',
  ],
  { requiredFields: ['title', 'excerpt', 'event_date'] }
);
