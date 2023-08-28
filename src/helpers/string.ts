export const stripTags = (originalString?: string): string => {
  if (!originalString) {
    return '';
  }

  return originalString
    .replace(/<[^>]+>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#8203;/gi, '');
};

export const decodeHtmlCharCodes = (str?: string): string => {
  if (!str) {
    return '';
  }

  return str.replace(/(&#(\d+);)/g, (_match, _capture, charCode) =>
    String.fromCharCode(charCode)
  );
};
