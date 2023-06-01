enum OrderStatus {
  New = 'Confirm',
  Confirmed = 'Process',
  Preparing = 'Complete',
  Pending = '',
  Delivering = '',
  Completed = '',
  Failed = '',
}

enum ShipperOrderStatus {
  New = '',
  Confirmed = '',
  Preparing = '',
  Pending = 'Deliver',
  Delivering = 'Complete',
  Completed = '',
  Failed = '',
}

const statusKeys = Object.keys(OrderStatus);

export const getChangeStatusButtonLabel = (
  status: string,
  role: 'chef' | 'shipper' = 'chef',
): string | undefined => {
  if (!statusKeys.includes(status)) {
    return undefined;
  }

  if (role === 'chef') {
    const s = OrderStatus[status as keyof typeof OrderStatus];
    return s ? s : undefined;
  }

  if (role === 'shipper') {
    const s = ShipperOrderStatus[status as keyof typeof ShipperOrderStatus];
    return s ? s : undefined;
  }

  return undefined;
};
