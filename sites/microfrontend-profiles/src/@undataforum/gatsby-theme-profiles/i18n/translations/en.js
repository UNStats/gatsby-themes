import defaultTranslations from '@undataforum/gatsby-theme-profiles/src/i18n/translations/en';

// Shadow default localizations.
const translations = {
  ...defaultTranslations,
  // Shadow title and description for profiles overview page for `profiles` collection.
  'profiles.title': 'Shadowed profiles overview page title',
  'profiles.description': 'Shadowed profiles overview page description.',
};

export default translations;
