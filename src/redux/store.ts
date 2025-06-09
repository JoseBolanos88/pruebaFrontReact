import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice';
import productReducer from './productSlice';

export const store = configureStore({
    reducer: {
        clients: clientReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;