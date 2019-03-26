import { func, shape, string } from 'prop-types';

const affiliationType = shape({
  jobtitle: string.isRequired,
  organization: string.isRequired,
});

export const postType = shape({
  id: string.isRequired,
  title: string.isRequired,
  date: string.isRequired,
  authors: func.isRequired,
  lead: string,
  href: string,
});

export const profileType = shape({
  id: string.isRequired,
  avatar: func.isRequired,
  name: string,
  affiliation: affiliationType,
  href: string,
});
