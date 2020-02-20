module.exports = options => {
  const basePath = options.basePath || '/';
  const contentPath = options.contentPath || 'content/profiles';
  const assetPath = options.assetPath || 'content/assets';
  const collection = options.collection || 'profiles';
  return { basePath, contentPath, assetPath, collection };
};
