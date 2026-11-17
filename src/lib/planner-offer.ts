export const PLANNER_PRICE = 12.99;
export const PLANNER_CHECKOUT_URL = "https://twpub.gumroad.com/l/christmasplanner";

export function getChristmasCountdown(now: Date) {
  const endOfYear = new Date(now.getFullYear(), 11, 25);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (today > endOfYear) return null;

  return Math.ceil((endOfYear.getTime() - today.getTime()) / 86_400_000);
}