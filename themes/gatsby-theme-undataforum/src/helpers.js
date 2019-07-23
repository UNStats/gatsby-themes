// Make queried post compatible with PostPreview.
export const normalizePost = ({
  id,
  fields: { lead, path },
  frontmatter: { title, date, authors },
}) => ({ id, title, date, authors, lead, href: path });
