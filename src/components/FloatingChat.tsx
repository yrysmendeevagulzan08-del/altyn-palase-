import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  Bot, X, Send, User, RefreshCw, MessageSquare, Sparkles, ChevronDown 
} from 'lucide-react';

interface FloatingChatProps {
  currentLang: Language;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function FloatingChat({ currentLang }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTalkingToAi, setIsTalkingToAi] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  // Configure WhatsApp Click-to-Chat Link and Tooltip based on current selected language
  const whatsAppPhone = "996555775555"; // Realistic Kyrgyz contact phone number
  const getWhatsAppDetails = () => {
    if (currentLang === 'KG') {
      return {
        url: `https://wa.me/${whatsAppPhone}?text=Саламатсызбы%20Altyn%20Palace%20жана%20Гүлжан%20айымдын%20курорту!%20Бөлмөлөрдү%20жана%20кызматтарды%20брондоо%20кызыктырат.`,
        title: "Ватсап аркылуу байланышуу"
      };
    } else if (currentLang === 'RU') {
      return {
        url: `https://wa.me/${whatsAppPhone}?text=Здравствуйте!%20Я%20хочу%20узнать%20насчет%20бронирования%20номеров%20и%20услуг%20в%20курорте%20Altyn%20Palace.`,
        title: "Связаться через WhatsApp"
      };
    } else {
      return {
        url: `https://wa.me/${whatsAppPhone}?text=Hello%20Altyn%20Palace%20Resort!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20suite%20and%20luxury%20services.`,
        title: "Direct WhatsApp Chat"
      };
    }
  };

  const { url: whatsAppUrl, title: whatsAppTitle } = getWhatsAppDetails();

  // Initialize history with polite concierge greeting
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>(() => {
    return [
      {
        role: 'model',
        text: currentLang === 'KG'
          ? "Ассалому алейкум! Мен Altyn Palace мейманканасынын онлайн ИИ-Жардамчысымын. Сизге люкс бөлмөлөрүбүз, баалар, тоо кучагындагы бейпилдик же Башкы директор Гүлжан айымдын убадалары тууралуу маалымат берүүгө даярмын. Кандай жардам көрсөтө алам? ✨"
          : currentLang === 'RU'
          ? "Здравствуйте! Я виртуальный ИИ-ассистент курорта Altyn Palace. Я готов рассказать вам о наших люксах, ценах, спа-процедурах или основательнице Гулжан. Чем я могу помочь вам? ✨"
          : "Greetings, Your Excellency. I am the virtual AI Concierge of Altyn Palace. I stand ready to assist you regarding our ultra-luxury suites, helicopter charters, spatial wellness, or details about our founder Guljan. How may I serve you? ✨"
      }
    ];
  });

  // Re-greet if language changes and history only has starting message
  useEffect(() => {
    if (aiHistory.length === 1) {
      setAiHistory([
        {
          role: 'model',
          text: currentLang === 'KG'
            ? "Ассалому алейкум! Мен Altyn Palace мейманканасынын онлайн ИИ-Жардамчысымын. Сизге люкс бөлмөлөрүбүз, баалар, тоо кучагындагы бейпилдик же Башкы директор Гүлжан айымдын убадалары тууралуу маалымат берүүгө даярмын. Кандай жардам көрсөтө алам? ✨"
            : currentLang === 'RU'
            ? "Здравствуйте! Я виртуальный ИИ-ассистент курорта Altyn Palace. Я готов рассказать вам о наших люксах, ценах, спа-процедурах или основательнице Гулжан. Чем я могу помочь вам? ✨"
            : "Greetings, Your Excellency. I am the virtual AI Concierge of Altyn Palace. I stand ready to assist you regarding our ultra-luxury suites, helicopter charters, spatial wellness, or details about our founder Guljan. How may I serve you? ✨"
        }
      ]);
    }
  }, [currentLang]);

