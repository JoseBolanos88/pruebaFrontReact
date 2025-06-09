import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className="p-0 m-0">
            <Navbar />
            <main className="container mx-auto p-9">
                {children}
            </main>
        </div>
    )
}
export default Layout