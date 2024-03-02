export const navItems: any[] = [
  {
    name: 'Dashboards',
    id: 1,
    iconComponent: { name: 'nav-icon fas fa-tachometer-alt' },
    children: [
      {
        name: 'Geral',
        url: '/dashboard',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
      {
        name: 'Cliente',
        url: '/dashboard/cliente',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  // {
  //   name: 'Usuários',
  //   url: '/usuarios',
  //   iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  // },

  {
    name: 'Gerenciar Atendimento',
    point: true
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
        name: 'Categorias',
        url: '/categoria-de-vistoria',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },

  {
    name: 'Financeiro',
    point: true
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
        name: 'Categorias',
        url: '/categoria-de-receita',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Despesas',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    children: [
      {
        name: 'Contas a Pagar',
        url: '/contas-a-pagar',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
      {
        name: 'Categoria',
        url: '/categoria-de-despesa',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },
  {
    name: 'Contas Bancárias',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    url: '/contas-bancarias',
    
  },
 
  
  
 
  {
    name: 'Cadastros',
    point: true
  },
 
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  },
  {
    name: 'Portos',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'},
    url: '/portos',  
  },
  
  
];
