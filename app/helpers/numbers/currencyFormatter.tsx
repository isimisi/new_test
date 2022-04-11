const currencyFormatter = (x, currency) => {
  if (!x) {
    return undefined;
  }
  const option = {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  };
  // console.log(option);
  const formatter = new Intl.NumberFormat("da-DK", option);

  return formatter.format(x);
};

export default currencyFormatter;
