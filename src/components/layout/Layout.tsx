import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ChatProvider } from '../../hooks/useChatContext';
import ChatPanel from '../common/ServiceChat';
import { useChat } from '../../hooks/useChatContext';

function ChatWrapper() {
  const { chatOpen, closeChat } = useChat();
  return <ChatPanel isOpen={chatOpen} onClose={closeChat} />;
}

export default function Layout() {
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ChatWrapper />
    </ChatProvider>
  );
}
