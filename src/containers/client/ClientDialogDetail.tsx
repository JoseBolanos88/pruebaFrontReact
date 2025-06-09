import { Dialog } from "primereact/dialog";
import { Client } from "../../types/client.entity"

interface ClientDialogDetail {
    visible: boolean;
    setVisible: (value: boolean) => void;
    client: Client | null;
}

const ClientDialogDetail: React.FC<ClientDialogDetail> = ({ visible, setVisible, client }) => {
    return (
        <Dialog header="Detalle Usuario" visible={visible} style={{ width: '50vw', padding: '2rem', backgroundColor: 'white' }} onHide={() => { if (!visible) return; setVisible(false); }}>
            <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Nombre</h3>
                        <h4>{client?.username}</h4>
                    </div>
                    <div className="col-6">
                        <h3 className="text-lg font-bold text-blue-500">Correo</h3>
                        <h4>{client?.email}</h4>
                    </div>                    
                </div>

            </div>
        </Dialog>
    )
}


export default ClientDialogDetail