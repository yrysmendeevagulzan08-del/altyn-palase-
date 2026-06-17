import React, { useState } from 'react';
import { Language, LuxuryRoom } from '../types';
import { LUXURY_ROOMS, TRANSLATIONS } from '../data';
import { 
  PhoneCall, ShieldAlert, Key, Mail, Send, CheckCircle2, 
  Sparkles, Bot, User, RefreshCw, Star, Calendar, ShieldCheck, MapPin
} from 'lucide-react';

interface ConciergeDeskProps {
  currentLang: Language;
  onSelectSuite?: (room: LuxuryRoom) => void;
}

export interface ConciergeQuery {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function ConciergeDesk({ currentLang, onSelectSuite }: ConciergeDeskProps) {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  const whatsAppPhone = "996555775555";
  const whatsAppUrl = currentLang === 'KG'
    ? `https://wa.me/${whatsAppPhone}?text=Саламатсызбы%20Altyn%20Palace%20жана%20Гүлжан%20айымдын%20курорту!%20Бөлмөлөрдү%20жана%20кызматтарды%20брондоо%20кызыктырат.`
    : currentLang === 'RU'
    ? `https://wa.me/${whatsAppPhone}?text=Здравствуйте!%20Я%20хочу%20узнать%20насчет%20бронирования%20номеров%20и%20услуг%20в%20курорте%20Altyn%20Palace.`
    : `https://wa.me/${whatsAppPhone}?text=Hello%20Altyn%20Palace%20Resort!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20suite%20and%20luxury%20services.`;

  // Direct secure email dispatch states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Helicopter Charter Scheduling');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Active sub-mode 'form' (traditional request) or 'ai' (live conversational intelligence)
  const [activeMode, setActiveMode] = useState<'form' | 'ai'>('ai');

  // AI chat assistant state variables
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>(() => [
    {
      role: 'model',
      text: currentLang === 'KG'
        ? "Кош келиңиз! Мен Altyn Palace беш жылдыздуу курорттук топтомунун жасалма интеллект онлайн-консьержи болом. Гүлжан айым негиздеген биздин падышалык хансарай, бөлмө баалары жана VIP кызматтар тууралуу сурасаңыз болот. Сизге кантип жардам бере алам? ✨"
        : currentLang === 'RU'
        ? "Здравствуйте! Я искусственный интеллект онлайн-консьерж пятизвездочного курорта Altyn Palace. Вы можете узнать у меня о ценах на королевские номера, истории создания отеля основательницей Гулжан и VIP-услугах вертолета или спа. Чем я могу помочь вам? ✨"
        : "Welcome, Your Excellency. I am the AI Private Concierge at the 5-star Altyn Palace Resort. Feel free to ask me about our royal suite prices per night, elite spa services, helicopter schedules, or the founding history of Guljan. How may I serve you today? ✨"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTalkingToAi, setIsTalkingToAi] = useState(false);

  const categories = [
    { id: 'heli', label: { KG: "Тик учар чартерин эсептөө", EN: "Helicopter Charter Scheduling", RU: "Аренда вертолета" } },
    { id: 'security', label: { KG: "Жеке эскорт жана Коопсуздук", EN: "Private Armed Escort & Security", RU: "Личная охрана и сопровождение" } },
    { id: 'diet', label: { KG: "Өзгөчө улуттук деликатестер", EN: "Bespoke Caviar & National Organics", RU: "Индивидуальное меню деликатесов" } },
    { id: 'yacht', label: { KG: "Ысык-Көл же Катер серүүндөөсү", EN: "Lake Issyk-Kul Yacht Chartering", RU: "Аренда яхты на озере Иссык-Куль" } },
    { id: 'other', label: { KG: "Жекече башка падышалык өтүнүч", EN: "Custom Dignitary Protocol Support", RU: "Другие секретные поручения" } }
  ];

  // Pre-configured VIP suggestion questions
  const SUGGESTED_PROMPTS = {
    KG: [
      "Бөлмөлөрдүн баалары канча турат?",
      "Кайсы люкста өзүнүн саунасы бар?",
      "Негиздөөчү Гүлжан тууралуу айтып берчи",
      "Рooftop тик учар кызматы канча турат?"
    ],
    RU: [
      "Сколько стоят королевские номера за ночь?",
      "В каком люксе есть собственный сауна и спа?",
      "Расскажи про основательницу Гулжан",
      "Сколько стоит вертолетный VIP-трансфер?"
    ],
    EN: [
      "Show me all the royal suite prices per night",
      "Which suites include a private sauna or pool?",
      "Tell me about our visionary founder Guljan",
      "How much is the elite helicopter airport transfer?"
    ]
  };

  const currentSuggestions = SUGGESTED_PROMPTS[currentLang] || SUGGESTED_PROMPTS.EN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert(currentLang === 'KG' ? "Сураныч, бардык талааларды толтуруңуз!" : currentLang === 'RU' ? "Пожалуйста, заполните все поля!" : "Please fill out all required fields!");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Talk converter using Express API router
  const handleTalkToAi = async (textToSend: string) => {
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
          history: aiHistory // pass existing context thread
        })
      });

