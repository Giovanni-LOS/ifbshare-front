export function dateDistanceToToday(createdAt: string) {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today.getTime() - createdDate.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
