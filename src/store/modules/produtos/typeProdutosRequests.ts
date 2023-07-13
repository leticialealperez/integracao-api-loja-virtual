export type Produto = {
	id: string;
	nome: string;
	descricao: string;
	preco: number;
	numeroSerie: string;
	quantidade: number;
	categorias: any[];
	ativo: boolean;
};

export type Ordem = 'cresc' | 'decresc';

export type FiltrosRequest = {
	valor_max?: number;
	valor_min?: number;
	ordem_nome?: Ordem;
	ordem_preco?: Ordem;
	nome_produto?: string;
};

export type ResponseGETProdutos = {
	sucesso: boolean;
	mensagem: string;
	produtos: Array<Produto>;
};

// export type CadastroRequest = {}

// export type AtualizarRequest = {}

// export type DeletarRequest = {}
