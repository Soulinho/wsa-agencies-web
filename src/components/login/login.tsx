import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoLogin from '../../assets/logo-login.png';
import laptopImg from '../../assets/laptop.png';
import movilImg from '../../assets/movil.png';
import growingTogether from '../../assets/login-img/growing-together.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Header from '../Header';
import bgImage1 from '../../assets/login-img/1.jpg';
import bgImage2 from '../../assets/login-img/2.jpg';
import bgImage3 from '../../assets/login-img/3.jpg';
import bgImage4 from '../../assets/login-img/4.jpg';
import bgImage5 from '../../assets/login-img/5.jpg';
import bgImage6 from '../../assets/login-img/6.jpg';
import bgImage7 from '../../assets/login-img/7.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const backgrounds = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6, bgImage7];
  const [currentBg] = useState(() => 
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div 
        className="fixed inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      </div>

      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-1 lg:order-2">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 pb-24 relative">
              <div className="text-center mb-8">
                <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mx-auto mb-6" />
                <h1 className="text-[26px] font-bold text-[#003366]">Welcome</h1>
                <div className="w-[85px] h-[2px] bg-[#70C8CA] mx-auto mt-2"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#00335F] mb-2">
                    Usuario
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-[#CACACA]"
                    placeholder="Ingrese usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#00335F] mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-[#CACACA]"
                      placeholder="Ingrese contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00335F] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#002347] transition-colors"
                >
                  Sign in
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/recover-password')}
                    className="text-[#00335F] hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>

              <img 
                src={growingTogether} 
                alt="Growing Together" 
                className="absolute -bottom-2 right-4 w-[120px] h-[80px] object-contain"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 order-2 lg:order-1 ">
            <div className="hidden lg:flex lg:flex-col lg:items-start w-full">
              <h2 className="text-[40px] font-bold text-[#003366] mb-16">
                WSA Agencies Control Vessels Application!
              </h2>
              
              <div className="flex items-center lg:flex-col xl:flex-row justify-center lg:items-start gap-8 mb-16">
                <img 
                  src={movilImg} 
                  alt="Mobile WSA" 
                  className="w-[300px] h-auto object-contain" 
                />
                <img 
                  src={laptopImg} 
                  alt="Laptop WSA" 
                  className="w-[350px] h-auto object-contain" 
                />
              </div>

              <p className="text-[24px] text-gray-600">
                An easy way to keep the control your vessel status
              </p>
            </div>

            <div className="flex flex-col items-center lg:hidden w-full mt-8">
              <h2 className="text-[30px] font-bold text-[#003366] text-center mb-8">
                WSA Agencies Control Vessels Application!
              </h2>

              <div className="flex flex-col gap-8">
                <img 
                  src={movilImg} 
                  alt="Mobile WSA" 
                  className="w-[250px] h-auto object-contain" 
                />
                <img 
                  src={laptopImg} 
                  alt="Laptop WSA" 
                  className="w-[300px] h-auto object-contain" 
                />
              </div>
              
              <p className="text-[24px] text-gray-600 text-center px-4">
                An easy way to keep the control your vessel status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
