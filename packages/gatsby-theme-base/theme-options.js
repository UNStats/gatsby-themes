// @ts-check

/**
 * Set default options, but preserve overrides and additional options.
 *
 * @param { import("./src/types").Options } options
 * @returns  { import("./src/types").ThemeOptions }
 */
module.exports = (options) => ({
  mdxOtherwiseConfigured: false,
  ...options,
});
