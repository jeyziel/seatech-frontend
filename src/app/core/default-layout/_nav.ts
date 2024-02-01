export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'nav-icon fas fa-tachometer-alt' }
  },
  {
    name: 'Usuários',
    url: '/usuarios',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  },
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  },
  {
    name: 'Atendimentos',
    url: '/atendimentos',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  },
  {
    name: 'Vistoria',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Listagem',
        url: '/vistorias',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
      {
        name: 'Categoria',
        url: '/categoria-de-vistoria',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Despesas',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Categoria',
        url: '/categoria-de-despesa',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Cadastros',
    point: true
  },
  {
    name: 'Portos',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Listagem',
        url: '/portos',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Receitas',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Contas a Receber',
        url: '/contas-a-receber',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
      {
        name: 'Categoria',
        url: '/categoria-de-receita',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Contas Bancárias',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Listagem',
        url: '/contas-bancarias',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
];
