export const currencyFormatter = (x, currency, format) => {
  if (!x && x !== 0) {
    return undefined;
  }
  const option = {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  };

  const formatter = new Intl.NumberFormat(format, option);

  return formatter.format(x);
};

export const genericFormatter = (x, format) => {
  if (!x && x !== 0) {
    return undefined;
  }

  const formatter = new Intl.NumberFormat(format);

  return formatter.format(x);
};
