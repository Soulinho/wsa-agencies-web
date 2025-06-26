import logoLogin from '../../../assets/logo-login.png';

interface FieldRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FieldRegistrationModal = ({ isOpen, onClose }: FieldRegistrationModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex flex-col items-center mb-8 relative">
          <button 
            onClick={onClose} 
            className="absolute right-0 top-0 text-3xl text-gray-500 hover:text-gray-700 font-light"
          >
            ×
          </button>
          <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mb-4" />
          <h2 className="text-[26px] font-bold text-[#003366]">Nuevo Campo</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#00335F] mb-2">
              Nombre del Campo
            </label>
            <input 
              type="text" 
              placeholder="Ingrese nombre del campo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-[#CACACA]" 
            />
          </div>
          
          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              className="w-full md:w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
            >
              Agregar Campo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldRegistrationModal;
