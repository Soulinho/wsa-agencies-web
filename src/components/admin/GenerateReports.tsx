import Header from '../Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import NavFooter from './NavFooter';

const GenerateReports = () => {
  const navigate = useNavigate();

  const reportOptions = [
    {
      title: 'Total Vessel\'s Reports',
      description: 'Reporte completo de todas las embarcaciones',
      onClick: () => navigate('/admin/reports/total-vessels')
    },
    {
      title: 'Vessel\'s by Customer',
      description: 'Embarcaciones agrupadas por cliente',
      onClick: () => navigate('/admin/reports/vessels-by-customer')
    },
    {
      title: 'Vessel\'s by Country',
      description: 'Embarcaciones agrupadas por país',
      onClick: () => navigate('/admin/reports/vessels-by-country')
    },
    {
      title: 'Vessel\'s Reports',
      description: 'Reportes generales de embarcaciones',
      onClick: () => navigate('/admin/reports/vessels')
    },
    {
      title: 'Vessel\'s by Services',
      description: 'Embarcaciones agrupadas por servicios',
      onClick: () => navigate('/admin/reports/vessels-by-services')
    },
    {
      title: 'Vessel\'s by Operator',
      description: 'Embarcaciones agrupadas por operador',
      onClick: () => navigate('/admin/reports/vessels-by-operator')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Generar Reporte</h1>
        <button 
          onClick={() => navigate('/admin')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Selecciona el tipo de reporte que deseas generar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportOptions.map((option, index) => (
            <div
              key={index}
              onClick={option.onClick}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#00335F] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {option.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="w-full bg-[#00335F] text-white py-2 px-4 rounded-lg hover:bg-[#002347] transition-colors font-medium">
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <NavFooter />
    </div>
  );
};

export default GenerateReports;


