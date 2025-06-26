import { useLocation, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LogoutIcon from '@mui/icons-material/Logout';

const NavFooterAssistant = () => {
  const location = useLocation();
  const isHome = location.pathname === '/assistant';

  if (isHome) return null;

  const navItems = [
    { title: 'Inicio', icon: <HomeIcon className="text-2xl md:text-3xl" />, path: '/assistant' },
    { title: 'Gestionar Naves', icon: <DirectionsBoatIcon className="text-2xl md:text-3xl" />, path: '/assistant/manage-vessels' },
    { title: 'Cerrar Sesión', icon: <LogoutIcon className="text-2xl md:text-3xl" />, path: '/login' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative">
        <div className="container mx-auto md:px-4 md:mb-6 flex justify-center">
          <div className="bg-[#00335F] md:bg-white w-full md:w-[600px] h-[65px] md:h-[70px] flex items-center justify-center shadow-lg md:rounded-[50px]">
            <div className="w-full px-2 md:px-8">
              <div className="grid grid-cols-3 gap-1 md:gap-2 justify-items-center">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex flex-col items-center justify-center transition-colors ${
                      location.pathname === item.path 
                        ? 'text-[#70C8CA]' 
                        : 'text-white md:text-[#003366] hover:text-[#70C8CA]'
                    }`}
                  >
                    <span className="text-inherit">
                      {item.icon}
                    </span>
                    <span className="hidden md:block font-medium text-[12px] mt-1 text-center">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavFooterAssistant;
