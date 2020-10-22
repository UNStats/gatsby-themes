const { createIntl, createIntlCache } = require('react-intl');

module.exports = (moderators, lang, messages, key) => {
  // We need to localize props that are not React components:
  // https://github.com/formatjs/react-intl/blob/master/docs/API.md#createintl
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: lang,
      messages: messages[lang],
    },
    cache
  );
  return moderators.map((moderator) => ({
    ...moderator,
    name: `${moderator.name} (${intl.formatMessage({
      id: `${key}.moderator`,
    })})`,
  }));
};
