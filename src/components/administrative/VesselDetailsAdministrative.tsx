import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header';
import NavFooterAdministrative from './NavFooterAdministrative';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TagIcon from '@mui/icons-material/Tag';
import CrewServicesModalReadOnly from '../customer/CrewServicesModalReadOnly';

const VesselDetailsAdministrative = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCrewServicesOpen, setIsCrewServicesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Detalles de la Nave</h1>
        <button 
          onClick={() => navigate('/administrative/view-vessels')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24">
        <h2 className="text-[26px] font-bold mb-4">
          <span className="text-[#70C8CA]">VESSEL</span>
          <span className="text-[#00335F]"> Information</span>
        </h2>
        
        <div className="bg-white rounded-[20px] shadow p-6 mb-6 border-2 border-[#00335F]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            <div>
              <div className="flex items-center gap-2">
                <DirectionsBoatIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-medium">Vessel:</span>
                <span>Ocean Star</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <LocationOnIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-medium">Port:</span>
                <span>Valparaiso</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <SouthAmericaIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-medium">Country:</span>
                <span>Chile</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <SupportAgentIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-medium">Operador:</span>
                <span>Juan Riquelme</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarMonthIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-bold">ETA:</span>
                <span>24-04-2025</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <HourglassBottomIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-bold">ETB:</span>
                <span>26-04-2025</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ScheduleIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-bold">ETD:</span>
                <span>26-04-2025</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <TagIcon className="text-[#00335F]" />
                <span className="text-[#00335F] font-medium">DA ID:</span>
                <span>{id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[26px] mb-4 font-bold">
            <span className="text-[#00335F]">Active</span>
            <span className="text-[#70C8CA]"> Services</span>
          </h3>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsCrewServicesOpen(true)}
              className="bg-[#00335F] text-white px-6 py-2 rounded-xl w-[300px] font-bold text-[20px] hover:bg-[#002347] transition-colors duration-200"
            >
              Crew Services
            </button>
          </div>
        </div>
      </div>

      <CrewServicesModalReadOnly 
        isOpen={isCrewServicesOpen}
        onClose={() => setIsCrewServicesOpen(false)}
      />
      <NavFooterAdministrative />
    </div>
  );
};

export default VesselDetailsAdministrative;
