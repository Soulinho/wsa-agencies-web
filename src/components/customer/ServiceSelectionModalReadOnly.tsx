import logoLogin from '../../assets/logo-login.png';

interface ServiceSelectionModalReadOnlyProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceSelectionModalReadOnly = ({ isOpen, onClose }: ServiceSelectionModalReadOnlyProps) => {
  if (!isOpen) return null;

  const services = [
    { name: 'Maritime Support', status: 'Completado' },
    { name: 'Maritime Solutions', status: 'En proceso' },
    { name: 'Last Mile', status: 'Pendiente' }
  ];

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
          <h2 className="text-[26px] font-bold text-[#003366]">Servicios Activos</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#00335F] font-medium">{service.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  service.status === 'Completado' ? 'bg-green-100 text-green-800' :
                  service.status === 'En proceso' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionModalReadOnly;
