import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import NavFooterOperator from './NavFooterOperator';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Vessel {
  daId: string;
  vesselName: string;
  port: string;
  country: string;
  eta: string;
  etb: string;
  etd: string;
  notes: boolean;
  client: string;
  operator: string;
  status: string;
}

interface ActionMenuProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  vesselId?: string;
  navigate: (path: string) => void;
}

const ActionMenu = ({ isOpen, position, onClose, vesselId, navigate }: ActionMenuProps) => {
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
        <button 
          onClick={() => navigate(`/operator/vessel-details/${vesselId}`)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
        >
          Ver detalles
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm">
          Eliminar
        </button>
      </div>
    </div>,
    document.body
  );
};

const ManageVesselsOperator = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const vessels: Vessel[] = [
    {
      daId: '202323',
      vesselName: 'Ocean Star',
      port: 'Valparaíso',
      country: 'Chile',
      eta: '24-04-2025',
      etb: '',
      etd: '26-04-2025',
      notes: true,
      client: "Marco's Company",
      operator: 'Juan Riquelme',
      status: 'Completed'
    },
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
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Gestionar Naves</h1>
        <button 
          onClick={() => navigate('/operator')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col w-full lg:w-auto gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative w-full md:w-[250px]">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by DA ID, Vessel Name, Port"
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full">
                <select className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Country</option>
                </select>
                <select className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Port</option>
                </select>
                <select className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Status</option>
                </select>
                <select className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Cliente</option>
                </select>
                <select className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Operador</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-[1200px]">
            <table className="w-full">
              <thead className="bg-[#00335F] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">DA ID</th>
                  <th className="px-6 py-3 text-left">Vessel Name</th>
                  <th className="px-6 py-3 text-left">Port</th>
                  <th className="px-6 py-3 text-left">País</th>
                  <th className="px-6 py-3 text-left">ETA</th>
                  <th className="px-6 py-3 text-left">ETB</th>
                  <th className="px-6 py-3 text-left">ETD</th>
                  <th className="px-6 py-3 text-left">Notes</th>
                  <th className="px-6 py-3 text-left">Cliente</th>
                  <th className="px-6 py-3 text-left">Operador</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {vessels.map((vessel, index) => (
                  <tr key={index} className="border-b border-[#cacaca]">
                    <td className="px-6 py-4">{vessel.daId}</td>
                    <td className="px-6 py-4 text-[#0066FF]">
                      <button
                        onClick={() => navigate(`/operator/vessel-details/${vessel.daId}`)}
                        className="text-[#00335F] hover:underline"
                      >
                        {vessel.vesselName}
                      </button>
                    </td>
                    <td className="px-6 py-4">{vessel.port}</td>
                    <td className="px-6 py-4">{vessel.country}</td>
                    <td className="px-6 py-4">{vessel.eta}</td>
                    <td className="px-6 py-4">{vessel.etb}</td>
                    <td className="px-6 py-4">{vessel.etd}</td>
                    <td className="px-6 py-4">
                      {vessel.notes && <ChatBubbleIcon className="text-gray-500" />}
                    </td>
                    <td className="px-6 py-4">{vessel.client}</td>
                    <td className="px-6 py-4">{vessel.operator}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => handleMenuClick(e, index)}
                        className="hover:bg-gray-100 p-1 rounded-full"
                      >
                        <MoreVertIcon />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        vessel.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        vessel.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {vessel.status}
                      </span>
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
        vesselId={activeMenu !== null ? vessels[activeMenu]?.daId : undefined}
        navigate={navigate}
      />

      <NavFooterOperator />
    </div>
  );
};

export default ManageVesselsOperator;
