module.exports = (options) => {
  const basePath = options.basePath || '/';
  const contentPath = options.contentPath || 'content/posts';
  const assetPath = options.assetPath || 'content/assets';
  const collection = options.collection || 'blog';
  return { basePath, contentPath, assetPath, collection };
};
