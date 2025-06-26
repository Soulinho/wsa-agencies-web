import Header from '../Header';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import NavFooter from './NavFooter';
import UserRegistrationModal from './UserRegistrationModal';

interface User {
  usuario: string;
  rol: string;
  email: string;
  fecha: string;
  estado: string;
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
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Editar</button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Habilitar Usuario</button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm">Eliminar</button>
      </div>
    </div>,
    document.body
  );
};

const ManageUsers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const users: User[] = [
    { usuario: 'Felipe-adm', rol: 'Administrador', email: 'felipe@admin.cl', fecha: '15/04/2025', estado: 'Activo' },
    { usuario: 'maria-wsa', rol: 'Operador', email: 'maria@wsa-agency.com', fecha: '01/05/2025', estado: 'Activo' },
    { usuario: 'juan-cliente', rol: 'Cliente', email: 'juan@gmail.com', fecha: '04/05/2025', estado: 'Activo' },
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
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Gestionar Usuarios</h1>
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
                placeholder="Buscar usuario"
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="border rounded-lg px-4 py-2 w-full md:w-48">
              <option value="">Tipo de usuario</option>
              <option value="admin">Administrador</option>
              <option value="operator">Operador</option>
              <option value="client">Cliente</option>
            </select>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-[220px] bg-[#00A72C] text-white font-bold px-4 h-[50px] rounded-lg hover:bg-[#008f25]"
          >
            + Nuevo usuario
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full">
              <thead className="bg-[#00335F] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Usuario</th>
                  <th className="px-6 py-3 text-left">Rol</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Fecha de registro</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-[#cacaca]">
                    <td className="px-6 py-4">{user.usuario}</td>
                    <td className="px-6 py-4">{user.rol}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.fecha}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {user.estado}
                      </span>
                    </td>
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

      <UserRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <NavFooter />
    </div>
  );
};

export default ManageUsers;
