import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
    id: number;
    name: string;
    email: string;
    age: number;
}

interface ClientState {
    clients: Client[] | [];
    loading: boolean;
    error: string | null;
}

const initialState: ClientState = {
    clients: [],
    loading: false,
    error: null,
};

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setClients: (state, action: PayloadAction<Array<Client>>) => {
            state.clients = action.payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearClients: (state) => {
            state.clients = [];
            state.error = null;
            state.loading = false;
        },
    },
});

export const { setLoading, setClients, setError, clearClients } = clientSlice.actions;
export default clientSlice.reducer;
