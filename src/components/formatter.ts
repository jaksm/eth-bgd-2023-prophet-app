export const currency = {
  format: (value: number | undefined, precision = 8) =>
    (value || 0).toFixed(precision),
};
