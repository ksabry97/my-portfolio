export function formatDateRange(
  startDate: string,
  endDate: string | null,
  current = false
): string {
  const start = formatMonthYear(startDate);
  const end = current || !endDate ? 'Present' : formatMonthYear(endDate);
  return `${start} — ${end}`;
}

export function formatMonthYear(value: string): string {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const group = String(item[key]);
      acc[group] = acc[group] ?? [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
