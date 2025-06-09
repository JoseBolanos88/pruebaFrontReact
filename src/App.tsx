import './App.css'
import UploadCSV from './containers/client/ClientUploadFile'
import ClientsTable from './containers/client/ClientTable'
import Layout from './containers/layout/Layout'
import 'primereact/resources/themes/fluent-light/theme.css'; // Tema (puedes cambiar el nombre del tema si prefieres otro)
import 'primereact/resources/primereact.min.css'; // Estilos base de PrimeReact
import 'primeicons/primeicons.css'; // Estilos para los íconos de PrimeIcons

function App() {

  return (
    <div className="p-0 m-0">
      <Layout>
        <UploadCSV />
        <ClientsTable />
      </Layout>
    </div>
  )
}

export default App
