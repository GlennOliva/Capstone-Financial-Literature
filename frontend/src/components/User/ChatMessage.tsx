import chatbot_image from '../../assets/images/chatbot.png';

interface ChatMessageProps {
  message: {
    role: 'user' | 'bot';
    content: string;
  };
  userProfile: {
    image: string;
    full_name: string;
    email: string;
    password: string;
    address: string;
  } | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, userProfile }) => {
  const isUser = message.role === 'user';
  const apiUrl = import.meta.env.VITE_API_URL;

  const avatarSrc = isUser
    ? `${apiUrl}/uploads/${userProfile?.image || 'default-user.png'}`
    : chatbot_image;

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
    <div className="chat-avatar">
      <img src={avatarSrc} alt={isUser ? 'User Avatar' : 'Bot Avatar'} />
      <span>{isUser ? userProfile?.full_name || 'USER' : 'BOT'}</span>
    </div>
    <div className="chat-bubble">
      <p>{message.content}</p>
    </div>
  </div>
  
  );
};

export default ChatMessage;
