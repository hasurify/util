type CurrencyList = {
  [key: string]: boolean;
};

const TRAILING_CURRENCIES: CurrencyList = {
  USD: true,
  MYR: true,
  SGD: true,
  EUR: true,
};

const COMPACT_THRESHOLD = 1000000;

/**
 * getPriceFormat
 * @param price price of service
 * @param currencyUnit price of service
 * @returns
 */
export function formatAmountWithCurrency(
  price: number,
  currencyUnit = 'USD',
  lang = 'en'
): string {
  if (!price || (price && typeof price !== 'number')) {
    return `0 ${currencyUnit}`;
  }

  const options = { rounded: false };
  if (TRAILING_CURRENCIES[currencyUnit] === undefined) {
    options.rounded = true;
  }

  const amount = processAmount(price, options);

  // Compact Million
  if (amount >= COMPACT_THRESHOLD) {
    return `${compactNumber(amount)} ${currencyUnit}`;
  }

  // Format currencies, with the currency code (no way to format without currency code or sign)
  // USD 1000
  // 1000 VND
  const result = amount.toLocaleString(lang, {
    style: 'currency',
    currency: currencyUnit,
    currencyDisplay: 'code',
  });

  // Remove currency code then add it at the end of the string (USD code could be on the left, need to move right)
  // USD 1000 -> 1000 -> 1000 USD
  const resultWithoutUnit = result.replace(currencyUnit, '').trim();

  if (TRAILING_CURRENCIES[currencyUnit] === undefined) {
    const resultWithoutTrailingZero = resultWithoutUnit.replace('.00', '');
    return `${resultWithoutTrailingZero} ${currencyUnit}`;
  }

  return `${resultWithoutUnit} ${currencyUnit}`;
}

export function processAmount(
  amount: number,
  options?: {
    rounded?: boolean;
  }
): number {
  if (!amount || isNaN(amount)) {
    return 0;
  }

  if (options?.rounded) {
    return Math.round(amount);
  }

  return amount;
}

function compactNumber(amount: number) {
  if (amount >= COMPACT_THRESHOLD) {
    const compactedAmount = (amount / COMPACT_THRESHOLD)
      .toFixed(2)
      .replace(/\.0$/, '');
    return `${parseFloat(compactedAmount)}M`;
  }

  return amount;
}
