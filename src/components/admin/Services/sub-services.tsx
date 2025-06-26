import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../Header';
import NavFooter from './../NavFooter';
import SubServiceRegistrationModal from './SubServiceRegistrationModal';

interface SubService {
  nombre: string;
  descripcion: string;
  serviceName: string;
}

const SubServices = () => {
  const navigate = useNavigate();
  const { serviceName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subServices: SubService[] = [
    { 
      nombre: 'Crew Change',
      descripcion: 'Servicio de cambio de tripulación',
      serviceName: serviceName || ''
    },
    { 
      nombre: 'Medical Assistance',
      descripcion: 'Asistencia médica para la tripulación',
      serviceName: serviceName || ''
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">
          Sub-servicios de {serviceName}
        </h1>
        <button 
          onClick={() => navigate('/admin/manage-services')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar sub-servicio"
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-[220px] bg-[#00A72C] text-white font-bold px-4 h-[50px] rounded-lg hover:bg-[#008f25]"
          >
            + Nuevo Sub-servicio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subServices.map((subService, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#003366]">{subService.nombre}</h3>
                  <p className="text-gray-600 text-sm">{subService.descripcion}</p>
                </div>
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
              <button 
                onClick={() => navigate(`/admin/services/${serviceName}/${subService.nombre}/fields`)}
                className="bg-[#003366] text-white text-sm font-bold py-2 px-4 rounded hover:bg-[#003F7D] w-full"
              >
                Ver Campos
              </button>
            </div>
          ))}
        </div>
      </div>
      <SubServiceRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <NavFooter />
    </div>
  );
};

export default SubServices;
