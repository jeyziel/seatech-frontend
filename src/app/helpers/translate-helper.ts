const list = {
  IN_PROGRESS: 'Em Andamento',
  FINISHED: 'Finalizado',
  CANCELLED: 'Cancelado',
  PENDING: 'FATURADO',
  DRAFT: 'NÃO FATURADO',
  CONCLUDED: 'PAGO',
  PAID: 'Pago',
  NOT_PAID: 'Não Pago',
  DEFAULT: 'Padrão',
  OPERATION: 'Operação',
  SERVICES: 'Atendimento',
};
export const translate = (value: string) => list?.[value.toUpperCase()];
