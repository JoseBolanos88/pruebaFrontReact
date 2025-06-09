import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    descripcion: string;
    price: number;
    category_id:number;
}

interface ProductState {
    products: Product[] | [];
    loadingProd: boolean;
    errorProd: string | null;
}

const initialState: ProductState = {
    products: [],
    loadingProd: false,
    errorProd: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoadingProd: (state) => {
            state.loadingProd = true;
        },
        setProducts: (state, action: PayloadAction<Array<Product>>) => {
            state.products = action.payload;
            state.loadingProd = false;
            state.errorProd = null;
        },
        setErrorProd: (state, action: PayloadAction<string>) => {
            state.errorProd = action.payload;
            state.loadingProd = false;
        },
        clearProducts: (state) => {
            state.products = [];
            state.errorProd = null;
            state.loadingProd = false;
        },
    },
});

export const { setLoadingProd, setProducts, setErrorProd, clearProducts } = productSlice.actions;
export default productSlice.reducer;
