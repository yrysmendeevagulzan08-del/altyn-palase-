import React, { useState, useEffect } from 'react';
import { LuxuryRoom, Language, LuxuryService, CustomizationOption, GuestBooking } from '../types';
import { TRANSLATIONS, LUXURY_SERVICES, CUSTOMIZATION_OPTIONS } from '../data';
import { 
  X, Sparkles, Check, Calendar, ChevronRight, ChevronLeft, 
  HelpCircle, ShieldCheck, Award, Maximize2, Users, Compass, BedDouble, Info,
  Plane, UserCheck, ChefHat
} from 'lucide-react';

interface RoomDetailModalProps {
  room: LuxuryRoom;
  currentLang: Language;
  onClose: () => void;
  onBookingSuccess: (newBooking: GuestBooking) => void;
}

export default function RoomDetailModal({
  room,
  currentLang,
  onClose,
  onBookingSuccess
}: RoomDetailModalProps) {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  // Wizard state: 1 = Customization & Services, 2 = Dates & Guest Info, 3 = Review & Finalize
  const [step, setStep] = useState<number>(1);

  // Form Fields
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Dates state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 4);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateString(dayAfter));
  const [nightsCount, setNightsCount] = useState<number>(3);
  
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Selected VIP services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Selected Custom choices: CategoryId -> ChoiceId
  const [customChoices, setCustomChoices] = useState<Record<string, string>>({});

  // Initialize custom choices with default (free or first option)
  useEffect(() => {
    const defaults: Record<string, string> = {};
    CUSTOMIZATION_OPTIONS.forEach(opt => {
      defaults[opt.category] = opt.choices[0].id;
    });
    setCustomChoices(defaults);
  }, []);

  // Recalculate nights count whenever check-in or check-out changes
  useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setNightsCount(1);
      return;
    }

    const difference = end.getTime() - start.getTime();
    const computedDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
    if (computedDays <= 0) {
      // automatically push checkout out by 1 day if it is invalid
      const newEnd = new Date(start);
      newEnd.setDate(newEnd.getDate() + 1);
      setCheckOut(formatDateString(newEnd));
      setNightsCount(1);
    } else {
      setNightsCount(computedDays);
    }
  }, [checkIn, checkOut]);

  // Toggle Service
  const toggleService = (srvId: string) => {
    if (selectedServices.includes(srvId)) {
      setSelectedServices(selectedServices.filter(id => id !== srvId));
    } else {
      setSelectedServices([...selectedServices, srvId]);
    }
  };

  // Change custom choice
  const handleCustomChoiceChange = (categoryId: string, choiceId: string) => {
    setCustomChoices(prev => ({
      ...prev,
      [categoryId]: choiceId
    }));
  };

  // Pricing calculations
  const calculatePricing = () => {
    const roomTotal = room.pricePerNight * nightsCount;
    
    // Services pricing (charged per night)
    let servicesTotal = 0;
    selectedServices.forEach(srvId => {
      const srv = LUXURY_SERVICES.find(s => s.id === srvId);
      if (srv) {
        servicesTotal += srv.pricePerNight * nightsCount;
      }
    });

    // Custom choices pricing (flat setup charge or daily)
    let customTotal = 0;
    Object.entries(customChoices).forEach(([catId, choiceId]) => {
      const cat = CUSTOMIZATION_OPTIONS.find(c => c.category === catId);
      if (cat) {
        const choice = cat.choices.find(ch => ch.id === choiceId);
        if (choice) {
          customTotal += choice.price;
        }
      }
    });

    const grandTotal = roomTotal + servicesTotal + customTotal;

    return {
      roomTotal,
      servicesTotal,
      customTotal,
      grandTotal
    };
  };

  const { roomTotal, servicesTotal, customTotal, grandTotal } = calculatePricing();

  // Validate Step 1
  const nextStep = () => {
    setStep(2);
  };

  // Handle reserve registry final action
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert(currentLang === 'KG' ? "Сураныч, бардык негизги талааларды толтуруңуз!" : currentLang === 'RU' ? "Пожалуйста, заполните все обязательные поля!" : "Please fill out all required fields!");
      return;
    }

    const verificationCode = `AP-${Math.floor(10000 + Math.random() * 90000)}-VIP`;

    const newBooking: GuestBooking = {
      id: `booking-${Date.now()}`,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      nightsCount,
      adultsCount,
      childrenCount,
      selectedServices,
      customizationChoices: customChoices,
      additionalNotes,
      totalPrice: grandTotal,
      bookingCode: verificationCode,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    onBookingSuccess(newBooking);
  };

  const getServiceIcon = (iconName: string) => {
    if (iconName === 'Helicopter') return <Plane className="h-5 w-5 text-gold" />;
    if (iconName === 'UserCheck') return <UserCheck className="h-5 w-5 text-gold" />;
    if (iconName === 'ChefHat') return <ChefHat className="h-5 w-5 text-gold" />;
    return <Sparkles className="h-5 w-5 text-gold" />;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative bg-[#161618] border border-gold/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        id={`booking-wizard-modal-${room.id}`}
      >
        
        {/* Header with Close option */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800/80 shrink-0">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">{t('configureRoom')}</span>
            <h2 className="text-lg font-serif font-bold text-neutral-100 tracking-wide">{room.name[currentLang]}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-850 text-neutral-400 hover:text-gold transition-colors cursor-pointer"
            id="close-booking-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard progress rail */}
        <div className="bg-neutral-950/60 px-6 py-3 border-b border-neutral-800/80 flex items-center justify-between text-xs shrink-0 font-mono">
          <div className="flex items-center space-x-6">
            <span className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-gold font-bold' : 'text-neutral-500'}`}>
              <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>{currentLang === 'KG' ? "Жабдуу жана Кызматтар" : currentLang === 'RU' ? "Кастомизация и Услуги" : "Customization & Services"}</span>
            </span>
            <ChevronRight className="h-3 w-3 text-neutral-600" />
            <span className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-gold font-bold' : 'text-neutral-500'}`}>
              <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>{currentLang === 'KG' ? "Конок Маалыматы" : currentLang === 'RU' ? "Данные гостя" : "Guest Details"}</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-neutral-400 bg-neutral-900 px-3 py-1 border border-neutral-800 rounded-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase font-mono">{t('ratingLabel')}</span>
          </div>
        </div>

        {/* Scrollable Wizard Work Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          
          {step === 1 && (
            <div className="space-y-8" id="wizard-step-1">
              
              {/* Short room preview cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0a0b]/40 p-5 border border-neutral-800/80 rounded">
                <div className="aspect-[16/10] md:col-span-1 rounded overflow-hidden">
                  <img src={room.image} alt="Suite mini" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="md:col-span-2 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-gold font-serif font-bold text-sm tracking-wide">{room.tagline[currentLang]}</h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{room.longDescription[currentLang]}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-3 text-[11px] text-neutral-400 font-mono">
                    <span className="bg-[#161618] px-2.5 py-1 rounded border border-neutral-800/60">{room.sizeSqm} {t('perkSqm')}</span>
                    <span className="bg-[#161618] px-2.5 py-1 rounded border border-neutral-800/60">{room.maxGuests} {t('perkMaxGuests')}</span>
                    <span className="text-gold font-bold">${room.pricePerNight} / {t('perkNights')}</span>
                  </div>
                </div>
              </div>

              {/* Unique Customizer Choices */}
              <div className="space-y-5">
                <div className="border-b border-neutral-800/80 pb-2">
                  <h3 className="text-md font-serif font-bold text-gold flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>{t('customizerTitle')}</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">{t('customizerSubtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CUSTOMIZATION_OPTIONS.map((opt) => (
                    <div key={opt.category} className="bg-[#0a0a0b]/20 p-4 border border-neutral-800/60 rounded">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-2.5 font-bold">
                        {opt.categoryLabel[currentLang]}
                      </label>
                      <div className="space-y-2">
                        {opt.choices.map((choice) => {
                          const isSelected = customChoices[opt.category] === choice.id;
                          return (
                            <button
                              key={choice.id}
                              type="button"
                              onClick={() => handleCustomChoiceChange(opt.category, choice.id)}
                              className={`w-full flex items-center justify-between p-2.5 text-xs text-left border rounded transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-gold/15 border-gold text-gold font-medium' 
                                  : 'bg-[#161618] border-neutral-800/60 text-neutral-400 hover:border-neutral-700/80'
                              }`}
                              id={`custom-choice-${opt.category}-${choice.id}`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-gold' : 'border-neutral-700'}`}>
                                  {isSelected && <div className="h-2 w-2 rounded-full bg-gold" />}
                                </div>
                                <span className="truncate max-w-[200px] sm:max-w-xs">{choice.label[currentLang]}</span>
                              </div>
                              <span className="font-mono font-bold text-gold">
                                {choice.price === 0 ? t('freeService') : `+$${choice.price}`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP services Checklist */}
              <div className="space-y-5">
                <div className="border-b border-neutral-800 pb-2">
                  <h3 className="text-md font-serif font-bold text-gold flex items-center space-x-2 animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    <span>{t('premiumServices')}</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">{t('servicesSubtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LUXURY_SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`flex items-start p-4 text-left border rounded transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gold/10 border-gold text-gold shadow-lg' 
                            : 'bg-neutral-950/20 border-neutral-800/70 text-neutral-400 hover:border-neutral-800 hover:bg-neutral-950/45'
                        }`}
                        id={`srv-toggle-${srv.id}`}
                      >
                        <div className="shrink-0 mt-0.5 p-1.5 rounded bg-neutral-900 border border-neutral-850 mr-3.5">
                          {getServiceIcon(srv.icon)}
                        </div>
                        <div className="flex-grow pr-4">
                          <span className="block text-sm font-bold text-neutral-200">{srv.name[currentLang]}</span>
                          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{srv.description[currentLang]}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className={`h-5 w-5 rounded-sm border flex items-center justify-center shrink-0 mb-2 ${isSelected ? 'bg-gold border-gold text-neutral-900' : 'border-neutral-700'}`}>
                            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                          </div>
                          <span className="block text-xs font-mono font-bold text-gold">+${srv.pricePerNight} </span>
                          <span className="block text-[8px] uppercase tracking-wider text-neutral-500">{t('perkNights')}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmission} className="space-y-6" id="wizard-step-2">
              
              <div className="border-b border-neutral-800/80 pb-2">
                <h3 className="text-md font-serif font-bold text-gold flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t('ledgerTitle')}</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">{t('ledgerSubtitle')}</p>
              </div>

              {/* Dates choosing */}
              <div className="bg-[#0a0a0b]/40 p-5 rounded border border-neutral-800/80 space-y-4">
                <span className="block text-xs font-mono font-bold uppercase text-gold tracking-wider mb-2">
                  {t('lblDates')}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-mono mb-1.5">{t('lblCheckIn')}</label>
                    <input
                      type="date"
                      required
                      min={formatDateString(new Date())}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs font-mono"
                      id="input-check-in"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-mono mb-1.5">{t('lblCheckOut')}</label>
                    <input
                      type="date"
                      required
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs font-mono"
                      id="input-check-out"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono bg-neutral-900 p-2.5 rounded border border-neutral-850">
                  <span>{t('lblNights')}</span>
                  <span className="font-bold text-gold text-sm">{nightsCount} {t('perkNights')}</span>
                </div>
              </div>

              {/* Guests Selection */}
              <div className="bg-[#0a0a0b]/20 p-5 rounded border border-neutral-800/60 space-y-4">
                <span className="block text-xs font-mono font-bold uppercase text-gold tracking-wider mb-1">
                  {t('lblGuests')}
                </span>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-mono mb-1.5">{t('lblAdults')}</label>
                    <select
                      value={adultsCount}
                      onChange={(e) => setAdultsCount(Number(e.target.value))}
                      className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs font-mono"
                      id="select-adults"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-mono mb-1.5">{t('lblChildren')}</label>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs font-mono"
                      id="select-children"
                    >
                      {[0, 1, 2, 3].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Identity & Ledger credentials */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">{t('lblfullName')} <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Mulan Toktomushev"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#0a0a0b]/60 border border-neutral-800 focus:border-gold focus:outline-none px-4 py-3 rounded text-neutral-100 text-sm"
                    id="input-guest-name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">{t('lblEmail')} <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="vip.guest@domain.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#0a0a0b]/60 border border-neutral-800 focus:border-gold focus:outline-none px-4 py-3 rounded text-neutral-101 text-sm font-mono"
                      id="input-guest-email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">{t('lblPhone')} <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="+996 (555) 777-777"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#0a0a0b]/60 border border-neutral-800 focus:border-gold focus:outline-none px-4 py-3 rounded text-neutral-102 text-sm font-mono"
                      id="input-guest-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">{t('lblNotes')}</label>
                  <textarea
                    rows={2}
                    placeholder={t('placeholderNotes')}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-[#0a0a0b]/65 border border-neutral-800 focus:border-gold focus:outline-none p-4 rounded text-neutral-103 text-xs leading-relaxed"
                    id="input-additional-notes"
                  />
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Live Calculation ledger footer */}
        <div className="bg-neutral-950 px-6 py-4 border-t border-neutral-800/80 flex flex-col sm:flex-row item-start sm:items-center justify-between shrink-0 gap-4">
          <div className="space-y-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500">{t('calcTotal')}</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold font-mono text-gold">${grandTotal}</span>
              <span className="text-xs text-neutral-400">/ {nightsCount} {t('perkNights')}</span>
            </div>
            
            {/* Breakdowns tooltips */}
            <div className="flex flex-wrap gap-x-3 text-[9px] font-mono text-neutral-500 mt-1">
              <span>{t('calcBasePrice')} <strong className="text-neutral-400">${roomTotal}</strong></span>
              {servicesTotal > 0 && <span>• {t('calcServices')} <strong className="text-neutral-400">${servicesTotal}</strong></span>}
              {customTotal > 0 && <span>• {t('calcCustom')} <strong className="text-neutral-400">${customTotal}</strong></span>}
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="w-1/2 sm:w-auto px-5 py-3 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-bold font-mono tracking-wider uppercase transition-all rounded cursor-pointer"
                id="back-step-btn"
              >
                {t('btnCustomizeBack')}
              </button>
            )}

            {step === 1 ? (
              <button
                onClick={nextStep}
                className="w-full sm:w-auto px-6 py-3 bg-gold hover:opacity-90 text-neutral-950 font-serif font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center space-x-1 cursor-pointer"
                id="next-step-btn"
              >
                <span>{t('btnCustomizeNext')}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmission}
                className="w-1/2 sm:w-auto flex-grow px-7 py-3 bg-gold hover:opacity-90 text-neutral-950 font-serif font-black text-xs tracking-wider uppercase transition-all duration-300 rounded-sm shadow-lg flex items-center justify-center space-x-2 animate-bounce-slow cursor-pointer"
                id="submit-booking-btn"
              >
                <Award className="h-4 w-4 fill-current" />
                <span>{t('btnSubmitBooking')}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
