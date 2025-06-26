import { useState } from 'react';
import logoLogin from '../../../assets/logo-login.png';
import ServiceFieldsModal from './ServiceFieldsModal';

interface SubServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const SubServiceSelectionModal = ({ isOpen, onClose, serviceName }: SubServiceSelectionModalProps) => {
  const [selectedSubService, setSelectedSubService] = useState<string | null>(null);
  const [showFields, setShowFields] = useState(false);

  if (!isOpen) return null;

  const crewServicesSubServices = [
    'Crew Change',
    'Medical Assistance'
  ];

  return (
    <div 
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[110] p-4"
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
          <h2 className="text-[26px] font-bold text-[#003366]">Sub-servicios de {serviceName}</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <div className="space-y-3">
          {crewServicesSubServices.map((subService, index) => (
            <div 
              key={index} 
              onClick={() => {
                setSelectedSubService(subService);
                setShowFields(true);
              }}
              className="border rounded-lg p-3 cursor-pointer text-[#00335F] font-medium hover:bg-[#E6F7FF] hover:border-[#70C8CA] transition-all"
            >
              {subService}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#003F7D]"
            onClick={onClose}
          >
            Confirmar
          </button>
        </div>
      </div>
      {selectedSubService && (
        <ServiceFieldsModal 
          isOpen={showFields}
          onClose={() => setShowFields(false)}
          subServiceName={selectedSubService}
        />
      )}
    </div>
  );
};

export default SubServiceSelectionModal;
