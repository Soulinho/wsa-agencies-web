import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  date: string;
  isUser: boolean;
}

interface ChatGroup {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  date: string;
  unread: number;
  messages: ChatMessage[];
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [chats, setChats] = useState<ChatGroup[]>(
    [
      {
        id: 1,
        name: 'Juan Pérez',
        lastMessage: 'Perfecto, entonces empezamos a trabajar 👍',
        time: '18:45',
        date: 'Hoy',
        unread: 0,
        messages: [
          {
            id: 1,
            sender: 'Juan Pérez',
            message: '¿Revisaste los datos de la nueva embarcación? Necesitamos confirmar.',
            time: '15:30',
            date: 'Hoy',
            isUser: false
          },
          {
            id: 2,
            sender: 'Tú',
            message: 'Acabo de verificar los servicios seleccionados Maritime Solutions está confirmado y el destino también.',
            time: '15:45',
            date: 'Hoy',
            isUser: true
          },
          {
            id: 3,
            sender: 'Tú',
            message: 'Perfecto, entonces empezamos a trabajar 👍',
            time: '18:45',
            date: 'Hoy',
            isUser: true
          }
        ]
      },
      {
        id: 2,
        name: 'María González',
        lastMessage: 'Revisemos mañana los reportes',
        time: '14:20',
        date: 'Ayer',
        unread: 2,
        messages: [
          {
            id: 1,
            sender: 'María González',
            message: 'Revisemos mañana los reportes',
            time: '14:20',
            date: 'Ayer',
            isUser: false
          }
        ]
      },
      {
        id: 3,
        name: 'Carlos Ruiz',
        lastMessage: 'Todo confirmado para el lunes',
        time: '09:15',
        date: '15/01/2025',
        unread: 0,
        messages: [
          {
            id: 1,
            sender: 'Carlos Ruiz',
            message: 'Todo confirmado para el lunes',
            time: '09:15',
            date: '15/01/2025',
            isUser: false
          }
        ]
      },
      {
        id: 4,
        name: 'Ana López',
        lastMessage: 'Enviando documentos',
        time: '16:30',
        date: '10/01/2025',
        unread: 1,
        messages: [
          {
            id: 1,
            sender: 'Ana López',
            message: 'Enviando documentos',
            time: '16:30',
            date: '10/01/2025',
            isUser: false
          }
        ]
      }
    ]
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<number | null>(null);

  const handleDeleteClick = (chatId: number) => {
    setChatToDelete(chatId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (chatToDelete) {
      setChats(chats.filter(chat => chat.id !== chatToDelete));
      if (selectedChat === chatToDelete) {
        const remainingChats = chats.filter(chat => chat.id !== chatToDelete);
        setSelectedChat(remainingChats.length > 0 ? remainingChats[0].id : 1);
      }
    }
    setChatToDelete(null);
    setShowDeleteModal(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 md:bottom-20 right-4 md:right-6 bg-[#00335F] text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-[#002347] transition-all duration-300 hover:scale-110 z-40"
      >
        <ChatIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
      </button>
    );
  }

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <>
      <div 
        className="fixed inset-0 backdrop-blur-sm z-30 md:hidden" 
        onClick={() => setIsOpen(false)} 
      />
      
      <div className="fixed inset-x-4 bottom-4 top-20 md:inset-auto md:bottom-4 md:right-4 md:top-auto md:w-[700px] md:h-[550px] bg-white rounded-xl shadow-2xl z-40 border border-gray-200 flex overflow-hidden">
        
        <div className={`${showChatList ? 'w-full md:w-80' : 'hidden md:flex md:w-80'} bg-white flex flex-col border-r border-gray-200`}>
          <div className="bg-[#00335F] text-white p-3 md:p-4 flex justify-between items-center h-[56px] md:h-[72px] flex-shrink-0">
            <h3 className="font-bold text-base md:text-lg">Mensajes</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#002347] p-1 rounded-full transition-colors"
            >
              <CloseIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 md:p-4 cursor-pointer border-b border-gray-200 hover:bg-white transition-colors relative ${
                  selectedChat === chat.id ? 'bg-white border-l-4 border-l-[#00335F] shadow-sm' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 
                    className="font-semibold text-[#003366] text-sm md:text-base flex-1 truncate pr-2"
                    onClick={() => {
                      setSelectedChat(chat.id);
                      setShowChatList(false);
                    }}
                  >
                    {chat.name}
                  </h4>
                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500">{chat.time}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(chat.id);
                      }}
                      className="text-[#00335F] hover:text-[#002347] p-1 rounded-full transition-colors"
                    >
                      <DeleteIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                    </button>
                    {chat.unread > 0 && (
                      <div className="bg-[#00335F] text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
                <p 
                  className="text-xs text-gray-600 truncate mb-1"
                  onClick={() => {
                    setSelectedChat(chat.id);
                    setShowChatList(false);
                  }}
                >
                  {chat.lastMessage}
                </p>
                <p 
                  className="text-xs text-gray-400"
                  onClick={() => {
                    setSelectedChat(chat.id);
                    setShowChatList(false);
                  }}
                >
                  {chat.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${!showChatList ? 'w-full' : 'hidden md:flex'} md:flex-1 flex flex-col bg-white`}>
          <div className="bg-[#00335F] text-white p-3 md:p-4 flex justify-between items-center h-[56px] md:h-[72px] flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <button 
                onClick={() => setShowChatList(true)}
                className="md:hidden hover:bg-[#002347] p-1 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
              </button>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm md:text-base truncate">{currentChat?.name}</h3>
                <p className="text-xs text-blue-100 truncate">Último mensaje: {currentChat?.date}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#002347] p-1 rounded-full transition-colors flex-shrink-0"
            >
              <MinimizeIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
            {currentChat?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-xs px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-[#00335F] text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                  }`}
                >
                  {!message.isUser && (
                    <p className="text-xs font-semibold mb-1 md:mb-2 text-[#00335F] truncate">{message.sender}</p>
                  )}
                  <p className="text-sm leading-relaxed break-words">{message.message}</p>
                  <div className="flex justify-between items-center mt-1 md:mt-2 gap-2 text-xs">
                    <span className={message.isUser ? 'text-blue-100' : 'text-gray-500'}>
                      {message.time}
                    </span>
                    <span className={message.isUser ? 'text-blue-100' : 'text-gray-500'}>
                      {message.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 md:p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex gap-2 md:gap-3 items-end">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#00335F] focus:ring-2 focus:ring-[#00335F] focus:ring-opacity-20 min-w-0"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#00335F] text-white px-3 py-2 md:p-3 rounded-full hover:bg-[#002347] transition-colors shadow-md flex-shrink-0 text-sm font-medium md:font-normal"
              >
                <span className="block md:hidden">Enviar</span>
                <span className="hidden md:block">
                  <SendIcon sx={{ fontSize: 18 }} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border-2 border-gray-200">
            <h3 className="text-lg font-bold text-[#003366] mb-4">Eliminar conversación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar esta conversación? Esta acción no se puede deshacer.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;


