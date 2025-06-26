import logoLogin from '../../assets/logo-login.png';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserRegistrationModal = ({ isOpen, onClose }: UserRegistrationModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
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
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Empresa</label>
            <div className="relative">
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-black appearance-none bg-white">
                <option value="" className="text-black">Seleccione una empresa</option>
                <option value="empresa1" className="text-black">Empresa 1</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Nombre completo</label>
            <input 
              type="text" 
              placeholder="Ingrese nombre completo"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">E-Mail</label>
            <input 
              type="email" 
              placeholder="Ingrese correo electrónico"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Fono de contacto</label>
            <input 
              type="tel" 
              placeholder="Ingrese fono de contacto"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Rol de usuario</label>
            <div className="relative">
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-black appearance-none bg-white">
                <option value="" className="text-black">Seleccione rol de usuario</option>
                <option value="admin" className="text-black">Administrador</option>
                <option value="operator" className="text-black">Operador</option>
                <option value="client" className="text-black">Cliente</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">País</label>
            <div className="relative">
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-black appearance-none bg-white">
                <option value="" className="text-black">Seleccione un país</option>
                <option value="pais1" className="text-black">País 1</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">User</label>
            <input 
              type="text" 
              placeholder="Ingrese nombre de usuario"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Password</label>
            <input 
              type="password" 
              placeholder="Ingrese la contraseña de usuario"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>
          
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-full md:w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationModal;
