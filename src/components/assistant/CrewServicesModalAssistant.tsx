import { useState } from 'react';
import logoLogin from '../../assets/logo-login.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';

interface CrewServicesModalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrewServicesModalAssistant = ({ isOpen, onClose }: CrewServicesModalAssistantProps) => {
  const [showFields, setShowFields] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<string>('');
  const [editingField, setEditingField] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<string>('');
  const [fieldsData, setFieldsData] = useState([
    { id: 1, name: 'Ok to board', date: '09/05/2025', notes: true, status: 'Completed' },
    { id: 2, name: 'M&G airport SCL international arrival', date: '09/05/2025', notes: false, status: 'Completed' },
    { id: 3, name: 'Transport airport / hotel', date: '09/05/2025', notes: false, status: 'Completed' },
    { id: 4, name: 'Transport hotel / port embarking', date: '09/05/2025', notes: false, status: 'Completed' },
    { id: 5, name: 'Hotel Check in', date: '09/05/2025', notes: false, status: 'In progress' },
    { id: 6, name: 'Hotel Check out', date: '13/05/2025', notes: false, status: 'Pending' },
    { id: 7, name: 'Embarking by launch', date: '13/05/2025', notes: false, status: 'Pending' },
    { id: 8, name: 'Service Completed', date: '13/05/2025', notes: false, status: 'Pending' }
  ]);

  if (!isOpen) return null;

  const handleDateEdit = (fieldId: number) => {
    const field = fieldsData.find(f => f.id === fieldId);
    if (field) {
      setEditingField(fieldId);
      setEditingDate(field.date);
    }
  };

  const handleDateSave = (fieldId: number) => {
    setFieldsData(prev => prev.map(field => 
      field.id === fieldId ? { ...field, date: editingDate } : field
    ));
    setEditingField(null);
    setEditingDate('');
  };

  const handleNotesToggle = (fieldId: number) => {
    setFieldsData(prev => prev.map(field => 
      field.id === fieldId ? { ...field, notes: !field.notes } : field
    ));
  };

  if (showFields) {
    return (
      <div 
        className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-[120] p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowFields(false);
        }}
      >
        <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-[800px] max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex flex-col items-center mb-8 relative">
            <button 
              onClick={() => setShowFields(false)}
              className="absolute left-0 top-0 hover:bg-gray-100 p-1 rounded-full"
            >
              <ArrowBackIcon />
            </button>
            <button 
              onClick={onClose} 
              className="absolute right-0 top-0 text-3xl text-gray-500 hover:text-gray-700 font-light"
            >
              ×
            </button>
            <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mb-4" />
            <h2 className="text-[26px] font-bold text-[#003366]">Campos de {selectedSubService}</h2>
            <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#EEEEEE]">
                  <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/2">Fields</th>
                  <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/4">Date</th>
                  <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/4">Notes</th>
                  <th className="py-3 text-left text-lg font-bold text-[#333333] w-1/4">Status</th>
                </tr>
              </thead>
              <tbody>
                {fieldsData.map((field) => (
                  <tr key={field.id} className="border-b border-[#EEEEEE]">
                    <td className="py-4">
                      <span className="text-[#000000] font-medium">
                        {field.id}. {field.name}
                      </span>
                    </td>
                    <td className="py-4">
                      {editingField === field.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="date"
                            value={editingDate}
                            onChange={(e) => setEditingDate(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <button
                            onClick={() => handleDateSave(field.id)}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingField(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{field.date}</span>
                          <button
                            onClick={() => handleDateEdit(field.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleNotesToggle(field.id)}
                        className={`p-1 rounded-full transition-colors ${
                          field.notes 
                            ? 'text-[#003366] hover:bg-blue-100' 
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <ChatBubbleIcon sx={{ fontSize: 16 }} />
                      </button>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        field.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        field.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {field.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-[26px] font-bold text-[#003366]">Crew Services</h2>
          <div className="w-[85px] h-[2px] bg-[#70C8CA] mt-2"></div>
        </div>

        <div className="space-y-3">
          <div 
            onClick={() => {
              setSelectedSubService('Crew Change');
              setShowFields(true);
            }}
            className="border rounded-lg p-3 cursor-pointer text-[#00335F] font-medium hover:bg-[#E6F7FF] hover:border-[#70C8CA] transition-all"
          >
            Crew Change
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={onClose}
            className="w-[210px] bg-[#00335F] text-white font-bold py-2 px-4 rounded hover:bg-[#002347]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrewServicesModalAssistant;
