import { combineReducers } from '@reduxjs/toolkit';

import produtosSlice from './produtos/produtosSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	produtos: produtosSlice,
});

export default rootReducer;
