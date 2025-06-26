import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import NavFooter from '../NavFooter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TotalVesselsReport = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-12-31');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const allCountries = ['ALL', 'CHILE', 'ARGENTINA', 'COLOMBIA', 'ECUADOR', 'PANAMA', 'PERU', 'URUGUAY'];

  const vessels = [
    {
      id: 1,
      daId: '202323',
      name: 'OCEAN STAR',
      port: 'VALPARAISO',
      country: 'CHILE',
      eta: '24/04/2025',
      etd: '26/04/2025',
      customer: 'MARCO\'S COMPANY'
    }
  ];

  const totalVessels = useMemo(() => {
    if (selectedCountries.length === 0) {
      return 1;
    }

    let filteredVessels = vessels;

    if (selectedCountries.length > 0 && !selectedCountries.includes('ALL')) {
      filteredVessels = filteredVessels.filter(vessel => 
        selectedCountries.includes(vessel.country)
      );
    }

    if (selectedCountries.includes('ALL')) {
      return 1; 
    }

    return filteredVessels.length;
  }, [selectedCountries]);

  const handleCountryChange = (country: string) => {
    if (country === 'ALL') {
      setSelectedCountries(prev => 
        prev.includes('ALL') ? [] : ['ALL']
      );
    } else {
      setSelectedCountries(prev => {
        const filtered = prev.filter(c => c !== 'ALL');
        return filtered.includes(country) 
          ? filtered.filter(c => c !== country)
          : [...filtered, country];
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Total Vessel's Reports</h1>
        <button 
          onClick={() => navigate('/admin/generate-reports')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#00335F] mb-6 text-center">
            TOTAL VESSEL'S REPORTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-[#00335F] mb-2 flex items-center gap-2">
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                FROM:
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:border-[#00335F]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#00335F] mb-2 flex items-center gap-2">
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                TO:
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:border-[#00335F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">TOTAL VESSELS</p>
              <p className="text-2xl font-bold text-[#00335F]">{totalVessels}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">COUNTRY:</p>
              <p className="text-lg font-medium">
                {selectedCountries.length > 0 ? selectedCountries.join(', ') : 'ALL'}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-bold text-[#00335F] mb-4 text-center">Seleccionar País:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {allCountries.map((country) => (
                  <label key={country} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountryChange(country)}
                      className="h-4 w-4 text-[#00335F] border-gray-300 rounded focus:ring-[#00335F]"
                    />
                    <span className="text-sm font-medium">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setSelectedCountries([]);
              }}
              className="px-6 py-3 border-2 border-[#00335F] text-[#00335F] rounded-lg font-bold hover:bg-[#00335F] hover:text-white transition-colors"
            >
              Limpiar Filtros
            </button>
            <button className="px-8 py-3 bg-[#00335F] text-white rounded-lg font-bold hover:bg-[#002347] transition-colors">
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
      
      <NavFooter />
    </div>
  );
};

export default TotalVesselsReport;
