import { createContentHandler } from './_content.js';

export default createContentHandler(
  'upcoming_events',
  [
    'title', 'event_date', 'event_end_date', 'event_time', 'location', 'description',
    'event_type', 'link', 'sort_order', 'published',
  ],
  { requiredFields: ['title', 'event_date', 'location'] }
);
