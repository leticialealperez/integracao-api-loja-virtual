import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	buscarProdutos,
	buscarTodosProdutos,
} from '../../store/modules/produtos/produtosSlice';
import { Ordem } from '../../store/modules/produtos/typeProdutosRequests';

const Welcome: React.FC = () => {
	const [nome, setNome] = useState('');
	const [ordemNome, setOrdemNome] = useState<Ordem | undefined>();
	const [ordemPreco, setOrdemPreco] = useState<Ordem | undefined>();
	const [valorMin, setValorMin] = useState('');
	const [valorMax, setValorMax] = useState('');

	const { loading, mensagem } = useAppSelector((state) => state.produtos);
	const produtos = useAppSelector(buscarTodosProdutos);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(buscarProdutos({ nome_produto: nome }));
	}, [nome, dispatch]);

	useEffect(() => {
		dispatch(buscarProdutos({ ordem_nome: ordemNome }));
	}, [ordemNome, dispatch]);

	useEffect(() => {
		dispatch(buscarProdutos({ ordem_preco: ordemPreco }));
	}, [ordemPreco, dispatch]);

	const handleBlur = () => {
		dispatch(
			buscarProdutos({
				valor_min: +valorMin,
				valor_max: +valorMax,
			}),
		);
	};

	return (
		<div className="App">
			{/* EXEMPLO DE UTILIZAÇÃO DE UM ESTADO GLOBAL NA VIEW / COMPONENTE */}
			{/* {!produtos.length && <p>Não existem produtos a ser listado!</p>} */}

			{!mensagem && <p>Não existem produtos a ser listado!</p>}
			{mensagem && (
				<p>
					{loading ? '♾️' : ''}
					{mensagem}
				</p>
			)}

			<div>
				{produtos.map((p) => (
					<div key={p.id} style={{ border: '1px solid black' }}>
						<h4>{p.nome}</h4>
						<p>{p.descricao}</p>
						<p>R$ {p.preco.toFixed(2)}</p>
						<p>{p.ativo ? '✅' : '❌'}</p>
					</div>
				))}
			</div>

			<div style={{ margin: '15px 5px' }}>
				<div>
					<label htmlFor="buscaNome">Filtrar pelo nome: </label>
					<input
						type="text"
						id="buscaNome"
						value={nome}
						onChange={(ev) => setNome(ev.target.value)}
					/>
				</div>

				<div>
					<span>Ordenar por nome: </span>

					<input
						type="radio"
						name="nomeOrdem"
						id="nomeCresc"
						value="cresc"
						onChange={(ev) => {
							if (ev.target.checked) {
								setOrdemNome(ev.target.value as Ordem);
							}
						}}
					/>
					<label htmlFor="nomeCresc">A-Z</label>

					<input
						type="radio"
						name="nomeOrdem"
						id="nomeDecresc"
						value="decresc"
						onChange={(ev) => {
							if (ev.target.checked) {
								setOrdemNome(ev.target.value as Ordem);
							}
						}}
					/>
					<label htmlFor="nomeCresc">Z-A</label>
				</div>

				<div>
					<span>Ordenar por preço: </span>

					<input
						type="radio"
						name="precoOrdem"
						id="precoCresc"
						value="cresc"
						onChange={(ev) => {
							if (ev.target.checked) {
								setOrdemPreco(ev.target.value as Ordem);
							}
						}}
					/>
					<label htmlFor="precoCresc">Do maior para o menor</label>

					<input
						type="radio"
						name="precoOrdem"
						id="precoDecresc"
						value="decresc"
						onChange={(ev) => {
							if (ev.target.checked) {
								setOrdemPreco(ev.target.value as Ordem);
							}
						}}
					/>
					<label htmlFor="precoDecresc">Do menor para o maior</label>
				</div>

				<div>
					<div>
						<label htmlFor="valorMin">Valor Minimo: </label>
						<input
							type="number"
							name="valorMin"
							id="valorMin"
							value={valorMin}
							onChange={(ev) => setValorMin(ev.target.value)}
							onBlur={handleBlur}
						/>
					</div>

					<div>
						<label htmlFor="valorMin">Valor Maximo: </label>
						<input
							type="number"
							name="valorMax"
							id="valorMax"
							value={valorMax}
							onChange={(ev) => setValorMax(ev.target.value)}
							onBlur={handleBlur}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
