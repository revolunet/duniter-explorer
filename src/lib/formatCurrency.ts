export const formatCurrency = (amount: number, unit = "Ğ1") =>
  new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(amount) +
  " " +
  unit;
