import xml2js from 'xml-js';

export const xml2Json = (value: string) => {
  if (isXML(value)) {
    const jsonValue = xml2js.xml2json(value, { compact: true });

    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
  }

  return null;
};

const isXML = (str: string): boolean => {
  return /^\s*<[\s\S]*>/.test(str);
};
