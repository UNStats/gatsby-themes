import defaults from '@undataforum/gatsby-theme-profiles/src/i18n/translations/en';
import merge from 'deepmerge';

// Shadow default localizations.
const en = merge(defaults, {
  // Shadow title and description for profiles overview page for `profiles` collection.
  'profiles.title': 'Shadowed profiles overview page title',
  'profiles.description': 'Shadowed profiles overview page description.',
});

export default en;
