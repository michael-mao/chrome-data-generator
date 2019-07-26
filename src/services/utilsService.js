export default {
  camelCaseToTitleCase(text) {
    const textWithSpaces = text.replace(/([A-Z])/g, ' $1');
    return textWithSpaces.charAt(0).toUpperCase() + textWithSpaces.slice(1);
  },

  deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  },

  isProduction() {
    return process.env.NODE_ENV === 'production';
  },
};