      if (!response.ok) {
        throw new Error('Server responded with an issue');
      }

      const data = await response.json();
      if (data.text) {
        setAiHistory(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error("Missing response text block");
      }
    } catch (error) {
      console.error(error);
      setAiHistory(prev => [...prev, { 
        role: 'model', 
        text: currentLang === 'KG'
          ? "Кечиресиз, маалымат алууда ката кетти. Сураныч, бир аздан кийин кайра аракет кылып көрүңүз же түздөн-түз чалыңыз."
          : currentLang === 'RU'
          ? "Извините, произошла техническая ошибка подключения к ИИ. Пожалуйста, повторите запрос позже."
          : "Forgive me, but I am currently experiencing connection difficulties. Please try again shortly."
      }]);
    } finally {
      setIsTalkingToAi(false);
    }
  };

  const handleResetChat = () => {
    setAiHistory([
      {
        role: 'model',
        text: currentLang === 'KG'
          ? "Байланыш тазаланды. Жаңы суроолоруңуз болсо жазыңыз!"
          : currentLang === 'RU'
          ? "История чата сброшена. Задавайте новые вопросы!"
          : "History cleared. I stand ready to assist you further."
      }
    ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6" id="concierge-desk-pane">
      
      {/* Editorial Introduction of Senior Concierge */}
      <div className="lg:col-span-4 space-y-6">
        
        <div className="bg-[#161618] border border-neutral-800/80 p-6 rounded-lg relative overflow-hidden">
          {/* Subtle gold decoration */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-2xl" />
          
          <span className="text-xs font-mono text-gold uppercase tracking-widest block mb-1">
            {t('navContact')}
          </span>
          <h2 className="text-2xl font-serif font-bold text-neutral-100 tracking-wide">
            {t('contactTitle')}
          </h2>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            {t('contactSubtitle')}
          </p>

          <div className="mt-6 space-y-4 pt-6 border-t border-neutral-800/80 text-xs font-mono">
            <div className="flex items-start space-x-3 text-neutral-300">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <span className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                  {currentLang === 'KG' ? "Курорттун дареги:" : currentLang === 'RU' ? "Адрес курорта:" : "Resort Address:"}
                </span>
                <span className="block text-neutral-200 font-sans leading-relaxed text-[11px]">
                  {currentLang === 'KG' 
                    ? "Кыргызстан, Ысык-Көл облусу, Сары-Жаз капчыгайы, Ала-Тоо чокусунун этеги (1600м бийиктик)"
                    : currentLang === 'RU'
                    ? "Кыргызстан, Иссык-Кульская область, ущелье Сары-Джаз, подножие пика Ала-Тоо (высота 1600м)"
                    : "Sary-Jaz Alpine Canyon, Ala-Too Peak foothills (1,600m altitude), Issyk-Kul Region, Kyrgyzstan"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-neutral-300 border-t border-neutral-850 pt-3">
              <PhoneCall className="h-4 w-4 text-gold shrink-0" />
              <span>Secure Hot-Line: <strong className="text-gold">+996 (312) 5★-ALTYN</strong></span>
            </div>
            <div className="flex items-center space-x-3 text-neutral-300">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <span>Diplomacy Email: <strong className="text-gold">concierge@altynpalace.kg</strong></span>
            </div>
            <div className="flex items-center space-x-3 text-neutral-300">
              <Key className="h-4 w-4 text-gold shrink-0" />
              <span>PGP Safe: <strong className="text-gold">0x5F3E...A89B</strong></span>
            </div>
            <a 
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-neutral-300 border-t border-neutral-850 pt-3 hover:text-[#25D366] transition-colors group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#25D366] shrink-0 transition-transform group-hover:scale-110">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp Chat: <strong className="text-[#25D366] font-bold">+996 (555) 77-55-55</strong></span>
            </a>
            
            {/* Embedded Google Map */}
            <div className="border border-neutral-800 rounded-md overflow-hidden relative group mt-4">
              <div className="bg-neutral-900 border-b border-neutral-800 px-3 py-2 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  {currentLang === 'KG' ? "Интерактивдүү Карта" : currentLang === 'RU' ? "Интерактивная карта" : "Interactive Google Map"}
                </span>
                <span className="text-[8px] font-mono text-neutral-500">
                  GPS: 42.146, 79.030
                </span>
              </div>
              <div className="h-[180px] w-full bg-neutral-950">
                <iframe
                  title="Altyn Palace Location on Google Maps"
                  src="https://maps.google.com/maps?q=Sary-Jaz,%20Issyk-Kul,%20Kyrgyzstan&t=k&z=11&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 border-none"
                  style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(115%) brightness(95%) grayscale(20%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
              <div className="p-2 border-t border-neutral-850/60 bg-neutral-950/80 text-center">
                <a 
                  href="https://google.com/maps/?q=Sary-Jaz,+Kyrgyzstan" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block text-[9px] font-mono text-gold hover:text-white hover:underline uppercase tracking-wider"
                >
                  {currentLang === 'KG' ? "Google Картадан Көрүү ↗" : currentLang === 'RU' ? "Открыть на Google Карте ↗" : "View on Google Maps Page ↗"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time statistics or facts about service speed */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900/40 p-4 border border-neutral-800/80 rounded">
            <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-mono">AI response time</span>
            <span className="block text-md font-bold font-mono text-gold mt-1">Real-Time</span>
            <span className="block text-[8px] text-neutral-400 mt-0.5">Powered by Gemini 3.5</span>
          </div>
          <div className="bg-neutral-900/40 p-4 border border-neutral-800/80 rounded">
            <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-mono">Guard dispatch</span>
            <span className="block text-md font-bold font-mono text-gold mt-1">&lt; 5 Minutes</span>
            <span className="block text-[8px] text-neutral-400 mt-0.5">Urgent military response</span>
          </div>
        </div>

        {/* Decorative quote or pledge */}
        <div className="bg-gradient-to-r from-gold/5 to-transparent p-4 border-l-2 border-gold text-neutral-300 rounded-r">
          <p className="text-xs leading-relaxed italic font-sans text-neutral-350">
            "Биздин максат – убакыттын жана мейкиндиктин чектөөлөрүн жоюп, сизге тоо бейишиндеги эң купуялуу жайлуулукту сунуштоо."
          </p>
          <span className="block text-[9px] uppercase font-mono font-bold tracking-widest text-gold mt-2">
            — Уланбек Чолуров, Башкы консьерж
          </span>
        </div>

      </div>

      {/* Interactive Desk (Segmented Controller) */}
      <div className="lg:col-span-8 flex flex-col h-full" id="concierge-inquiry-box">
        <div className="bg-[#161618] p-6 rounded-lg border border-neutral-800/80 flex flex-col h-full">
          
          {/* Top Segmented Tabs for Form vs. Online AI */}
          <div className="grid grid-cols-2 bg-neutral-950 p-1 rounded-sm border border-neutral-805 mb-6 shrink-0">
            <button
              onClick={() => setActiveMode('ai')}
              type="button"
              className={`py-2 text-center text-xs font-mono font-bold uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMode === 'ai' 
                  ? 'bg-gold text-neutral-950 shadow-md font-bold' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>{currentLang === 'KG' ? "ИИ Онлайн Консьерж" : currentLang === 'RU' ? "ИИ Онлайн Ассистент" : "AI Specialist (24/7)"}</span>
            </button>
            <button
              onClick={() => setActiveMode('form')}
              type="button"
              className={`py-2 text-center text-xs font-mono font-bold uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMode === 'form' 
                  ? 'bg-gold text-[#0a0a0b] shadow-md font-bold' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{currentLang === 'KG' ? "Радио коопсуздук каты" : currentLang === 'RU' ? "Запрос Консьержу" : "Bespoke Dispatch Form"}</span>
            </button>
          </div>

          {/* MODE 1: Conversation helper */}
          {activeMode === 'ai' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1" id="ai-chat-interface">
              
              {/* Left Column: AI Chat Panel */}
              <div className="xl:col-span-7 flex flex-col space-y-4 min-h-[460px]">
                
                {/* Header inside chat */}
                <div className="flex items-center justify-between border-b border-neutral-805 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gold/10 p-1.5 rounded-full text-gold">
                      <Bot className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-neutral-200 font-mono tracking-wider">
                        Altyn Concierge AI
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[9px] text-emerald-400 font-mono">LIVE / INSTANT SECURED</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleResetChat}
                    title="Clear Chat Thread"
                    className="p-1 px-2.5 bg-neutral-950 border border-neutral-850 hover:border-gold/30 hover:text-gold text-[10px] text-neutral-400 font-mono rounded flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{currentLang === 'KG' ? "Тазалоо" : currentLang === 'RU' ? "Сбросить чат" : "Clear"}</span>
                  </button>
                </div>

                {/* Chat Message Scroll viewport */}
                <div 
                  className="flex-1 bg-neutral-950/80 p-4 rounded border border-neutral-805 h-[270px] overflow-y-auto space-y-3 custom-scrollbar text-xs"
                  id="chat-scroller"
                >
                  {aiHistory.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-2.5 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      <div className={`p-1.5 rounded-full shrink-0 ${m.role === 'user' ? 'bg-gold/20 text-gold' : 'bg-neutral-850 text-neutral-300'}`}>
                        {m.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </div>
                      <div className={`p-3 rounded-md leading-relaxed whitespace-pre-wrap font-sans text-[11px] ${
                        m.role === 'user' 
                          ? 'bg-gold/15 text-gold border border-gold/25' 
                          : 'bg-neutral-900 border border-neutral-805 text-neutral-250'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTalkingToAi && (
                    <div className="flex items-center gap-2.5 max-w-[80%] mr-auto text-neutral-400 font-mono text-[9px] animate-pulse">
                      <div className="bg-neutral-850 p-1.5 rounded-full text-gold">
                        <Bot className="h-3 w-3 animate-spin" />
                      </div>
                      <span>Altyn Concierge is composing response...</span>
                    </div>
                  )}
                </div>

                {/* Predefined prompt questions row */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] uppercase font-mono text-neutral-500 tracking-wider">
                    {currentLang === 'KG' ? "Мисал суроолор:" : currentLang === 'RU' ? "Рекомендуемые вопросы:" : "Guest sample inquires:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5" id="suggestions-box">
                    {currentSuggestions.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleTalkToAi(prompt)}
                        disabled={isTalkingToAi}
                        className="text-[10px] font-mono text-gold hover:text-neutral-950 hover:bg-gold bg-gold/5 border border-gold/30 hover:border-gold px-3 py-1.5 rounded-full transition-all duration-200 text-left cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input field */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleTalkToAi(chatInput); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={currentLang === 'KG' ? "Чатыңыздан бөлмө бааларын да сурасаңыз болот..." : currentLang === 'RU' ? "Спросите о ценах комнат или услугах..." : "Ask your suite price, luxury amenities or spa options..."}
                    className="flex-grow bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none px-4 py-3 rounded text-neutral-200 text-xs text-neutral-300 font-sans"
                    id="chat-text-input"
                    disabled={isTalkingToAi}
                  />
                  <button
                    type="submit"
                    disabled={isTalkingToAi || !chatInput.trim()}
                    className="px-4 py-3 bg-gold hover:opacity-90 disabled:opacity-30 rounded text-neutral-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{currentLang === 'KG' ? "Жөнөтүү" : currentLang === 'RU' ? "Спросить" : "Inquire"}</span>
                  </button>
                </form>

              </div>

              {/* Right Column: Instant Online Booking Panel */}
              <div className="xl:col-span-5 border-t xl:border-t-0 xl:border-l border-neutral-800 xl:pl-6 pt-6 xl:pt-0 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <Calendar className="h-3.5 w-3.5 text-gold animate-pulse" />
                    <span>{currentLang === 'KG' ? "Тез Онлайн Брондоо" : currentLang === 'RU' ? "Быстрое Бронирование" : "Speedy Online Booking"}</span>
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                    {currentLang === 'KG'
                      ? "Сиздин купуя заказыңыз падышалык коопсуздук деңгээлинде дароо кабыл алынып, ИИ конок тизмесине кошулат."
                      : currentLang === 'RU'
                      ? "Мгновенно забронируйте роскошные номера с приоритетным подтверждением и поддержкой ИИ ассистента."
                      : "Instantly reserve key luxury suites recommended by our AI with immediate 5-star military clearance."}
                  </p>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[310px] pr-1" id="ai-booking-suites-list">
                  {LUXURY_ROOMS.map((room) => (
                    <div 
                      key={room.id}
                      className="bg-neutral-950/80 p-3 rounded border border-neutral-850 hover:border-gold/30 transition-all flex flex-col justify-between gap-3 relative group"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={room.image} 
                          alt={room.name[currentLang]} 
                          className="w-14 h-14 object-cover rounded border border-neutral-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <span className="block text-xs font-serif font-bold text-neutral-200 truncate group-hover:text-gold transition-colors">
                            {room.name[currentLang]}
                          </span>
                          <span className="block text-[9px] font-mono text-neutral-500">
                            {room.sizeSqm} sqm • max {room.maxGuests} guests
                          </span>
                          <span className="block text-xs font-mono font-bold text-gold mt-1">
                            ${room.pricePerNight} <span className="text-[9px] text-neutral-500 font-normal">/{currentLang === 'KG' ? "түн" : currentLang === 'RU' ? "ночь" : "night"}</span>
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectSuite?.(room)}
                        className="w-full py-2 bg-neutral-900 hover:bg-gold hover:text-neutral-950 border border-gold/30 hover:border-gold text-gold text-[10px] font-mono uppercase tracking-wider font-bold rounded transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>{currentLang === 'KG' ? "АКЫРКЫ ЭЭЛӨӨ" : currentLang === 'RU' ? "ЗАБРОНИРОВАТЬ" : "BOOK INSTANTLY"}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0a0a0b] p-3 rounded border border-neutral-850 text-center">
                  <span className="block text-[9px] font-mono text-[#6c6c70]">
                    {currentLang === 'KG' ? "Бардык заказдар шифрленген канал аркылуу өтөт" : currentLang === 'RU' ? "Все заказы защищены сквозным шифрованием" : "All direct reservations are backed by 100% security guarantee"}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* MODE 2: Traditional booking dispatch form */}
          {activeMode === 'form' && (
            <div className="flex flex-col flex-grow">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4" id="concierge-success-box">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 animate-pulse">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100">{currentLang === 'KG' ? "Купуя Кат Кабыл Алынды!" : currentLang === 'RU' ? "Секретный запрос получен!" : "Confidential Inquiry Transmitted!"}</h3>
                  <p className="text-xs text-neutral-400 text-center max-w-sm">
                    {t('conSuccessMsg')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between" id="concierge-request-form">
                  <div className="border-b border-neutral-805 pb-3 mb-2 flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-md font-bold text-gold flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>{t('conInquiryTitle')}</span>
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">Fully shielded guest communication network</p>
                    </div>
                    <ShieldAlert className="h-5 w-5 text-gold/30" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1.5">{t('revNameLbl')}</label>
                      <input
                        type="text"
                        required
                        placeholder="His Excellency / Her Royal Highness"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none px-4 py-2.5 rounded text-neutral-200 text-xs text-neutral-300"
                        id="inquiry-guest-name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1.5">{t('lblEmail')}</label>
                      <input
                        type="email"
                        required
                        placeholder="secured.alias@mail.net"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none px-4 py-2.5 rounded text-neutral-200 text-xs font-mono"
                        id="inquiry-guest-email"
                      />
                    </div>
                  </div>

                  <div className="shrink-0">
                    <label className="block text-xs text-neutral-300 mb-1.5">Request Priority Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {categories.map((cat) => {
                        const isSelected = category === cat.label.EN;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.label.EN)}
                            className={`p-2.5 rounded border text-left text-xs transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-gold/10 border-gold text-gold font-bold' 
                                : 'bg-[#0a0a0b] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                            id={`category-select-${cat.id}`}
                          >
                            {cat.label[currentLang]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <label className="block text-xs text-neutral-300 mb-1.5">{t('conMessageLbl')}</label>
                    <textarea
                      rows={3}
                      required
                      placeholder={currentLang === 'KG' ? "Купуялуу өтүнүчтөрүңүздү ушул жерге жазыңыз..." : currentLang === 'RU' ? "Опишите ваши индивидуальные пожелания..." : "Write your precise requirements..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-3 rounded text-neutral-250 text-xs leading-relaxed"
                      id="inquiry-message"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gold hover:opacity-90 disabled:opacity-50 text-neutral-950 font-serif font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center space-x-2 shadow cursor-pointer shrink-0"
                    id="submit-inquiry-btn"
                  >
                    {submitting ? (
                      <span className="animate-spin h-4 w-4 border-2 border-neutral-950 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>{t('conInquiryBtn')}</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