  // Keep scroll aligned
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiHistory, isTalkingToAi]);

  // Handle messages dispatch
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTalkingToAi) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setAiHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTalkingToAi(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: aiHistory
        })
      });

      if (!response.ok) {
        throw new Error('API issue');
      }

      const data = await response.json();
      if (data.text) {
        setAiHistory(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error('No content returned');
      }
    } catch (err) {
      console.error(err);
      setAiHistory(prev => [...prev, {
        role: 'model',
        text: currentLang === 'KG'
          ? "Байланыш үзүлдү. Сураныч, бир аздан кийин кайра жазып көрүңүз же түз чалыңыз!"
          : currentLang === 'RU'
          ? "Не удалось связаться с ИИ. Пожалуйста, попробуйте позже."
          : "Failure communicating with the AI Concierge. Please retry shortly."
      }]);
    } finally {
      setIsTalkingToAi(false);
    }
  };

  const handleReset = () => {
    setAiHistory([
      {
        role: 'model',
        text: currentLang === 'KG'
          ? "Маек тазаланды. Жаңы сурооңузду күтөм!"
          : currentLang === 'RU'
          ? "История чата удалена. Начнем заново!"
          : "History refreshed. Please ask your next prestigious question."
      }
    ]);
  };

  // Curated prompts
  const CHAT_PROMPTS = {
    KG: [
      "Бөлмө баалары канча?",
      "Курорттун дареги каерде?",
      "Гүлжан Ырысмендеева тууралуу",
      "VIP Кызматтардын акылары"
    ],
    RU: [
      "Сколько стоят люксы?",
      "Какой адрес у Altyn Palace?",
      "Информация о Гулжан Ырысмендеевой",
      "Цены на вертолет и спа"
    ],
    EN: [
      "What are the suite rates?",
      "Where is Altyn Palace located?",
      "Who is founder Guljan?",
      "Helicopter & Spa pricing"
    ]
  };

  const activePrompts = CHAT_PROMPTS[currentLang] || CHAT_PROMPTS.EN;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-live-chat">
      
      {/* Expanded Chat Dialog Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#0a0a0b]/95 backdrop-blur-xl border border-gold/30 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Header Area */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-4 py-3.5 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="bg-gold/15 p-1.5 rounded-full text-gold relative">
                <Bot className="h-4.5 w-4.5 animate-pulse" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-100 font-mono tracking-widest uppercase flex items-center gap-1">
                  <span>Altyn AI Concierge</span>
                  <Sparkles className="h-3 w-3 text-gold" />
                </h3>
                <span className="block text-[9px] text-[#8e8e93] font-mono uppercase">
                  {currentLang === 'KG' ? "Түз байланыш • Коопсуз" : currentLang === 'RU' ? "Онлайн • Экспресс режим" : "Direct • Fully secured"}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={handleReset}
                title="Reset history"
                className="hover:text-gold text-neutral-400 p-1.5 transition rounded-full hover:bg-neutral-850"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:text-red-400 text-neutral-400 p-1.5 transition rounded-full hover:bg-neutral-850"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages scroll content viewport */}
          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar bg-neutral-950/40 text-xs"
          >
            {aiHistory.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2.5 items-start max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div className={`p-1.5 rounded-full shrink-0 ${
                  msg.role === 'user' ? 'bg-gold/15 text-gold' : 'bg-neutral-850 text-neutral-300'
                }`}>
                  {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                <div className={`p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-sans text-[11px] border ${
                  msg.role === 'user'
                    ? 'bg-gold/10 border-gold/25 text-gold'
                    : 'bg-neutral-900/90 border-neutral-805 text-neutral-200 shadow-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTalkingToAi && (
              <div className="flex items-center gap-2 max-w-[80%] mr-auto text-neutral-400 font-mono text-[9px] animate-pulse pl-1">
                <Bot className="h-3 w-3 animate-spin text-gold" />
                <span>Altyn Concierge is composing...</span>
              </div>
            )}
          </div>

          {/* Pre-configured Suggestions */}
          <div className="px-4 py-2 bg-neutral-900/60 border-t border-neutral-850">
            <span className="block text-[9px] uppercase font-mono text-[#a5a5a5] tracking-wider mb-2">
              {currentLang === 'KG' ? "Сунушталган суроолор:" : currentLang === 'RU' ? "Рекомендуемые вопросы:" : "Quick sample inquiry:"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePrompts.map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(promptText)}
                  disabled={isTalkingToAi}
                  className="text-[10px] font-mono text-gold hover:text-[#0a0a0b] cursor-pointer hover:bg-gold bg-gold/5 border border-gold/20 hover:border-gold px-2.5 py-1.5 rounded-full transition-all duration-200 text-left"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* Form Action Submitter */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(chatInput); }}
            className="p-3 bg-neutral-950 border-t border-neutral-850 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                currentLang === 'KG' 
                  ? "Бөлмө бааларын же шарттарды сураңыз..." 
                  : currentLang === 'RU' 
                  ? "Спросите о ценах комнат или сервисе..." 
                  : "Ask suite rates, directions or spa features..."
              }
              className="flex-grow bg-[#161618] border border-neutral-800 focus:border-gold focus:outline-none px-3.5 py-2.5 rounded text-neutral-200 text-xs"
              disabled={isTalkingToAi}
              id="floating-chat-input-text"
            />
            <button
              type="submit"
              disabled={isTalkingToAi || !chatInput.trim()}
              className="p-2.5 bg-gold text-[#0a0a0b] hover:opacity-90 disabled:opacity-30 rounded transition flex items-center justify-center cursor-pointer shrink-0"
              title="Send secure request"
              id="floating-chat-submit-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* Persistent WhatsApp Floating Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="h-14 w-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.35)] flex items-center justify-center relative cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group mb-1"
        id="whatsapp-floating-trigger"
        aria-label="Direct WhatsApp Contact"
        title={whatsAppTitle}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white transition-transform group-hover:rotate-6 duration-350">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute -top-1 -right-1 bg-emerald-100 text-emerald-950 text-[8px] font-mono font-bold tracking-tighter px-1.5 py-0.5 rounded-full shadow border border-emerald-500 pointer-events-none">
          WA
        </span>
      </a>

      {/* Persistent Floating Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-gradient-to-r from-neutral-950 to-[#161618] hover:scale-105 active:scale-95 text-gold border-2 border-gold/40 hover:border-gold rounded-full shadow-[0_8px_32px_rgba(212,175,55,0.25)] flex items-center justify-center relative cursor-pointer transition-all duration-300 group"
        id="floating-chat-toggle-trigger"
        aria-label="Toggle Online AI Concierge Chat"
      >
        {isOpen ? (
          <ChevronDown className="h-6 w-6 transform rotate-0" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-2.5 -right-2.5 bg-gold text-neutral-950 text-[9px] font-mono font-bold tracking-tighter px-1.5 py-0.5 rounded-full shadow border border-neutral-950 animate-bounce">
              ИИ
            </span>
          </div>
        )}
      </button>

    </div>
  );
}
