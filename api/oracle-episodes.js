import { createContentHandler } from './_content.js';

export default createContentHandler(
  'oracle_episodes',
  ['title', 'duration', 'episode_date', 'plays', 'url', 'sort_order', 'published'],
  { requiredFields: ['title', 'url'] }
);
