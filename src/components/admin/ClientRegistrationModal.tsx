import logoLogin from '../../assets/logo-login.png';

interface ClientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientRegistrationModal = ({ isOpen, onClose }: ClientRegistrationModalProps) => {
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
          <h2 className="text-[26px] font-bold text-[#003366]">Registrar Cliente</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#00335F]">Nombre de empresa</label>
            <input 
              type="text" 
              placeholder="Ingrese nombre de empresa"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">País</label>
            <div className="relative">
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-black appearance-none bg-white">
                <option value="" className="text-black">Seleccione país</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Dirección</label>
            <input 
              type="text" 
              placeholder="Ingrese dirección"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Teléfono</label>
            <input 
              type="tel" 
              placeholder="Ingrese teléfono"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00335F]">Correo Institucional</label>
            <input 
              type="email" 
              placeholder="Ingrese correo institucional"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[#00335F]">Contacto Operativo</h3>
            
            <div>
              <label className="block text-sm font-bold text-[#00335F]">Nombre</label>
              <input 
                type="text" 
                placeholder="Ingrese nombre"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Cargo</label>
              <input 
                type="text" 
                placeholder="Ingrese cargo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Correo</label>
              <input 
                type="email" 
                placeholder="Ingrese correo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Teléfono</label>
              <input 
                type="tel" 
                placeholder="Ingrese teléfono"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[#00335F]">Contacto DA</h3>
            
            <div>
              <label className="block text-sm font-bold text-[#00335F]">Nombre</label>
              <input 
                type="text" 
                placeholder="Ingrese nombre"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Cargo</label>
              <input 
                type="text" 
                placeholder="Ingrese cargo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Correo</label>
              <input 
                type="email" 
                placeholder="Ingrese correo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00335F]">Teléfono</label>
              <input 
                type="tel" 
                placeholder="Ingrese teléfono"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-[#CACACA]" 
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              className="w-full md:w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
            >
              Registrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientRegistrationModal;
