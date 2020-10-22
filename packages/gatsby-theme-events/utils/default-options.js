module.exports = (options) => {
  const basePath = options.basePath || '/';
  const contentPath = options.contentPath || 'content/events';
  const assetPath = options.assetPath || 'content/assets';
  const collection = options.collection || 'events';
  return { basePath, contentPath, assetPath, collection };
};
