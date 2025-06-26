import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoLogin from '../../assets/logo-login.png';
import growingTogether from '../../assets/login-img/growing-together.png';
import bgImage1 from '../../assets/login-img/1.jpg';
import bgImage2 from '../../assets/login-img/2.jpg';
import bgImage3 from '../../assets/login-img/3.jpg';
import bgImage4 from '../../assets/login-img/4.jpg';
import bgImage5 from '../../assets/login-img/5.jpg';
import bgImage6 from '../../assets/login-img/6.jpg';
import bgImage7 from '../../assets/login-img/7.jpg';
import Header from '../Header';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recuperar contraseña para:', email);
  };

  const backgrounds = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6, bgImage7];
  const [currentBg] = useState(() => 
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div 
        className="fixed inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-64px)]">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8 pb-24 relative">
              <div className="text-center mb-8">
                <img src={logoLogin} alt="WSA Logo" className="h-16 w-auto mx-auto mb-6" />
                <h1 className="text-[26px] font-bold text-[#003366]">Recuperar Contraseña</h1>
                <div className="w-[85px] h-[2px] bg-[#70C8CA] mx-auto mt-2"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#00335F] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-[#CACACA]"
                    placeholder="Ingrese su email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00335F] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#002347] transition-colors"
                >
                  Restablecer contraseña
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-[#00335F] hover:underline font-medium"
                  >
                    Volver atras
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
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
