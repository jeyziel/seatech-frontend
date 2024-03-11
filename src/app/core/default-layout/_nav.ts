export const navItems: any[] = [
  {
    name: 'Dashboards',
    id: 1,
    iconComponent: { name: 'nav-icon fas fa-tachometer-alt' },
    children: [
      {
        name: 'Geral',
        url: '/dashboard',
        iconComponent: { name: 'nav-icon fas  fa-chart-line'}
      },
      {
        name: 'Cliente',
        url: '/dashboard/cliente',
        iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
      },
    ]
  },


  {
    name: 'Gerenciar Atendimento',
    point: true
  },

  {
    name: 'Atendimentos',
    url: '/atendimentos',
    iconComponent: { name: 'nav-icon fas fa-ship'}
  },
  {
    name: 'Vistorias',
    iconComponent: { name: 'nav-icon fas fa-cogs'},
    children: [
      {
        name: 'Listagem',
        url: '/vistorias',
        iconComponent: { name: 'nav-icon fas fa-list-ul'}
      },
      {
        name: 'Categorias',
        url: '/categoria-de-vistoria',
        iconComponent: { name: 'nav-icon fas fa-tags'}
      },
    ]
  },

  {
    name: 'Financeiro',
    point: true
  },
  {
    name: 'Receitas',
    iconComponent: { name: 'nav-icon fas fa-chart-line'},
    children: [
      {
        name: 'Contas a Receber',
        url: '/contas-a-receber',
        iconComponent: { name: 'nav-icon fas fa-file-invoice'}
      },
      {
        name: 'Categorias',
        url: '/categoria-de-receita',
        iconComponent: { name: 'nav-icon fas fa-list-ul'}
      },
    ]
  },
  {
    name: 'Despesas',
    iconComponent: { name: 'nav-icon fas fa-arrow-down'},
    children: [
      {
        name: 'Contas a Pagar',
        url: '/contas-a-pagar',
        iconComponent: { name: 'nav-icon fas fa-file-invoice'}
      },
      {
        name: 'Categoria',
        url: '/categoria-de-despesa',
        iconComponent: { name: 'nav-icon fas fa-list-ul'}
      },
    ]
  },
  {
    name: 'Contas Bancárias',
    iconComponent: { name: 'nav-icon fas fas fa-university'},
    url: '/contas-bancarias',
    
  },
 
  
  
 
  {
    name: 'Cadastros',
    point: true
  },
 
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'nav-icon fas  fa-user-friends'}
  },
  {
    name: 'Portos',
    iconComponent: { name: 'nav-icon fas fa-anchor'},
    url: '/portos',  
  },
  {
    name: 'Usuários',
    url: '/usuarios',
    iconComponent: { name: 'nav-icon fas fa-regular fa-user'}
  },
  
];
