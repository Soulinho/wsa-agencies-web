import Header from '../Header';
import logoLogin from '../../assets/logo-login.png';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../chat/ChatBubble';

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

const AdminHome = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      title: 'Gestionar Usuarios', 
      icon: <GroupIcon sx={{ fontSize: 35 }}/>, 
      onClick: () => navigate('/admin/manage-users')
    },
    { 
      title: 'Gestionar Cliente', 
      icon: <ManageAccountsIcon sx={{ fontSize: 35 }}/>, 
      onClick: () => navigate('/admin/manage-client')
    },
    { 
      title: 'Gestionar Naves', 
      icon: <DirectionsBoatIcon sx={{ fontSize: 35 }}/>, 
      onClick: () => navigate('/admin/manage-vessels')
    },
    { title: 'Gestionar Servicios',
       icon: <BuildIcon sx={{ fontSize: 35 }}/> ,
      onClick: () => navigate('/admin/manage-services')},
    
    { 
      title: 'Generar reporte', 
      icon: <DescriptionIcon sx={{ fontSize: 35 }}/>, 
      onClick: () => navigate('/admin/generate-reports')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img 
            src={logoLogin}
            alt="WSA Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#003366] mb-4">
          Bienvenido Administrador
        </h1>
        <div className="w-[100px] h-1 bg-[#70C8CA] mb-8 mx-auto"></div>
        
        <h2 className="text-xl text-center text-[#003366] mb-8">
          ¿Que desea hacer hoy?
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.slice(0, 3).map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-white w-[250px] h-[150px] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out flex flex-col items-center justify-center animate-[fadeInUp_0.6s_ease-out] text-[#003366] hover:text-[#70C8CA] group"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <span className="mb-2 transition-colors duration-200">{item.icon}</span>
                <span className="font-medium transition-colors duration-200">{item.title}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.slice(3).map((item, index) => (
              <button
                key={index + 3}
                onClick={item.onClick}
                className="bg-white w-[250px] h-[150px] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out flex flex-col items-center justify-center animate-[fadeInUp_0.6s_ease-out] text-[#003366] hover:text-[#70C8CA] group"
                style={{ animationDelay: `${(index + 3) * 0.1}s`, animationFillMode: 'both' }}
              >
                <span className="mb-2 transition-colors duration-200">{item.icon}</span>
                <span className="font-medium transition-colors duration-200">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <ChatBubble />
    </div>
  );
};

export default AdminHome;
