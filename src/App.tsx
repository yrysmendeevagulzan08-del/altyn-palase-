import React, { useState, useEffect } from 'react';
import { Language, LuxuryRoom, GuestBooking, GuestReview } from './types';
import { TRANSLATIONS, LUXURY_ROOMS, INITIAL_REVIEWS, HERO_IMAGE, FOUNDER_IMAGE, POOL_IMAGE, SPA_IMAGE } from './data';
import Navbar from './components/Navbar';
import RoomCard from './components/RoomCard';
import RoomDetailModal from './components/RoomDetailModal';
import ReviewSection from './components/ReviewSection';
import ConciergeDesk from './components/ConciergeDesk';
import PriceEstimator from './components/PriceEstimator';
import FloatingChat from './components/FloatingChat';
import { 
  Award, Star, Sparkles, ShieldCheck, MapPin, 
  Layers, Compass, Waves, Check, ChevronRight, X 
} from 'lucide-react';

export default function App() {
  // Localization setup
  const [currentLang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('altyn_lang');
    return (saved as Language) || 'KG';
  });

  useEffect(() => {
    localStorage.setItem('altyn_lang', currentLang);
  }, [currentLang]);

  // Tab Navigation setup
  const [activeTab, setActiveTab] = useState<string>('home');

  // Bookings registry state
  const [bookings, setBookings] = useState<GuestBooking[]>(() => {
    const saved = localStorage.getItem('altyn_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('altyn_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Reviews registry state
  const [reviews, setReviews] = useState<GuestReview[]>(() => {
    const saved = localStorage.getItem('altyn_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('altyn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Selected Room for booking modal
  const [selectedRoom, setSelectedRoom] = useState<LuxuryRoom | null>(null);

  // Success Confirmation modal state
  const [justBooked, setJustBooked] = useState<GuestBooking | null>(null);

  // Filter conditions
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [minGuests, setMinGuests] = useState<number>(1);

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  const whatsAppPhone = "996555775555";
  const telegramUsername = "altynpalace_bot";
  const telegramUrl = `https://t.me/${telegramUsername}`;
  const whatsAppUrl = currentLang === 'KG'
    ? `https://wa.me/${whatsAppPhone}?text=Саламатсызбы%20Altyn%20Palace%20жана%20Гүлжан%20айымдын%20курорту!%20Бөлмөлөрдү%20жана%20кызматтарды%20брондоо%20кызыктырат.`
    : currentLang === 'RU'
    ? `https://wa.me/${whatsAppPhone}?text=Здравствуйте!%20Я%20хочу%20узнать%20насчет%20бронирования%20номеров%20и%20услуг%20в%20курорте%20Altyn%20Palace.`
    : `https://wa.me/${whatsAppPhone}?text=Hello%20Altyn%20Palace%20Resort!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20suite%20and%20luxury%20services.`;

  // Handle successful reservation creation
  const handleBookingSuccess = (newBooking: GuestBooking) => {
    setBookings([newBooking, ...bookings]);
    setSelectedRoom(null); // Close the detail modal
    setJustBooked(newBooking); // Open confirmation receipt
  };

  // Cancel reservation
  const handleCancelBooking = (bookingId: string) => {
    if (confirm(t('cancelConfirm'))) {
      setBookings(bookings.filter(b => b.id !== bookingId));
    }
  };

  // Add review
  const handleAddReview = (newReview: GuestReview) => {
    setReviews([newReview, ...reviews]);
  };

  // Filters calculation
  const filteredRooms = LUXURY_ROOMS.filter(r => 
    r.pricePerNight <= maxPrice && r.maxGuests >= minGuests
  );

  return (
    <div className="min-h-screen bg-dark-bg luxury-bg text-neutral-100 flex flex-col font-sans selection:bg-gold/30 selection:text-gold">
      
      {/* Dynamic Navigation Bar */}
      <Navbar 
        currentLang={currentLang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingCount={bookings.length}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-20 pb-20 animate-fade-in" id="home-view">
            
            {/* Grand Hero Header Banner */}
            <div className="relative min-h-[85vh] flex items-center justify-center bg-neutral-950 overflow-hidden">
              
              {/* Backlit generated image background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={HERO_IMAGE} 
                  alt="Altyn Palace Grand Lobby" 
                  className="w-full h-full object-cover opacity-35 scale-100 filter brightness-90 animate-subtle-zoom"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40" />
              </div>

              {/* Main Titles Overlays */}
              <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
                
                {/* Visual Certification */}
                <div className="inline-flex items-center space-x-2 bg-neutral-900/80 backdrop-blur border border-gold/25 px-4 py-1.5 rounded-full shadow-lg" id="five-star-seal">
                  <div className="flex text-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300">
                    {t('ratingLabel')}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide text-neutral-100 leading-tight">
                  {t('heroTitle')}
                </h1>

                <p className="max-w-3xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed font-sans">
                  {t('heroSubtitle')}
                </p>

                {/* Instant Actions row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('rooms')}
                    className="w-full sm:w-auto px-8 py-4 bg-gold hover:opacity-90 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-xl"
                    id="hero-explore-btn"
                  >
                    {t('btnExploreSuites')}
                  </button>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white hover:text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(37,211,102,0.3)] flex items-center justify-center space-x-2"
                    id="hero-whatsapp-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>
                      {currentLang === 'KG' ? "WhatsApp байланыш" : currentLang === 'RU' ? "Связаться в WhatsApp" : "WhatsApp Chat"}
                    </span>
                  </a>

                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#0088cc] hover:bg-[#007bbd] text-white hover:text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(0,136,204,0.3)] flex items-center justify-center space-x-2"
                    id="hero-telegram-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 shrink-0">
                      <path d="M11.99 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.62 0 11.99 0zM17.5 8.95l-1.72 8.12c-.13.58-.48.72-.96.44l-2.62-1.93-1.26 1.22c-.14.14-.26.26-.53.26l.19-2.66 4.84-4.37c.21-.19-.05-.29-.33-.11L9.13 13.04l-2.58-.81c-.56-.18-.57-.56.12-.83l10.08-3.89c.47-.17.88.11.75.71z"/>
                    </svg>
                    <span>
                      {currentLang === 'KG' ? "Telegram байланыш" : currentLang === 'RU' ? "Связаться в Telegram" : "Telegram Chat"}
                    </span>
                  </a>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="w-full sm:w-auto px-8 py-4 border border-gold/40 text-gold hover:bg-[#161618]/70 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm"
                    id="hero-concierge-btn"
                  >
                    {t('navContact')}
                  </button>
                </div>

              </div>

              {/* Subtle architectural highlights footer line */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center space-x-12 px-6 py-2.5 bg-neutral-950/85 backdrop-blur-md rounded-md border border-neutral-850 text-[10px] font-mono text-neutral-400 tracking-wider">
                <span className="flex items-center space-x-1.5"><MapPin className="h-3.5 w-3.5 text-gold" /> <span>{t('fact1Val')}</span></span>
                <span className="flex items-center space-x-1.5"><Layers className="h-3.5 w-3.5 text-gold" /> <span>{t('fact2Val')}</span></span>
                <span className="flex items-center space-x-1.5"><Waves className="h-3.5 w-3.5 text-gold" /> <span>{t('fact3Val')}</span></span>
              </div>

            </div>

            {/* Quick resort statistics bento details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-[#161618] border border-neutral-805 p-6 rounded relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                  <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{t('fact1Title')}</span>
                  <span className="block text-lg font-bold text-neutral-200 mt-2 font-mono group-hover:text-gold transition-colors">{t('fact1Val')}</span>
                </div>

                <div className="bg-[#161618] border border-neutral-805 p-6 rounded relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                  <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{t('fact2Title')}</span>
                  <span className="block text-lg font-bold text-neutral-200 mt-2 font-mono group-hover:text-gold transition-colors">{t('fact2Val')}</span>
                </div>

                <div className="bg-[#161618] border border-neutral-805 p-6 rounded relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                  <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{t('fact3Title')}</span>
                  <span className="block text-lg font-bold text-neutral-200 mt-2 font-mono group-hover:text-gold transition-colors">{t('fact3Val')}</span>
                </div>

                <div className="bg-[#161618] border border-neutral-805 p-6 rounded relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                  <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{t('fact4Title')}</span>
                  <span className="block text-lg font-bold text-neutral-200 mt-2 font-mono group-hover:text-gold transition-colors">{t('fact4Val')}</span>
                </div>

              </div>
            </div>

            {/* Curated Previews of Royal Chambers */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800/60 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-gold tracking-widest block mb-1">{t('navRooms')}</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-neutral-200">{t('filterTitle')}</h2>
                </div>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="text-xs font-mono font-bold text-gold hover:text-gold/80 flex items-center space-x-1.5 mt-2 md:mt-0"
                  id="view-all-rooms-btn"
                >
                  <span>{t('lblAllSuite')}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Showcase list (2 premier rooms on home) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LUXURY_ROOMS.slice(0, 2).map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    currentLang={currentLang}
                    onSelect={(id) => {
                      const found = LUXURY_ROOMS.find(r => r.id === id);
                      if (found) setSelectedRoom(found);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Room Rates & Price Estimator Calculator */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PriceEstimator 
                currentLang={currentLang}
                onSelectSuite={(room) => {
                  setSelectedRoom(room);
                }}
              />
            </div>

            {/* Visual Editorial: Founder Guljan Presentation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="founder-section">
              <div className="bg-[#111112] border border-neutral-805 p-8 md:p-12 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-bl from-gold/5 via-transparent to-transparent rounded-full blur-3xl" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Founder Portrait Frame */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-gold/30 to-neutral-850 rounded-sm blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                      <div className="relative bg-neutral-950 p-2 rounded-sm border border-neutral-800">
                        <img 
                          src={FOUNDER_IMAGE} 
                          alt="Guljan - Founder of Altyn Palace" 
                          className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-sm filter brightness-95 contrast-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-[#0a0a0b]/90 backdrop-blur-sm border border-gold/25 p-2 text-center rounded-sm">
                          <span className="block text-xs font-serif font-bold text-neutral-100 uppercase tracking-widest">
                            {currentLang === 'KG' ? "Гүлжан Ырысмендеева" : currentLang === 'RU' ? "Гулжан Ырысмендеева" : "Guljan Yrysmendeeva"}
                          </span>
                          <span className="block text-[9px] font-mono text-gold uppercase tracking-wider mt-0.5">
                            {currentLang === 'KG' ? "Негиздөөчү & Башкы Директор" : currentLang === 'RU' ? "Основатель и Ген. Директор" : "Founder & Managing Director"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Founder Story content narrative */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-gold tracking-widest block mb-1">
                        {currentLang === 'KG' ? "Биздин Негиздөөчү" : currentLang === 'RU' ? "Наш Основатель" : "Founder's Vision"}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-neutral-100">
                        {currentLang === 'KG' ? "Ала-Тоо Кучагындагы Падышалык Жайлуулук" : currentLang === 'RU' ? "Королевский Уют в Сердце Ала-Тоо" : "Authentic Mountain Serenity Reimagined"}
                      </h2>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
                      <p>
                        {currentLang === 'KG' 
                          ? "«Менин максатым — Кыргызстандын сыймыктуу тоо табиятынын ажайып кооздугун жана ата-бабаларыбыздын меймандостугун эң жогорку дүйнөлүк 5-жылдыздуу люкс стандарттары менен айкалыштыруу болчу. Altyn Palace сиз үчүн кадимки эле конок үйү эмес, ал коопсуздук, купуялуулук жана жан дүйнө тынчтыгынын ыйык бешиги болуп саналат.»"
                          : currentLang === 'RU'
                          ? "«Моей целью было воссоздать первозданную красоту горного Кыргызстана и объединить вековое центральноазиатское гостеприимство с высочайшими мировыми стандартами ультра-роскоши 5★. Altyn Palace создан как защищенное убежище абсолютного покоя, изысканного вкуса и уединения.»"
                          : "“My singular lifelong pursuit was to elevate Kyrgyzstan’s dramatic alpine landscapes and sacred hospitality to the highest international peaks of 5-star ultra-luxury. Altyn Palace was crafted to serve as an uncompromising sanctuary of security, pristine wellness, and absolute privacy.”"}
                      </p>
                      <p>
                        {currentLang === 'KG'
                          ? "Гүлжан Ырысмендеева тарабынан 2024-жылы негизделген бул кепилденген жай, эң белгилүү эл аралык архитекторлор жана спа-терапевттер менен биргеликте VIP деңгээлдеги инсандар үчүн долбоорлонгон. Биз ар бир коногубузду атыбыздан белгилүү болгондой эле алтындай баалап, ар бир секундду падышалык деңгээлде өткөрүүнү камсыздайбыз."
                          : currentLang === 'RU'
                          ? "Основанный в 2024 году Гулжан Ырысмендеевой, этот роскошный курорт проектировался лучшими международными архитекторами для приема делегаций, мировых лидеров и ценителей уединения. Мы окружаем заботой каждого гостя, предлагая королевские привилегии и горный климат высокой чистоты."
                          : "Established in 2024 by Guljan Yrysmendeeva, this elite resort was designed in partnership with premier international architects to host global dignitaries and connoisseurs of exquisite tranquility. Here, every experience is meticulously hand-tailored, treating your stay with the golden care that defines our heritage."}
                      </p>
                    </div>

                    {/* Signature details */}
                    <div className="pt-6 border-t border-neutral-800/60 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex">
                          {currentLang === 'KG' ? "ДОЛБООРЛОНГОН ЖЫЛЫ" : currentLang === 'RU' ? "ГОД ОСНОВАНИЯ" : "FOUNDATION YEAR"}
                        </span>
                        <span className="block text-sm font-bold font-mono text-gold">2024 (Ala-Too Peak)</span>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex justify-end">
                          {currentLang === 'KG' ? "БЕРИЛГЕН УБАДА" : currentLang === 'RU' ? "ПРИНЦИП РАБОТЫ" : "SOLEMN PLEDGE"}
                        </span>
                        <span className="block text-sm font-bold text-[#f5f5f7]">{currentLang === 'KG' ? "Жүз пайыз Купуялуулук" : currentLang === 'RU' ? "Полная конфиденциальность" : "100% Uncompromised NDA"}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Standard complimentary details summary banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#161618] border border-neutral-800/80 p-8 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-3xl" />
                
                <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
                  <h3 className="text-xl md:text-2xl font-serif font-bold tracking-wide text-neutral-200">
                    {t('amenTitle')}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {t('amenSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  <div className="space-y-3 bg-[#0a0a0b]/60 p-5 border border-neutral-805 rounded relative group hover:border-gold/30 transition-all">
                    <div className="h-10 w-10 rounded border border-gold/20 bg-neutral-900 flex items-center justify-center text-gold shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-100">{t('amen1Title')}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">{t('amen1Desc')}</p>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#0a0a0b]/60 p-5 border border-neutral-805 rounded relative group hover:border-gold/30 transition-all">
                    <div className="h-10 w-10 rounded border border-gold/20 bg-neutral-900 flex items-center justify-center text-gold shrink-0">
                      <Waves className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-100">{t('amen2Title')}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">{t('amen2Desc')}</p>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#0a0a0b]/60 p-5 border border-neutral-805 rounded relative group hover:border-gold/30 transition-all">
                    <div className="h-10 w-10 rounded border border-gold/20 bg-neutral-900 flex items-center justify-center text-gold shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-100">{t('amen3Title')}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">{t('amen3Desc')}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ALL SUITES */}
        {activeTab === 'rooms' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in" id="rooms-view">
            
            {/* Header description */}
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
                {t('navRooms')}
              </span>
              <h1 className="text-3xl font-serif font-bold text-neutral-100 tracking-wide">
                {t('filterTitle')}
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t('filterSubtitle')}
              </p>
            </div>

            {/* Filter Widgets Shelf */}
            <div className="bg-[#161618] border border-neutral-800/80 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center shrink-0" id="filters-shelf">
              
              {/* Slider filter for maximum rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>{t('lblMaxPrice')}</span>
                  <span className="font-bold text-gold">${maxPrice} / night</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                  id="range-max-price"
                />
                <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                  <span>$1,500</span>
                  <span>$4,000</span>
                </div>
              </div>

              {/* Occupied guests dropdown limits */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-400">{t('lblGuestsCount')}</label>
                <div className="flex space-x-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setMinGuests(num)}
                      className={`flex-grow py-2 border text-xs font-mono rounded transition-colors ${
                        minGuests === num 
                          ? 'bg-gold border-gold text-neutral-950 font-bold' 
                          : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                      }`}
                      id={`guest-filter-btn-${num}`}
                    >
                      {num}+ {currentLang === 'KG' ? "конок" : currentLang === 'RU' ? "гостей" : "guests"}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Suites listing grid layout */}
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="rooms-search-grid">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    currentLang={currentLang}
                    onSelect={(id) => {
                      const found = LUXURY_ROOMS.find(r => r.id === id);
                      if (found) setSelectedRoom(found);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-neutral-950/65 text-center py-20 rounded border border-neutral-850 max-w-md mx-auto" id="no-rooms-fallback">
                <p className="text-sm text-neutral-400 font-mono">No suites match your exact luxury requirements.</p>
                <button 
                  onClick={() => { setMaxPrice(4000); setMinGuests(1); }}
                  className="mt-4 text-xs font-bold font-mono text-gold hover:underline"
                >
                  Reset all criteria
                </button>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: GUEST RESIDENCIES / MY RESERVATIONS */}
        {activeTab === 'bookings' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-fade-in" id="bookings-view">
            
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-200">
                {t('myBookingsTitle')}
              </h1>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-6" id="bookings-log">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-neutral-905 border border-neutral-800 rounded-lg overflow-hidden flex flex-col md:flex-row relative"
                    id={`booking-panel-${b.id}`}
                  >
                    
                    {/* Compact Image */}
                    <div className="md:w-1/3 aspect-[4/3] md:aspect-auto relative bg-neutral-900">
                      <img src={b.roomImage} alt={b.roomName[currentLang]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>

                    {/* Receipt breakdown */}
                    <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4 bg-neutral-900/40">
                      <div>
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <span className="block text-[9px] uppercase font-mono text-neutral-500 tracking-wider">Suite type</span>
                            <h3 className="text-lg font-bold text-neutral-100">{b.roomName[currentLang]}</h3>
                          </div>
                          
                          {/* Code Validation and status */}
                          <div className="text-right">
                            <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono">{t('bookingCodeLbl')}</span>
                            <span className="block text-xs font-mono font-bold text-gold bg-neutral-950 px-2.5 py-1 border border-neutral-800 rounded">{b.bookingCode}</span>
                          </div>
                        </div>

                        {/* Dates calculations layout */}
                        <div className="grid grid-cols-2 gap-4 mt-4 py-3 border-t border-b border-neutral-805 text-[11px] font-mono">
                          <div>
                            <span className="block text-neutral-500">{t('lblCheckIn')}</span>
                            <span className="font-semibold text-neutral-300">{b.checkIn}</span>
                          </div>
                          <div>
                            <span className="block text-neutral-500">{t('lblCheckOut')}</span>
                            <span className="font-semibold text-neutral-300">{b.checkOut}</span>
                          </div>
                        </div>

                        {/* Financial calculation */}
                        <div className="py-2 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>{t('perkNights')}: <strong className="text-neutral-200">{b.nightsCount}</strong></span>
                          <span>{t('calcTotal')} <strong className="text-gold text-sm">${b.totalPrice}</strong></span>
                        </div>
                      </div>

                      {/* Cancel reservation triggers */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-850/60">
                        <div className="flex items-center space-x-2 text-[10px] text-emerald-400 font-mono">
                          <Check className="h-4 w-4 bg-emerald-500/10 rounded-full p-0.5" />
                          <span>{t('statusConfirmed')}</span>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="px-3.5 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-[10px] font-mono tracking-wider uppercase rounded"
                        >
                          {t('btnCancelRes')}
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#161618]/50 border border-neutral-805 rounded max-w-md mx-auto" id="no-bookings-fallback">
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {t('myBookingsEmpty')}
                </p>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="mt-6 px-6 py-2.5 bg-gold hover:opacity-90 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded-sm transition-all"
                >
                  {t('btnBookNow')}
                </button>
              </div>
            )}

          </div>
        )}

        {/* VIEW: SPA & POOL GALLERY AND INFORMATION */}
        {activeTab === 'spapool' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in space-y-16" id="spapool-view">
            
            {/* Header description */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
                {currentLang === 'KG' ? "Бейпилдик & Ден-соолук" : currentLang === 'RU' ? "Гармония & Здоровье" : "Serenity & Wellness"}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100 tracking-wide">
                {t('spaPoolTitle')}
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                {t('spaPoolSubtitle')}
              </p>
            </div>

            {/* 1. Hot Thermal Pool Section */}
            <div className="bg-[#111112] border border-neutral-805 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Pool Image Frame */}
              <div className="lg:col-span-7 relative group overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[350px]">
                <img 
                  src={POOL_IMAGE} 
                  alt="Altyn Palace Geothermal Thermal Pool" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                
                {/* Embedded dynamic luxury parameters overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <div className="bg-[#0a0a0b]/85 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 rounded text-[10px] font-mono text-gold uppercase tracking-wider">
                    {currentLang === 'KG' ? "Температура: +38°C" : currentLang === 'RU' ? "Температура: +38°C" : "Temperature: +38°C"}
                  </div>
                  <div className="bg-[#0a0a0b]/85 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded text-[10px] font-mono text-neutral-300 uppercase tracking-wider">
                    {currentLang === 'KG' ? "Геотермалдык булак" : currentLang === 'RU' ? "Термальный источник" : "Natural Geothermal"}
                  </div>
                </div>
              </div>

              {/* Pool Narrative */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-widest block">
                    {currentLang === 'KG' ? "01 • СУУ КЕРЕМЕТИ" : currentLang === 'RU' ? "01 • ВОДНОЕ ВЕЛИЧИЕ" : "01 • AQUATIC SANCTUARY"}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-neutral-100">
                    {t('poolSectionTitle')}
                  </h2>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {t('poolSectionDesc')}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-850/70 space-y-3.5">
                  <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                    {currentLang === 'KG' ? "ӨЗГӨЧӨЛҮКТӨРҮ:" : currentLang === 'RU' ? "ОСОБЕННОСТИ И ПРЕИМУЩЕСТВА:" : "POOL PARAMETERS & FEATURES:"}
                  </h4>
                  <ul className="text-xs space-y-2.5 font-sans text-[#a5a5a5]">
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "Ала-Тоо тоолорунун 360° тегерек панорамасы" : currentLang === 'RU' ? "Круговая 360° панорама заснеженных пиков Ала-Тоо" : "Spectacular 360° sweeping panoramic mountain layouts"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "Кар баскан капчыгайдын ортосундагы жылуу бууланган суу" : currentLang === 'RU' ? "Парящая теплая вода посреди холодного горного ущелья" : "Steaming crystal-clear water with organic restorative mineral salts"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "Элиталык коноктор үчүн 100% купуялуулук деңгээли" : currentLang === 'RU' ? "Высокий уровень приватности для всех почетных гостей" : "Complete privacy and secure sun decks for discrete visits"}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* 2. Spa Salon Section */}
            <div className="bg-[#111112] border border-neutral-805 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Spa Narrative (Left column on desktop for alternating flow) */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-widest block">
                    {currentLang === 'KG' ? "02 • СУУЛУУК ЖАНА ЭС АЛУУ" : currentLang === 'RU' ? "02 • ИМПЕРИЯ КРАСОТЫ" : "02 • REJUVENATION CLINIC"}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-neutral-100">
                    {t('spaSectionTitle')}
                  </h2>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {t('spaSectionDesc')}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-850/70 space-y-3.5">
                  <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                    {currentLang === 'KG' ? "ТЕРАПИЯЛАР ЖАНА ПРОГРАММАЛАР:" : currentLang === 'RU' ? "РИТУАЛЫ УХОДА И УСЛУГИ:" : "SPA SIGNATURE RITUALS:"}
                  </h4>
                  <ul className="text-xs space-y-2.5 font-sans text-[#a5a5a5]">
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "24к алтын чачыратылган органикалык май менен куралган массаж" : currentLang === 'RU' ? "Массаж всего тела с теплым маслом из 24-каратного золота" : "Deep muscle therapy infused with warm pure 24k gold oils"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "Жергиликтүү базальт тоо таштары аркылуу ысык терапия" : currentLang === 'RU' ? "Терапия вулканическими базальтовыми теплыми камнями" : "Volcanic warm basalt stones for thermal point stimulation"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold shrink-0 mt-0.5">✦</span>
                      <span>{currentLang === 'KG' ? "Сары-Жаз капчыгайынын дарылык чөптөрүнөн буу ваннасы" : currentLang === 'RU' ? "Фито-сауны на альпийских можжевеловых травах Сары-Джаза" : "Steam chamber baths loaded with active wild mountain juniper"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Spa Image Frame */}
              <div className="lg:col-span-7 relative group overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[350px] order-1 lg:order-2">
                <img 
                  src={SPA_IMAGE} 
                  alt="Altyn Palace 24k Gold Spa Salon" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                
                {/* Embedded luxury overlay card */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <div className="bg-[#0a0a0b]/85 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 rounded text-[10px] font-mono text-gold uppercase tracking-wider">
                    {currentLang === 'KG' ? "24к Таза Алтын Терапиясы" : currentLang === 'RU' ? "Уход Золотом 24 Карата" : "Pure 24k Gold Infusion"}
                  </div>
                  <div className="bg-[#0a0a0b]/85 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded text-[10px] font-mono text-neutral-300 uppercase tracking-wider">
                    {currentLang === 'KG' ? "Премиум спа бөлмөлөрү" : currentLang === 'RU' ? "Элитные массажные залы" : "VIP Quiet Chambers"}
                  </div>
                </div>
              </div>

            </div>

            {/* Direct action card link */}
            <div className="bg-gradient-to-r from-neutral-950 to-neutral-900 border border-gold/25 p-8 rounded-lg text-center space-y-4">
              <h3 className="text-lg font-serif font-bold text-neutral-100">
                {currentLang === 'KG' ? "Бейпилдикти бүгүн брондоңуз" : currentLang === 'RU' ? "Забронируйте незабываемый спа-ритуал" : "Reserve Your Serene Experience"}
              </h3>
              <p className="text-xs text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
                {currentLang === 'KG'
                  ? "Биздин бардык люкс бөлмөлөрдө калуу үчүн акысыз термалдык спа жана бассейн мүмкүнчүлүгү камтылган. Өзүңүзгө ылайыктуу люкс бөлмөнү тандаңыз."
                  : currentLang === 'RU'
                  ? "Посещение термального бассейна и базовые спа-процедуры включены во все наши люксы по умолчанию. Выберите свой идеальный люкс прямо сейчас."
                  : "All guest suites include unrestricted priority access to our therapeutic thermal pools and standard wellness amenities. Refine your room booking to access these privileges."}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="px-6 py-2.5 bg-gold text-[#0a0a0b] text-xs font-bold font-mono tracking-widest uppercase rounded-sm hover:opacity-90 transition"
                >
                  {t('btnBookNow')}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 4: REVIEWS FEEDBACK */}
        {activeTab === 'reviews' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in" id="reviews-view">
            <ReviewSection 
              currentLang={currentLang} 
              reviews={reviews} 
              onAddReview={handleAddReview} 
            />
          </div>
        )}

        {/* VIEW 5: SECURITY CONCIERGE SERVICE */}
        {activeTab === 'contact' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in" id="contact-view">
            <ConciergeDesk 
              currentLang={currentLang} 
              onSelectSuite={(room) => setSelectedRoom(room)} 
            />
          </div>
        )}

      </main>

      {/* FOOTER PANE */}
      <footer className="bg-neutral-950 border-t border-neutral-900/80 text-neutral-500 text-xs shrink-0 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px]">
          <div>
            <span className="block font-serif font-bold text-neutral-300 text-sm tracking-widest text-gold uppercase">{t('brandName')}</span>
            <span className="block text-[9px] text-neutral-400 mt-1 max-w-md font-sans leading-relaxed">
              📍 {currentLang === 'KG' 
                ? "Дареги: Кыргызстан, Ысык-Көл облусу, Сары-Жаз капчыгайы, Ала-Тоо чокусунун этеги (1600м)"
                : currentLang === 'RU'
                ? "Адрес: Кыргызстан, Иссык-Кульская область, ущелье Сары-Джаз, подножие пика Ала-Тоо (1600м)"
                : "Address: Sary-Jaz Canyon, Ala-Too Peak foothills (1,600m), Issyk-Kul, Kyrgyzstan"}
            </span>
            <span className="block text-[9px] text-neutral-600 mt-1">© 2026 Altyn Palace Hotel Corp. All VIP rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => setActiveTab('rooms')} className="hover:text-gold transition-colors">{t('navRooms')}</button>
            <button onClick={() => setActiveTab('spapool')} className="hover:text-gold transition-colors">{t('navSpaPool')}</button>
            <button onClick={() => setActiveTab('reviews')} className="hover:text-gold transition-colors">{t('navReviews')}</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-gold transition-colors">{t('navContact')}</button>
          </div>
        </div>
      </footer>

      {/* CORE MODAL 1: RESERVATION POPUP FORM WIZARD */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          currentLang={currentLang}
          onClose={() => setSelectedRoom(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* CORE MODAL 2: POST_SUBMISION SENSORY RECEIPT MODAL */}
      {justBooked && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-gold/30 p-8 rounded-lg max-w-md w-full shadow-2xl relative text-center space-y-6" id="booking-success-modal">
            
            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-400/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce-slow">
              <Check className="h-8 w-8 stroke-[3.5px]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif tracking-tight text-neutral-100">{t('successTitle')}</h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t('successSubtitle')}
              </p>
            </div>

            {/* Verification code capsule */}
            <div className="bg-neutral-950 p-4 border border-neutral-805 rounded font-mono text-xs text-center space-y-1">
              <span className="text-[9px] uppercase text-neutral-500">{t('bookingCodeLbl')}</span>
              <span className="block text-lg font-bold text-gold tracking-widest">{justBooked.bookingCode}</span>
            </div>

            {/* Compact summary */}
            <div className="text-neutral-400 text-xs font-mono py-2 space-y-1 border-t border-b border-neutral-805 text-left">
              <div className="flex justify-between"><span>Lodge suite:</span> <span className="text-neutral-200">{justBooked.roomName[currentLang]}</span></div>
              <div className="flex justify-between"><span>Check-In:</span> <span className="text-neutral-200">{justBooked.checkIn}</span></div>
              <div className="flex justify-between"><span>Registered Guest:</span> <span className="text-neutral-200 truncate max-w-[150px]" title={justBooked.guestName}>{justBooked.guestName}</span></div>
              <div className="flex justify-between"><span>Consolidated bill:</span> <span className="text-gold font-bold">${justBooked.totalPrice}</span></div>
            </div>

            <button
              onClick={() => {
                setJustBooked(null);
                setActiveTab('bookings'); // Redirect tab
              }}
              className="w-full py-3 bg-gold hover:opacity-90 text-neutral-950 text-xs font-bold font-serif tracking-wider uppercase rounded-sm font-semibold transition"
              id="confirm-close-btn"
            >
              {currentLang === 'KG' ? "Менин Брондорума өтүү" : currentLang === 'RU' ? "Перейти к Моим броням" : "View My Registries"}
            </button>

          </div>
        </div>
      )}

      {/* Persistent Floating Chat Assist Platform */}
      <FloatingChat currentLang={currentLang} />

    </div>
  );
}
