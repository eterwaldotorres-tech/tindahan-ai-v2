export const CASH_PRESETS = [
  20,
  50,
  100,
  200,
  500,
  1000,
  1200,
  1500,
  2000,
  2500,
  3000,
  3500,
  4000,
  5000,
  10000,
];

const MAX_SUGGESTIONS = 4;

export function getSuggestedCashAmounts(total: number): number[] {
  if (total <= 0) {
    return CASH_PRESETS.slice(0, MAX_SUGGESTIONS);
  }

  return CASH_PRESETS
    .filter((amount) => amount >= total)
    .slice(0, MAX_SUGGESTIONS);
}