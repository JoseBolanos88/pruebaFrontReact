import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setClients, setError, setLoading } from '../../redux/clientSlice';
import { getClients } from '../../api/client.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadCSV: React.FC = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        let rowIndex = 0;

        if (file) {
            const reader = new FileReader();
            setFile(file);
            if (!validateCSVExt(file)) return;
            reader.onload = () => {
                const content = reader.result as string;
                const rows = content.split('\n');
                console.log("rows [",rows,"]")
                // const isValidCSV = rows.every(row => {
                //     rowIndex++
                //     console.log("rowIndex[",rowIndex,"]")
                //     console.log("row.split[",row.split(',').length,"]")
                //     return row.split(',').length === 3;
                // });

                // console.log("isValidCSV [",isValidCSV,"]")
                // if (isValidCSV) {
                    console.log("Archivo CSV válido");
                    setErrorMessage(null);
                // } else {
                //     setErrorMessage(`Error en la fila ${rowIndex}: Se esperaban 3 columnas`);

                //     console.error("El archivo CSV tiene un formato incorrecto");
                // }
            };

            reader.onerror = () => {
                setErrorMessage("Hubo un error al leer el archivo CSV.");
                console.error("Hubo un error al leer el archivo CSV.");
            };

            reader.readAsText(file);
        }
    };

    const validateCSVExt = (file: File) => {
        const validExtensions = ['csv'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension) return false;
        const validateExtension = validExtensions.includes(fileExtension);
        if (!validateExtension) {
            setErrorMessage('El archivo no es un CSV válido');
        }
        return validateExtension;
    };

    const handleUpload = async () => {
        if (!file) {
          dispatch(setError('Por favor, selecciona un archivo CSV'));
          return;
        }
      
        const formData = new FormData();
        formData.append('csvFile', file); // Usa un nombre consistente con tu backend
      
        try {
          dispatch(setLoading()); // Asegúrate de que setLoading maneje un estado booleano
      
          // 1. Subir el archivo al backend
          const uploadResponse = await axios.post(
            'http://localhost:3000/api/users/bulk',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                // Si tu backend requiere autenticación:
                // Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
      
          // 2. Verificar respuesta del backend
          if (uploadResponse.status !== 200) {
            throw new Error(uploadResponse.data.message || 'Error en el servidor');
          }
      
          // 3. Actualizar la lista de clientes
          const responseClient = await getClients();
          dispatch(setClients(responseClient.data));
      
          // Feedback al usuario
          toast.success('Archivo CSV cargado exitosamente'); // Usar react-toastify o similar
        } catch (error) {
          let errorMessage = 'Error al cargar el archivo';
          
          if (axios.isAxiosError(error)) {
            // Manejo específico para errores de Axios
            errorMessage = error.response?.data?.message || error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
      
          dispatch(setError(errorMessage));
          console.error('Error en handleUpload:', error);
        } finally {
          dispatch(setLoading());
        }
      };    

    return (
        <div className="p-4 mt-9 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Cargar archivo CSV</h2>
            <div className='flex flex-col mt-4'>
                <input type="file" accept='.csv' onChange={handleFileUpload} />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    className="bg-blue-500 text-white p-2 mt-4"
                    onClick={handleUpload}
                    disabled={!file || !!errorMessage}
                >
                    Subir archivo
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
