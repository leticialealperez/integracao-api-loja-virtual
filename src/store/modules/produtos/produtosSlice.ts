import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { RootState } from '../..';
import {
	FiltrosRequest,
	Produto,
	ResponseGETProdutos,
} from './typeProdutosRequests';
const apiRequests = axios.create({
	baseURL: 'https://api-loja-virtual.onrender.com',
});

// GET
// dispatch(buscarProdutos)
// ACTION TYPE = produtos/listar
// ACTION PAYLOAD = return dados
export const buscarProdutos = createAsyncThunk(
	'produtos/listar',
	async (filtros: FiltrosRequest) => {
		try {
			// aqui executa o sucesso da requisição
			const resposta = await apiRequests.get('/produtos', {
				params: filtros,
			});

			return resposta.data as ResponseGETProdutos; // body do response
		} catch (error) {
			// aqui captura todos os erros de requisição
			if (error instanceof AxiosError) {
				console.log(error);

				const retorno: ResponseGETProdutos = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
					produtos: error.response?.data.produtos,
				};

				return retorno;
			}

			return {
				sucesso: false,
				mensagem: 'Valor inválido.',
				produtos: [],
			};
		}
	},
);

/*

produtos = 	{
				ids: [],
				entities: {}
			},
			loading: false,
			mensagem: ''

*/
// TODA VEZ QUE OS DADOS A SEREM MANIPULADOS NO FRONT FOREM UMA LISTA ARRAY - ADAPTER
const adapterProduto = createEntityAdapter<Produto>({
	selectId: (produto) => produto.id,
});

// selectors => buscarTodos, buscarPorID - useAppSelector(buscarTodosProdutos)
export const { selectAll: buscarTodosProdutos } = adapterProduto.getSelectors(
	(state: RootState) => state.produtos,
);

// PENDING - LOADING
// FULLFILED - RESOLVIDA
// REJECT

const produtosSlice = createSlice({
	name: 'produtos',
	initialState: adapterProduto.getInitialState({
		loading: false,
		mensagem: '',
	}),
	reducers: {},
	extraReducers: (builder) => {
		// get
		builder.addCase(buscarProdutos.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Dados dos produtos sendo carregados...';
		});

		builder.addCase(buscarProdutos.fulfilled, (estadoAtual, acao) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = acao.payload.mensagem;

			adapterProduto.setAll(estadoAtual, acao.payload.produtos);
		});

		builder.addCase(buscarProdutos.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem =
				'Requisição rejeitada. Por favor, verifique.';
		});

		// post

		// put

		// delete
	},
});

export default produtosSlice.reducer;
