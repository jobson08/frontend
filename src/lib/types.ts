export interface Tenant {
  id: string;
  name: string;
  slug: string;
  cpfCnpj?: string; // Novo campo
  plan: string;
  domain?: string;
  siteData?: { title: string; description: string; logoUrl: string; primaryColor: string };
  status: 'ativo' | 'suspenso' | 'teste' | 'cancelado';
  users?: User[];
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'ADMIN' | 'ALUNO' | 'SUPERADMIN' | 'PROFESSOR' | 'RH' | 'SEGURANCA' | 'OUTRO';
  departamento?: string;
  tenantId: string;
  tenant?: Tenant;
}

export interface Responsavel {
  id: string;
  nome: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

export interface Atividade {
  id: string;
  nome: string; // Ex.: "Futebol", "CrossFit", "Academia"
  tenantId: string;
  requerIdade: boolean;
}

export interface CategoriaIdade {
  id: string;
  nome: string; // Ex.: "Sub-7"
  idadeMaxima: number;
  atividadeId: string;
  tenantId: string;
}

export interface Aluno {
  id: string;
  name: string;
  cpf?: string; // Novo campo
  birthDate?: string;
  peso?: number;
  altura?: number;
  categoriaId?: string;
  categoria?: CategoriaIdade & { atividade: Atividade };
  responsavel?: Responsavel;
  responsavelId?: string;
  tenantId: string;
  desenvolvimentos?: DesenvolvimentoMensal[];
  desempenhos?: DesempenhoAtividade[];
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

export interface DesenvolvimentoMensal {
  id: string;
  alunoId: string;
  mes: number;
  ano: number;
  comentario?: string;
}

export interface DesempenhoAtividade {
  id: string;
  alunoId: string;
  atividade: string;
  data: string;
  metrica: any;
  comentario?: string;
}