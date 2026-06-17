import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Menu, X, Languages, Award, Calendar, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
}

export default function Navbar({
  currentLang,
  setLang,
  activeTab,
  setActiveTab,
  bookingCount
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  const whatsAppPhone = "996555775555";
  const whatsAppUrl = currentLang === 'KG'
    ? `https://wa.me/${whatsAppPhone}?text=Саламатсызбы%20Altyn%20Palace%20жана%20Гүлжан%20айымдын%20курорту!%20Бөлмөлөрдү%20жана%20кызматтарды%20брондоо%20кызыктырат.`
    : currentLang === 'RU'
    ? `https://wa.me/${whatsAppPhone}?text=Здравствуйте!%20Я%20хочу%20узнать%20насчет%20бронирования%20номеров%20и%20услуг%20в%20курорте%20Altyn%20Palace.`
    : `https://wa.me/${whatsAppPhone}?text=Hello%20Altyn%20Palace%20Resort!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20suite%20and%20luxury%20services.`;

  const tabs = [
    { id: 'home', label: t('navHome') },
    { id: 'rooms', label: t('navRooms') },
    { id: 'spapool', label: t('navSpaPool') },
    { id: 'bookings', label: t( 'navBookings' ), count: bookingCount },
    { id: 'reviews', label: t('navReviews') },
    { id: 'contact', label: t('navContact') }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'KG', label: 'Кыргызча' },
    { code: 'EN', label: 'English' },
    { code: 'RU', label: 'Русский' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const getLanguageLabel = (code: Language) => {
    if (code === 'KG') return 'KG';
    if (code === 'RU') return 'RU';
    return 'EN';
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-md border-b border-gold/15 text-neutral-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-brand-container"
          >
            <div className="relative p-2 rounded-lg border border-gold/20 bg-neutral-900 group-hover:border-gold/40 transition-colors">
              <Award className="h-6 w-6 text-gold animate-pulse" />
              <div className="absolute inset-0 rounded-lg bg-gold/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-widest text-gold uppercase">
                {t('brandName')}
              </span>
              <span className="block text-[10px] tracking-wider text-neutral-400 font-mono">
                {t('brandSubtitle')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-all rounded-md duration-300 ${
                  activeTab === tab.id
                    ? 'text-gold bg-neutral-900/60 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-250 hover:bg-neutral-900/30'
                }`}
                id={`nav-tab-${tab.id}`}
              >
                <div className="flex items-center space-x-1.5ClassName">
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-neutral-950 animate-bounce">
                      {tab.count}
                    </span>
                  )}
                </div>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold rounded-full shadow-[0_1px_4px_rgba(212,175,55,0.4)]" />
                )}
              </button>
            ))}
          </div>

          {/* Language / Action Elements */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Switch Capsule */}
            <div className="relative bg-[#161618] border border-neutral-800 rounded-full p-1 flex items-center space-x-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLang(lang.code)}
                  className={`px-3 py-1 text-xs font-mono tracking-wider rounded-full transition-all duration-300 ${
                    currentLang === lang.code
                      ? 'bg-gold text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  id={`lang-toggle-${lang.code}`}
                >
                  {getLanguageLabel(lang.code)}
                </button>
              ))}
            </div>

            {/* WhatsApp Quick Action Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20ba56] text-neutral-950 hover:text-white text-xs font-mono font-bold uppercase rounded-sm transition-all duration-300 shadow-[0_2px_8px_rgba(37,211,102,0.2)]"
              id="nav-whatsapp-btn"
              title={currentLang === 'KG' ? "Ватсаптан жазуу" : currentLang === 'RU' ? "Написать в Ватсап" : "Send WhatsApp message"}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Quick Action Button */}
            <button
              onClick={() => handleTabClick('rooms')}
              className="px-4 py-2 border border-gold/80 text-gold hover:bg-gold hover:text-neutral-950 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.05)]"
              id="nav-quick-book-btn"
            >
              {t('btnBookNow')}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            
            {/* Lang switcher icon for mobile */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-md border border-neutral-800 bg-[#161618] text-neutral-400 hover:text-gold"
                id="mobile-lang-trigger"
              >
                <Languages className="h-5 w-5" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-neutral-950 border border-neutral-800 py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-xs font-mono ${
                        currentLang === lang.code
                          ? 'text-gold font-bold bg-[#161618]'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-neutral-800 bg-[#161618] text-neutral-400 hover:text-gold"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0b]/98 border-b border-neutral-800 py-4 px-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium tracking-wide rounded-md transition-all ${
                activeTab === tab.id
                  ? 'text-gold bg-[#161618] border-l-2 border-gold font-semibold'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900/50'
              }`}
              id={`mobile-nav-tab-${tab.id}`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="h-5 w-5 flex items-center justify-center rounded-full bg-gold text-xs font-bold text-neutral-950">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
          <div className="pt-4 border-t border-neutral-900 grid grid-cols-2 gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1 px-4 py-3 bg-[#25D366] hover:bg-[#20ba56] text-neutral-950 hover:text-white text-sm font-bold tracking-widest uppercase rounded-sm transition-all text-center"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => handleTabClick('rooms')}
              className="w-full text-center px-4 py-3 bg-gold hover:bg-gold-550 text-neutral-950 text-sm font-bold tracking-widest uppercase rounded-sm transition-all"
            >
              {t('btnBookNow')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
