import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import NavFooter from '../NavFooter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const VesselsReport = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-12-31');
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);
  const [selectedDaNumber, setSelectedDaNumber] = useState<string>('');
  const [selectedPorts, setSelectedPorts] = useState<string[]>([]);
  const [showDaDropdown, setShowDaDropdown] = useState(false);

  const allVessels = ['ALL', 'OCEAN STAR', 'BLUE HORIZON'];
  const allPorts = ['ALL', 'VALPARAISO', 'SAN ANTONIO'];

  const vessels = [
    {
      id: 1,
      vessel: 'OCEAN STAR',
      daNumber: '202323',
      country: 'CHILE',
      port: 'VALPARAISO',
      client: "MARCO'S COMPANY",
      operator: 'JUAN RIQUELME',
      status: 'Completed',
      date: '2025-04-24'
    },
    {
      id: 2,
      vessel: 'BLUE HORIZON',
      daNumber: '202324',
      country: 'CHILE', 
      port: 'SAN ANTONIO',
      client: "PACIFIC SHIPPING",
      operator: 'MARIA GONZALEZ',
      status: 'In Progress',
      date: '2025-05-15'
    }
  ];

  const filteredDaNumbers = useMemo(() => {
    if (selectedDaNumber === '') return [];
    return vessels
      .filter(vessel => vessel.daNumber.includes(selectedDaNumber))
      .map(vessel => vessel.daNumber);
  }, [selectedDaNumber]);

  const getPortByDaNumber = (daNumber: string) => {
    const vessel = vessels.find(v => v.daNumber === daNumber);
    return vessel ? vessel.port : null;
  };

  const totalVessels = useMemo(() => {
    if (selectedVessels.length === 0 && selectedDaNumber === '' && selectedPorts.length === 0) {
      return 2; 
    }

    let filteredVessels = vessels;

    if (selectedVessels.length > 0 && !selectedVessels.includes('ALL')) {
      filteredVessels = filteredVessels.filter(vessel => 
        selectedVessels.includes(vessel.vessel)
      );
    }

    if (selectedDaNumber !== '') {
      filteredVessels = filteredVessels.filter(vessel => 
        vessel.daNumber === selectedDaNumber
      );
    }

    if (selectedPorts.length > 0 && !selectedPorts.includes('ALL')) {
      filteredVessels = filteredVessels.filter(vessel => 
        selectedPorts.includes(vessel.port)
      );
    }

    if (selectedVessels.includes('ALL') || selectedPorts.includes('ALL')) {
      return 2;
    }

    return filteredVessels.length;
  }, [selectedVessels, selectedDaNumber, selectedPorts]);

  const handleVesselChange = (vessel: string) => {
    if (vessel === 'ALL') {
      setSelectedVessels(prev => 
        prev.includes('ALL') ? [] : ['ALL']
      );
    } else {
      setSelectedVessels(prev => {
        const filtered = prev.filter(v => v !== 'ALL');
        return filtered.includes(vessel) 
          ? filtered.filter(v => v !== vessel)
          : [...filtered, vessel];
      });
    }
  };

  const handleDaNumberChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setSelectedDaNumber(numericValue);
    setShowDaDropdown(numericValue.length > 0 && filteredDaNumbers.length > 0);
    
    if (vessels.find(v => v.daNumber === numericValue)) {
      const port = getPortByDaNumber(numericValue);
      if (port) {
        setSelectedPorts([port]);
      }
    } else if (numericValue === '') {
      setSelectedPorts([]);
    }
  };

  const handleDaNumberSelect = (daNumber: string) => {
    setSelectedDaNumber(daNumber);
    setShowDaDropdown(false);
    
    const port = getPortByDaNumber(daNumber);
    if (port) {
      setSelectedPorts([port]);
    }
  };

  const handlePortChange = (port: string) => {
    if (port === 'ALL') {
      setSelectedPorts(prev => 
        prev.includes('ALL') ? [] : ['ALL']
      );
    } else {
      setSelectedPorts(prev => {
        const filtered = prev.filter(p => p !== 'ALL');
        return filtered.includes(port) 
          ? filtered.filter(p => p !== port)
          : [...filtered, port];
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Vessel's Reports</h1>
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
            VESSEL'S REPORTS
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
              <p className="text-sm font-bold text-[#00335F]">VESSELS:</p>
              <p className="text-sm font-medium">
                {selectedVessels.length > 0 ? selectedVessels.join(', ') : 'ALL'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">DA Nº:</p>
              <p className="text-sm font-medium">
                {selectedDaNumber || 'ALL'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#00335F] mb-4">Seleccionar Vessel:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {allVessels.map((vessel) => (
                  <label key={vessel} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedVessels.includes(vessel)}
                      onChange={() => handleVesselChange(vessel)}
                      className="h-4 w-4 text-[#00335F] border-gray-300 rounded focus:ring-[#00335F]"
                    />
                    <span className="text-sm font-medium">{vessel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#00335F] mb-4">Escribir DA Nº:</h3>
              <div className="border border-gray-200 rounded-lg p-3 relative">
                <input
                  type="text"
                  value={selectedDaNumber}
                  onChange={(e) => handleDaNumberChange(e.target.value)}
                  placeholder="Ingrese DA Nº (ej: 2023)"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#00335F]"
                  onFocus={() => setShowDaDropdown(filteredDaNumbers.length > 0)}
                  onBlur={() => setTimeout(() => setShowDaDropdown(false), 200)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {showDaDropdown && filteredDaNumbers.length > 0 && (
                  <div className="absolute top-full left-3 right-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                    {filteredDaNumbers.map((daNumber) => (
                      <div
                        key={daNumber}
                        onClick={() => handleDaNumberSelect(daNumber)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {daNumber} - {vessels.find(v => v.daNumber === daNumber)?.vessel}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#00335F] mb-4">Puerto (Auto-llenado):</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {allPorts.map((port) => (
                  <label key={port} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedPorts.includes(port)}
                      onChange={() => handlePortChange(port)}
                      className="h-4 w-4 text-[#00335F] border-gray-300 rounded focus:ring-[#00335F]"
                    />
                    <span className="text-sm font-medium">{port}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setSelectedVessels([]);
                setSelectedDaNumber('');
                setSelectedPorts([]);
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

export default VesselsReport;
