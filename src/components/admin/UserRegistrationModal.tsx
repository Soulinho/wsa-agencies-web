import { useState } from 'react';
import logoLogin from '../../assets/logo-login.png';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
}

const UserRegistrationModal = ({ isOpen, onClose, onUserCreated }: UserRegistrationModalProps) => {
  const [empresa, setEmpresa] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [fono, setFono] = useState('');
  const [rol, setRol] = useState('');
  const [pais, setPais] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!empresa || !nombre || !email || !fono || !rol || !pais || !usuario || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          empresa_cliente: empresa,
          nombre_cliente: nombre,
          email,
          telefono: fono,
          tipo_usuario: rol,
          pais_cliente: pais,
          username: usuario,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al registrar el usuario.');
      } else {
        setEmpresa('');
        setNombre('');
        setEmail('');
        setFono('');
        setRol('');
        setPais('');
        setUsuario('');
        setPassword('');
        if (onUserCreated) onUserCreated();
        onClose();
      }
    } catch (err) {
      setError('Error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex flex-col items-center mb-6 relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-3xl text-gray-500 hover:text-gray-700 font-light"
          >
            ×
          </button>
          <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mb-4" />
          <h2 className="text-[26px] font-bold text-[#003366]">Registrar Usuario</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Empresa</label>
            <input
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ingrese nombre de la empresa"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Nombre completo</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese nombre completo"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese correo electrónico"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Fono de contacto</label>
            <input
              type="tel"
              value={fono}
              onChange={(e) => setFono(e.target.value)}
              placeholder="Ingrese fono de contacto"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Rol de usuario</label>
            <div className="relative">
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-black appearance-none bg-white"
                disabled={loading}
              >
                <option value="">Seleccione rol de usuario</option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="TRABAJADOR">Trabajador</option>
                <option value="CLIENTE">Cliente</option>
                <option value="ASISTENTE">Asistente</option>
                <option value="ADMINISTRATIVO">Administrativo</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">País</label>
            <input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Ingrese país"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">User</label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese nombre de usuario"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la contraseña de usuario"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-[210px] font-bold py-2 px-4 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00335F] hover:bg-[#002347]'
              }`}
            >
              {loading ? 'Registrando...' : 'Registrar Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationModal;
