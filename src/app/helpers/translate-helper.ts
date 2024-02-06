const list = {
  IN_PROGRESS: 'Em Andamento',
  FINISHED: 'Finalizado',
  CANCELLED: 'Cancelado',
};

export const translate = (value: string) => list?.[value.toUpperCase()];
