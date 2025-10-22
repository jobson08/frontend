export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  domain?: string;
  siteData?: { title: string; description: string };
  status: 'ativo' | 'suspenso' | 'teste' | 'cancelado';
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'ADMIN' | 'ALUNO' | 'SUPERADMIN' | 'PROFESSOR' | 'RH' | 'SEGURANCA' | 'OUTRO';
  departamento?: string;
}

export interface Responsavel {
  id: string;
  nome: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

export interface Aluno {
  id: string;
  name: string;
  birthDate?: string;
  responsavel?: Responsavel;
  responsavelId?: string;
}

export interface Mensalidade {
  id: string;
  alunoId?: string;
  userId?: string;
  valor: number;
  vencimento: string;
  status: string;
  tipo: 'aluno' | 'funcionario';
  aluno?: Aluno;
  user?: User;
}