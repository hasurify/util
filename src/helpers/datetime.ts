import { getAllCountries, getCountry } from 'countries-and-timezones';
import { Dayjs } from 'dayjs';

const dayjsLib = require('dayjs');
type IDayJS = typeof dayjsLib;

export const FORMAT_DATE = 'YYYY-MM-DD';

export const useDayJS = (): IDayJS => {
  const utc = require('dayjs/plugin/utc');
  const dayJSTimezone = require('dayjs/plugin/timezone');
  const advancedFormat = require('dayjs/plugin/advancedFormat');
  const isToday = require('dayjs/plugin/isToday');
  const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
  const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
  const isBetween = require('dayjs/plugin/isBetween');
  const customParseFormat = require('dayjs/plugin/customParseFormat');
  const minMax = require('dayjs/plugin/minMax');
  const duration = require('dayjs/plugin/duration');

  dayjsLib.extend(utc);
  dayjsLib.extend(dayJSTimezone);
  dayjsLib.extend(advancedFormat);
  dayjsLib.extend(isToday);
  dayjsLib.extend(isSameOrAfter);
  dayjsLib.extend(isSameOrBefore);
  dayjsLib.extend(isBetween);
  dayjsLib.extend(customParseFormat);
  dayjsLib.extend(customParseFormat);
  dayjsLib.extend(minMax);
  dayjsLib.extend(duration);

  return dayjsLib;
};

export const dayjs = useDayJS();

export const formatDate = (
  date: string | Date | Dayjs,
  format: string,
  timezone?: string
): string => {
  if (timezone) {
    return dayjs(date).tz(timezone).format(format);
  } else return dayjs(date).format(format);
};

export const getTimeTZ = (date: string | Date, timezone: string) => {
  if (!timezone || ['UTC', 'GMT'].includes(timezone)) {
    return dayjs(date).utc();
  }

  return dayjs(date).tz(timezone);
};

export const getTZFromCountryName = (countryName: string): string => {
  const countryCodes = getAllCountries();
  const countries = Object.values(countryCodes);
  const country = countries.find(c => c.name === countryName);
  const [timezone] = country?.timezones || [];

  return timezone || 'UTC';
};

export const getTZFromCountryCode = (countryCode: string): string => {
  const country = getCountry(countryCode);
  const [timezone] = country?.timezones || [];

  return timezone || 'UTC';
};

export const parseTimeTZ = (date: string, timezone: string) => {
  return dayjs.tz(date, timezone);
};

export const getCountryTime = (time: Date | string, countryCode: string) => {
  const timezone = getTZFromCountryCode(countryCode);
  return getTimeTZ(time, timezone);
};

export const isValidTime = (
  date: string | Date | Dayjs,
  parsingFormat = 'HH:mm:ss'
): boolean => {
  return dayjs(date, parsingFormat).isValid();
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
