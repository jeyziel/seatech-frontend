const list = {
  IN_PROGRESS: 'Em Andamento',
  FINISHED: 'Finalizado',
  CANCELLED: 'Cancelado',
  PENDING: 'Pendente',
  DRAFT: 'NÃO FATURADO',
  CONCLUDED: 'Concluído',
  PAID: 'Pago',
  NOT_PAID: 'Não Pago',
  DEFAULT: 'Padrão',
  OPERATION: 'Operação',
};
export const translate = (value: string) => list?.[value.toUpperCase()];
