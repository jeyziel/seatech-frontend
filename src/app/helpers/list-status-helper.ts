export const listStatus = [
  {
    name: 'Em Andamento',
    value: 'IN_PROGRESS',
    color: 'warning'
  },
  {
    name: 'Finalizado',
    value: 'FINISHED',
    color: 'success'
  },
  {
    name: 'Cancelado',
    value: 'CANCELLED',
    color: 'danger'
  }
];

export const getObjStatus = (value: string) => listStatus?.[value];
