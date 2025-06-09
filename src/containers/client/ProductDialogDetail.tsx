import { Dialog } from "primereact/dialog";
import { Product } from "../../types/product.entity"

interface ProductDialogDetail {
    visible: boolean;
    setVisible: (value: boolean) => void;
    product: Product | null;
}

const ProductDialogDetail: React.FC<ProductDialogDetail> = ({ visible, setVisible, product }) => {
    return (
        <Dialog header="Detalle Producto" visible={visible} style={{ width: '50vw', padding: '2rem', backgroundColor: 'white' }} onHide={() => { if (!visible) return; setVisible(false); }}>
            <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Nombre</h3>
                        <h4>{product?.name}</h4>
                    </div>
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Descripcion</h3>
                        <h4>{product?.descripcion}</h4>
                    </div>
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Precio</h3>
                        <h4>{product?.price}</h4>
                    </div>        
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Categoria</h3>
                        <h4>{product?.category_id}</h4>
                    </div>                                              
                </div>

            </div>
        </Dialog>
    )
}
export default ProductDialogDetail