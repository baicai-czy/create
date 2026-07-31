import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Headphones } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

// 预设自动回复
const autoReplies: Record<string, string[]> = {
  产品咨询: ['城际云提供通用云、智算云、云集成、运维四大产品线。请问您对哪类产品感兴趣？'],
  价格: ['您好！不同产品的定价方案有所不同。通用云服务按月或按年计费，GPU算力按需计费。您可以直接在官网查看详细价格，或留下联系方式，我们安排专人对接。'],
  技术支持: ['7×24小时技术支持热线：400-XXX-XXXX。您也可以描述具体问题，我帮您转接技术工程师。'],
  合作: ['感谢您的合作意向！请填写合作申请表，我们会在3个工作日内审核并回复。'],
  default: [
    '您好！我是城际云客服小云，很高兴为您服务。请问有什么可以帮您的？',
    '收到，让我为您查询一下相关信息。',
    '感谢您的耐心等待，如有其他问题随时联系我。',
  ],
};

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('产品') || q.includes('服务') || q.includes('云服务')) return autoReplies['产品咨询'][0];
  if (q.includes('价格') || q.includes('费用') || q.includes('多少钱')) return autoReplies['价格'][0];
  if (q.includes('技术') || q.includes('故障') || q.includes('问题') || q.includes('支持')) return autoReplies['技术支持'][0];
  if (q.includes('合作') || q.includes('代理') || q.includes('伙伴')) return autoReplies['合作'][0];
  const defaults = autoReplies['default'];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

const quickReplies = ['产品咨询', '价格咨询', '技术支持', '业务合作'];

export default function ServiceChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: '您好！我是城际云客服小云 🎧\n\n可为您解答产品、价格、技术支持等问题，或留下信息获取专属方案。',
      sender: 'agent',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function getTime() {
    return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text: text.trim(), sender: 'user', time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // 模拟客服回复
    setIsTyping(true);
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = { id: Date.now() + 1, text: getReply(text), sender: 'agent', time: getTime() };
      setMessages((prev) => [...prev, reply]);
    }, delay);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={onClose}
          />

          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-6 bottom-6 w-[400px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-primary to-primary-600 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">智能客服</p>
                    <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      在线 · 平均响应 30s
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-white/15 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.sender === 'agent' && (
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                        <Headphones className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                      <Headphones className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100 px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="flex-shrink-0 px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-xs bg-white hover:bg-primary-50 hover:text-primary border border-gray-200 px-3 py-1.5 rounded-full transition-all"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="输入您的问题..."
                  className="flex-1 text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-primary hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                服务时间：工作日 9:00-18:00 · 紧急问题请拨打 400-XXX-XXXX
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
