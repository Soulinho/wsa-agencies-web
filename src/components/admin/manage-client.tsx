import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../Header';
import NavFooter from './NavFooter';
import ClientRegistrationModal from './ClientRegistrationModal';
import { createPortal } from 'react-dom';

interface Client {
  cliente: string;
  pais: string;
  navesActivas: number;
  navesCompletadas: number;
}

interface ActionMenuProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
}

const ActionMenu = ({ isOpen, position, onClose }: ActionMenuProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[200]"
      onClick={onClose}
    >
      <div 
        className="absolute w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Ver detalles</button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Editar</button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm">Eliminar</button>
      </div>
    </div>,
    document.body
  );
};

const ManageClient = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const clients: Client[] = [
    { cliente: 'Marco Company', pais: 'Panama', navesActivas: 5, navesCompletadas: 2 },
    { cliente: 'Naviera Chile', pais: 'Chile', navesActivas: 3, navesCompletadas: 8 },
    { cliente: 'Ships & Co', pais: 'Peru', navesActivas: 2, navesCompletadas: 4 },
  ];

  const handleMenuClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (activeMenu === index) {
      setActiveMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = rect.left - 180;
    let top = rect.top + rect.height + 5;
    
    if (left < 10) {
      left = rect.right - 192;
    }
    
    if (viewportWidth < 768) {
      left = Math.max(10, Math.min(left, viewportWidth - 202));
    }
    
    if (top + 120 > viewportHeight) {
      top = rect.top - 125;
    }
    
    setMenuPosition({ top, left });
    setActiveMenu(index);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (activeMenu !== null) {
        setActiveMenu(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu]);

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Gestionar Clientes</h1>
        <button 
          onClick={() => navigate('/admin')}
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
                placeholder="Buscar cliente"
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="border rounded-lg px-4 py-2 w-full md:w-48">
              <option value="">País</option>
              <option value="panama">Panama</option>
              <option value="chile">Chile</option>
              <option value="peru">Peru</option>
            </select>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-[220px] bg-[#00A72C] text-white font-bold px-4 h-[50px] rounded-lg hover:bg-[#008f25]"
          >
            + Nuevo Cliente
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full">
              <thead className="bg-[#00335F] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Cliente</th>
                  <th className="px-6 py-3 text-left">País</th>
                  <th className="px-6 py-3 text-left">Naves activas</th>
                  <th className="px-6 py-3 text-left">Naves Completadas</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index} className="border-b border-[#cacaca]">
                    <td className="px-6 py-4">{client.cliente}</td>
                    <td className="px-6 py-4">{client.pais}</td>
                    <td className="px-6 py-4">{client.navesActivas}</td>
                    <td className="px-6 py-4">{client.navesCompletadas}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => handleMenuClick(e, index)}
                        className="hover:bg-gray-100 p-1 rounded-full"
                      >
                        <MoreVertIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ActionMenu 
        isOpen={activeMenu !== null}
        position={menuPosition}
        onClose={closeMenu}
      />

      <ClientRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <NavFooter />
    </div>
  );
};

export default ManageClient;
