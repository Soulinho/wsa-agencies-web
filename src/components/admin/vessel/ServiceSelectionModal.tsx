import { useState } from 'react';
import SubServiceSelectionModal from './SubServiceSelectionModal';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceSelectionModal = ({ isOpen, onClose }: ServiceSelectionModalProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showSubServices, setShowSubServices] = useState(false);

  if (!isOpen) return null;

  const services = [
    'Crew Services',
    'Maritime Support',
    'Maritime Solutions',
    'Last Mile',
    'Antartic Services',
    'Full Agent'
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
          <h2 className="text-[26px] font-bold text-[#003366]">Seleccionar Servicios</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => {
                setSelectedService(service);
                setShowSubServices(true);
              }}
              className="border rounded-lg p-3 cursor-pointer text-[#00335F] font-medium hover:bg-[#E6F7FF] hover:border-[#70C8CA] transition-all"
            >
              {service}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
            onClick={onClose}
          >
            Confirmar
          </button>
        </div>
      </div>
      {selectedService && (
        <SubServiceSelectionModal 
          isOpen={showSubServices}
          onClose={() => setShowSubServices(false)}
          serviceName={selectedService}
        />
      )}
    </div>
  );
};

export default ServiceSelectionModal;
