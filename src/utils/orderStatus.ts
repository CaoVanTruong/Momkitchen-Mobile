enum OrderStatus {
  New = 'Confirm',
  Processing = 'Complete',
  Completed = '',
  Cancelled = '',
}

const statusKeys = Object.keys(OrderStatus);

export const getChangeStatusButtonLabel = (
  status: string,
): string | undefined => {
  if (!statusKeys.includes(status)) {
    return undefined;
  }

  const s = OrderStatus[status as keyof typeof OrderStatus];

  return s ? s : undefined;
};
