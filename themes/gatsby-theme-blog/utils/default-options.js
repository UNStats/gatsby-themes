module.exports = options => {
  const basePath = options.basePath || '/';
  const contentPath = options.contentPath || 'content/blog';
  const assetPath = options.assetPath || 'content/assets';
  const collection = options.collection || 'blog';
  const profiles = options.profiles || undefined;
  return { basePath, contentPath, assetPath, collection, profiles };
};
