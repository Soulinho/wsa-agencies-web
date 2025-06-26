import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import NavFooterAdministrative from '../NavFooterAdministrative';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const VesselsByCustomerReport = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-12-31');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const allCustomers = ['ALL', 'MARCO\'S COMPANY', 'NAVIERA CHILE', 'SHIPS & CO', 'PACIFIC SHIPPING', 'ATLANTIC VESSELS'];
  const allCountries = ['ALL', 'CHILE', 'PERU', 'ECUADOR', 'COLOMBIA', 'PANAMA'];

  const vessels = [
    {
      id: 1,
      name: 'Ocean Star',
      customer: 'MARCO\'S COMPANY',
      country: 'CHILE',
      date: '2025-04-24'
    }
  ];

  const totalVessels = useMemo(() => {
    if (selectedCustomers.length === 0 && selectedCountries.length === 0) {
      return 0;
    }

    let filteredVessels = vessels;

    if (selectedCustomers.length > 0 && !selectedCustomers.includes('ALL')) {
      filteredVessels = filteredVessels.filter(vessel => 
        selectedCustomers.includes(vessel.customer)
      );
    }

    if (selectedCountries.length > 0 && !selectedCountries.includes('ALL')) {
      filteredVessels = filteredVessels.filter(vessel => 
        selectedCountries.includes(vessel.country)
      );
    }

    if (selectedCustomers.includes('ALL') || selectedCountries.includes('ALL')) {
      return vessels.length;
    }

    return filteredVessels.length;
  }, [selectedCustomers, selectedCountries]);

  const handleCustomerChange = (customer: string) => {
    if (customer === 'ALL') {
      setSelectedCustomers(prev => 
        prev.includes('ALL') ? [] : ['ALL']
      );
    } else {
      setSelectedCustomers(prev => {
        const filtered = prev.filter(c => c !== 'ALL');
        return filtered.includes(customer) 
          ? filtered.filter(c => c !== customer)
          : [...filtered, customer];
      });
    }
  };

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
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Vessel's by Customer Report</h1>
        <button 
          onClick={() => navigate('/administrative/generate-reports')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#00335F] mb-6 text-center">
            TOTAL VESSEL'S BY CUSTOMER
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">TOTAL VESSELS</p>
              <p className="text-2xl font-bold text-[#00335F]">{totalVessels}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">CUSTOMER:</p>
              <p className="text-lg font-medium">
                {selectedCustomers.length > 0 ? selectedCustomers.join(', ') : 'ALL'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">COUNTRY:</p>
              <p className="text-lg font-medium">
                {selectedCountries.length > 0 ? selectedCountries.join(', ') : 'ALL'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#00335F] mb-4">Seleccionar Cliente:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {allCustomers.map((customer) => (
                  <label key={customer} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer)}
                      onChange={() => handleCustomerChange(customer)}
                      className="h-4 w-4 text-[#00335F] border-gray-300 rounded focus:ring-[#00335F]"
                    />
                    <span className="text-sm font-medium">{customer}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#00335F] mb-4">Seleccionar País:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
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
                setSelectedCustomers([]);
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
      
      <NavFooterAdministrative />
    </div>
  );
};

export default VesselsByCustomerReport;
