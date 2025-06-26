import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from '../../Header';
import NavFooter from './../NavFooter';
import FieldRegistrationModal from './FieldRegistrationModal';

const ServiceFields = () => {
  const navigate = useNavigate();
  const { subServiceName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    'Ok to board',
    'M&G airport SCL International arrival',
    'M&G airport SCL International departure',
    'M&G airport SCL domestic departure',
    'M&G airport SCL domestic arrival',
    'Transport local services',
    'Transport airport / port embarking',
    'Transport port / airport',
    'Transport airport / hotel',
    'Transport hotel / airport',
    'Transport hotel / port embarking',
    'Transport port / hotel',
    'Transport medical center / Port',
    'Transport Port / Medical center',
    'Transport airport SCL / hotel SCL',
    'Transport hotel SCL / airport SCL',
    'Hotel Check in',
    'Hotel Check out',
    'Embarking by launch',
    'Embarking Alongside',
    'Disembarking by launch',
    'Disembarking Alongside',
    'Service completed'
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">
          Campos de {subServiceName}
        </h1>
        <button 
          onClick={() => navigate(-1)}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar campo"
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-[220px] bg-[#00A72C] text-white font-bold px-4 h-[50px] rounded-lg hover:bg-[#008f25]"
          >
            + Nuevo Campo
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <span className="text-[#003366] font-medium">{field}</span>
              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreVertIcon />
                </button>
                {activeMenu === index && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Editar</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FieldRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <NavFooter />
    </div>
  );
};

export default ServiceFields;
