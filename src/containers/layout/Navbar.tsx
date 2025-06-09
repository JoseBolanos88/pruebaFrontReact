import { Menubar } from "primereact/menubar"

const Navbar: React.FC = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
            
        }
    ];

    return (
        <>
            <Menubar model={items} className="p-2" />
        </>
    )
}
export default Navbar