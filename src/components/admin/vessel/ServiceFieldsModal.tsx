import logoLogin from '../../../assets/logo-login.png';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';
import PredefinedFieldsModal from './PredefinedFieldsModal';

interface ServiceFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subServiceName: string;
}

const ServiceFieldsModal = ({ isOpen, onClose, subServiceName }: ServiceFieldsModalProps) => {
  const [isPredefinedModalOpen, setIsPredefinedModalOpen] = useState(false);

  if (!isOpen) return null;

  const fields: string[] = []; 

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[120] p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-[800px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex flex-col items-center mb-8 relative">
          <button 
            onClick={onClose} 
            className="absolute right-0 top-0 text-3xl text-gray-500 hover:text-gray-700 font-light"
          >
            ×
          </button>
          <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mb-4" />
          <h2 className="text-[26px] font-bold text-[#003366]">Campos de {subServiceName}</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#cacaca]">
                <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/2">Fields</th>
                <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/4">Notes</th>
                <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    No hay campos registrados
                  </td>
                </tr>
              ) : (
                fields.map((field, index) => (
                  <tr key={index} className="border-b border-[#cacaca]">
                    <td className="py-4">
                      <span className="text-[#000000] font-medium">
                        {index + 1}. {field}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <ChatBubbleIcon className="text-[#003366]" />
                      </button>
                    </td>
                    <td className="py-4">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <DeleteIcon className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start mt-8">
          <button 
            onClick={() => setIsPredefinedModalOpen(true)}
            className="w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347] flex items-center justify-center gap-2"
          >
            <FormatListBulletedIcon className="text-xl" />
            <span>Añadir campo</span>
          </button>
        </div>
      </div>
      <PredefinedFieldsModal 
        isOpen={isPredefinedModalOpen}
        onClose={() => setIsPredefinedModalOpen(false)}
      />
    </div>
  );
};

export default ServiceFieldsModal;
