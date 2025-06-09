import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { setClients, setError, setLoading } from '../../redux/clientSlice';
import { setProducts, setErrorProd, setLoadingProd } from '../../redux/productSlice'; 
import { RootState } from '../../redux/store';
import { ProgressSpinner } from 'primereact/progressspinner';
import { deleteAllClients, getClientBySearchTerm, getClients, getProducts } from '../../api/client.api';
import { Button } from 'primereact/button';
import { Client } from '../../types/client.entity';
import { Product } from '../../types/product.entity';
import ClientDialogDetail from './ClientDialogDetail';
import ProductDialogDetail from './ProductDialogDetail';

const ClientsTable: React.FC = () => {
    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector((state: RootState) => state.clients);
    const { products, loadingProd, errorProd } = useSelector((state: RootState) => state.product);
    const [searchTerm, setSearchTerm] = useState('');
    const [showClientsDetailModal, setShowClientsDetailModal] = useState(false);
    const [showProductsDetailModal, setShowProductsDetailModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                dispatch(setLoading());
                const response = await getClients();
                dispatch(setClients(response.data));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    dispatch(setError(error.message || 'Error al obtener los datos'));
                } else {
                    dispatch(setError('Error desconocido'));
                }
            }
        };

        const fetchProducts = async () => {
            try {
                dispatch(setLoadingProd());
                const response = await getProducts();
                dispatch(setProducts(response.data));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    dispatch(setErrorProd(error.message || 'Error al obtener los datos'));
                } else {
                    dispatch(setErrorProd('Error desconocido'));
                }
            }
        };

        fetchClients();
        fetchProducts();
    }, [dispatch]);


    const apiSearch = async (term: string) => {
        try {
            const response = await getClientBySearchTerm(term);
            console.log({ response })
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const handlerSerchTerm = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        console.log("Nombre a buscar [",e.target.value,"]");
        const data = await apiSearch(e.target.value);
        dispatch(setClients(data));
    }

    const actionBodyTemplate = (rowData: Client) => {
        return (
            <div>
                <Button icon='pi pi-eye' className="p-button-text" onClick={() => handleWatchModal(rowData)} />
            </div>
        );
    };

    const handleWatchModal = (rowData: Client) => {
        console.log('Ver detalle del usuario:', rowData);
        setShowClientsDetailModal(true);
        setSelectedClient(rowData);
    };

    const handleDeleteData = async () => {
        try {
            const response = await deleteAllClients();
            console.log({ response });
            if ([200, 204].includes(response.status)) {
                const responseClient = await getClients();
                dispatch(setClients(responseClient.data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Listado de Usuarios</h2>
            <div className='grid grid-cols-2 gap-4'>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded mt-4 max-w-xs"
                    placeholder="Buscar por nombre o correo electrónico"
                    value={searchTerm}
                    onChange={handlerSerchTerm}
                />
                {clients.length > 0 && (
                    <>
                        <div className='flex flex-row justify-end items-center'>
                            <Button className="p-2 border border-gray-300 rounded mt-4" label="Eliminar todos" icon="pi pi-trash" rounded outlined severity="danger" aria-label="Cancel" onClick={handleDeleteData} />
                        </div>
                    </>
                )}
            </div>
            {loading ? (
                <div className='mt-3'>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" />
                </div>
            ) : error ? (
                <div className="text-red-500 mt-3">{error}</div>
            ) : clients.length !== 0 ? (
                <div className="card mt-6">
                    <DataTable value={clients} paginator rows={5} stripedRows size='large' tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="Id." style={{ padding: '0.75rem 0rem' }} />
                        <Column field="username" header="Nombre" style={{ padding: '0.75rem 0rem' }} />
                        <Column field="email" header="Correo electrónico" style={{ padding: '0.75rem 0rem' }} />
                        <Column body={actionBodyTemplate} style={{ textAlign: 'center', padding: '0.75rem 0rem' }} />
                    </DataTable>
                </div>
            ) : (
                <p>No hay Usuarios que mostrar</p>
            )}
            <ClientDialogDetail visible={showClientsDetailModal} setVisible={setShowClientsDetailModal} client={selectedClient} />

            <h2 className="text-2xl font-semibold">Listado de Productos</h2>
            {loading ? (
                <div className='mt-3'>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" />
                </div>
            ) : error ? (
                <div className="text-red-500 mt-3">{error}</div>
            ) : products.length !== 0 ? (
                <div className="card mt-6">
                    <DataTable value={products} paginator rows={5} stripedRows size='large' tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="Id." style={{ padding: '0.75rem 0rem' }} />
                        <Column field="name" header="Nombre" style={{ padding: '0.75rem 0rem' }} />
                        <Column field="descripcion" header="Descripcion del Producto" style={{ padding: '0.75rem 0rem' }} />
                        <Column field="price" header="Precio del producto" style={{ padding: '0.75rem 0rem' }} />
                        <Column field="category_id" header="Codigo categoria" style={{ padding: '0.75rem 0rem' }} />
                        <Column body={actionBodyTemplate} style={{ textAlign: 'center', padding: '0.75rem 0rem' }} />
                    </DataTable>
                </div>
            ) : (
                <p>No hay Usuarios que mostrar</p>
            )}
            <ProductDialogDetail visible={showProductsDetailModal} setVisible={setShowProductsDetailModal} product={selectedProduct} />            
        </div>

        




    );
};

export default ClientsTable;
