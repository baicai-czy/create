import { createContext, useContext, useState, type ReactNode } from 'react';

interface ChatContextType {
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType>({
  chatOpen: false,
  openChat: () => {},
  closeChat: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <ChatContext.Provider value={{ chatOpen, openChat: () => setChatOpen(true), closeChat: () => setChatOpen(false) }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
