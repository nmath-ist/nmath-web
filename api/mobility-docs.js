import { createContentHandler } from './_content.js';

export default createContentHandler(
  'mobility_docs',
  [
    'program_type', 'continent', 'country', 'university', 'city',
    'academic_year', 'semester',
    'summary', 'author_name', 'file_url', 'sort_order', 'published',
  ],
  { requiredFields: ['continent', 'country', 'university', 'file_url'] }
);
