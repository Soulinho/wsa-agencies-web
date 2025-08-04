import Header from '../Header';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavFooter from './NavFooter';
import UserRegistrationModal from './UserRegistrationModal';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiUser {
  _id: string;
  username: string;
  tipo_usuario: string;
  email: string;
  createdAt?: string;
  estado?: string;
}

interface GetUsersResponse {
  message: string;
  users: ApiUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

interface User {
  _id: string;
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
    <div className="fixed inset-0 z-[200]" onClick={onClose}>
      <div
        className="absolute w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Debounce para búsqueda en tiempo real
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reinicia la página cuando cambia la búsqueda
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchUsers = async (page = 1, role = '', search = '') => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Ajusta los parámetros para que coincidan con el backend
      const params: any = {
        page,
        limit: 10,
      };

      if (role) params.role = role;
      if (search) params.searchTerm = search;

      const { data } = await axios.get<GetUsersResponse>(`${API_URL}/users`, { params });

      if (data.users && data.users.length > 0) {
        setUsers(
          data.users.map((u) => ({
            _id: u._id,
            usuario: u.username,
            rol: u.tipo_usuario,
            email: u.email,
            fecha: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'No disponible',
            estado: u.estado || 'Activo',
          }))
        );
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
      setActiveMenu(null);
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error);
      setUsers([]);
      setErrorMsg('Error al cargar usuarios. Intente nuevamente más tarde.');
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  // Recarga usuarios cuando cambian página, filtro o búsqueda (con debounce)
  useEffect(() => {
    fetchUsers(currentPage, roleFilter, debouncedSearchTerm);
  }, [currentPage, roleFilter, debouncedSearchTerm]);

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

  const closeMenu = () => setActiveMenu(null);

  useEffect(() => {
    const handleScroll = () => {
      if (activeMenu !== null) setActiveMenu(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu]);

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Gestionar Usuarios</h1>
        <button onClick={() => navigate('/admin')} className="text-white absolute right-4">
          <ArrowBackIcon />
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filtros y búsqueda */}
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
            <select
              className="border rounded-lg px-4 py-2 w-full md:w-48"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1); // Reset página al cambiar filtro
              }}
            >
              <option value="">Tipo de usuario</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="OPERADOR">Operador</option>
              <option value="CLIENTE">Cliente</option>
              <option value="TRABAJADOR">Trabajador</option>
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-[220px] bg-[#00A72C] text-white font-bold px-4 h-[50px] rounded-lg hover:bg-[#008f25]"
          >
            + Nuevo usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        {loading ? (
          <div className="text-center py-6">Cargando usuarios...</div>
        ) : errorMsg ? (
          <div className="text-center py-6 text-red-600">{errorMsg}</div>
        ) : (
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
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500">
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user._id} className="border-b border-[#cacaca]">
                        <td className="px-6 py-4">{user.usuario}</td>
                        <td className="px-6 py-4">{user.rol}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.fecha}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">{user.estado}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={(e) => handleMenuClick(e, index)} className="hover:bg-gray-100 p-1 rounded-full">
                            <MoreVertIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Paginación */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="flex items-center px-3">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      <ActionMenu isOpen={activeMenu !== null} position={menuPosition} onClose={closeMenu} />
      <UserRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <NavFooter />
    </div>
  );
};

export default ManageUsers;
