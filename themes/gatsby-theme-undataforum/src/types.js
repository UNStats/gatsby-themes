import {
  arrayOf,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';

export const responsiveNumberType = oneOfType([number, arrayOf(number)]);

const affiliationType = shape({
  jobtitle: string.isRequired,
  organization: string.isRequired,
});

export const colorType = oneOf([
  'text',
  'background',
  'primary',
  'secondary',
  'blue',
  'green',
  'red',
  'yellow',
]);

// Unlike postType in @undataforum/components, id is required and is used as key in lists.
export const postType = shape({
  id: string.isRequired,
  title: string.isRequired,
  date: string.isRequired,
  authors: func.isRequired,
  lead: string,
  href: string,
});

// Unlike profileType in @undataforum/components, id is required and is used as key in lists.
export const profileType = shape({
  id: string.isRequired,
  avatar: func.isRequired,
  name: string,
  affiliation: affiliationType,
  href: string,
});
