import React, { useState, useEffect } from 'react';
import { LuxuryRoom, Language, LuxuryService } from '../types';
import { LUXURY_ROOMS, TRANSLATIONS } from '../data';
import { Calculator, Sparkles, Check, CheckCircle2, ShieldCheck, Flame, User, Users } from 'lucide-react';

interface PriceEstimatorProps {
  currentLang: Language;
  onSelectSuite: (room: LuxuryRoom) => void;
}

export default function PriceEstimator({ currentLang, onSelectSuite }: PriceEstimatorProps) {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  // Selected suite
  const [selectedRoomId, setSelectedRoomId] = useState<string>(LUXURY_ROOMS[0].id);
  const selectedRoom = LUXURY_ROOMS.find(r => r.id === selectedRoomId) || LUXURY_ROOMS[0];

  // Duration
  const [nights, setNights] = useState<number>(3);
  
  // Guest count
  const [guests, setGuests] = useState<number>(2);

  // VIP Extras chosen
  const [useHelicopter, setUseHelicopter] = useState<boolean>(true);
  const [useButler, setUseButler] = useState<boolean>(false);
  const [useChef, setUseChef] = useState<boolean>(false);
  const [useSpa, setUseSpa] = useState<boolean>(true);

  // Auto-cap guest count based on suite limit
  useEffect(() => {
    if (guests > selectedRoom.maxGuests) {
      setGuests(selectedRoom.maxGuests);
    }
  }, [selectedRoomId]);

  // Pricing values
  const baseCost = selectedRoom.pricePerNight * nights;
  
  const hCost = useHelicopter ? 1200 * nights : 0;
  const bCost = useButler ? 400 * nights : 0;
  const cCost = useChef ? 600 * nights : 0;
  const sCost = useSpa ? 350 * nights : 0;
  
  const extrasCost = hCost + bCost + cCost + sCost;
  const totalBill = baseCost + extrasCost;

  // Text details of localisations
  const textDefs = {
    title: {
      KG: "Падышалык Люкс Бааларын Эсептөөчү Калькулятор",
      EN: "Interactive Suite Rates & Billing Estimator",
      RU: "Калькулятор Цен и Услуг Королевских Номеров"
    },
    subtitle: {
      KG: "Сизге жаккан бөлмөнү, убакытты жана кошумча VIP кызматтарды тандап, баасын дароо эсептеп алыңыз.",
      EN: "Select your desired residence, adjust your duration, toggle bespoke military security escorts or spa options, and instantly review itemized pricing details.",
      RU: "Выберите желаемые апартаменты, период проживания и дополнительные элитные VIP-услуги, чтобы мгновенно получить детальный расчет."
    },
    suiteLbl: { KG: "Кароо бөлмөсүн тандаңыз:", EN: "Select Imperial Residence:", RU: "Выберите королевский люкс:" },
    nightsLbl: { KG: "Түндүн саны:", EN: "Duration (Nights Count):", RU: "Количество ночей проживания:" },
    guestsLbl: { KG: "Коноктордун саны (Сиз үчүн 2 сунушталат):", EN: "Registered Guests Amount (2 is recommend):", RU: "Количество гостей (рекомендуется 2):" },
    vipLbl: { KG: "Элиталык Купуя кызматтар:", EN: "Elite VIP Inclusive Options:", RU: "Элитные VIP-услуги:" },
    billLbl: { KG: "Билл баракчасы (Эсептөө)", EN: "Itemized Billing Statement", RU: "Детализация счета" },
    baseRateLbl: { KG: "Бөлмөнүн базалык баасы:", EN: "Base Suite Lodging:", RU: "Базовый тариф люкса:" },
    vipExtrasLbl: { KG: "VIP кошумча кызматтар:", EN: "Exclusive VIP Services:", RU: "Элитное VIP обслуживание:" },
    welcomeGiftLbl: { KG: "Негиздөөчүдөн жагымдуу белек:", EN: "Welcome Elixir from Founder Guljan:", RU: "Подарок от основательницы Гулжан:" },
    includedDesc: { KG: "Акысыз (Бал ширеси)", EN: "Gratis (Mountain Elixir)", RU: "Бесплатно (Горный эликсир)" },
    sumBill: { KG: "Жалпы жыйынтык баасы:", EN: "Consolidated Total Bill:", RU: "Итоговая сумма счета:" },
    bookThisSetup: { KG: "Ушул курамды ээлеп алуу", EN: "Book This Exact Setup", RU: "Забронировать эту конфигурацию" },
    helicopterLabel: { KG: "Тик учар VIP трансфери ($1200 / түн)", EN: "VIP Helicopter Airport Dispatch ($1200 / night)", RU: "Вертолетный VIP-трансфер ($1200 / ночь)" },
    butlerLabel: { KG: "Жеке дворецкий кызматтары ($400 / түн)", EN: "Personal 24/7 Royal Butler ($400 / night)", RU: "Личный круглосуточный дворецкий ($400 / ночь)" },
    chefLabel: { KG: "Мишлен ашпозчусу жана меню курамы ($600 / түн)", EN: "Michelin Personal Chef & Menu ($600 / night)", RU: "Личный повар Michelin ($600 / ночь)" },
    spaLabel: { KG: "24к Алтын Термалдык Спа ($350 / түн)", EN: "24k Gold Thermal Spa Sessions ($350 / night)", RU: "24к Золотое Термальное Спа ($350 / ночь)" },
    perNightUnit: { KG: "түнүнө", EN: "per night", RU: "в сутки" }
  };

  const getLoc = (key: keyof typeof textDefs) => textDefs[key][currentLang] || textDefs[key].EN;

  return (
    <div className="bg-[#161618] border border-neutral-800/80 rounded-lg p-6 md:p-8 relative overflow-hidden" id="rates-calculator-deck">
      <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-2xl" />
      
      {/* Title Header */}
      <div className="space-y-2 mb-8">
        <span className="text-xs font-mono text-gold uppercase tracking-widest flex items-center gap-1.5 label">
          <Calculator className="h-4 w-4 animate-pulse text-gold" />
          <span>{getLoc('title')}</span>
        </span>
        <p className="text-xs text-neutral-400 max-w-4xl leading-relaxed">
          {getLoc('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lefthand Selectors */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Suite Select Option */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">{getLoc('suiteLbl')}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LUXURY_ROOMS.map(room => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-4 border text-left rounded transition-all flex flex-col justify-between cursor-pointer ${
                    selectedRoomId === room.id 
                      ? 'bg-gold/10 border-gold shadow-md' 
                      : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between w-full items-start">
                    <span className={`text-xs font-bold font-serif ${selectedRoomId === room.id ? 'text-gold' : 'text-neutral-200'}`}>
                      {room.name[currentLang]}
                    </span>
                    {selectedRoomId === room.id && <Sparkles className="h-3.5 w-3.5 text-gold animate-bounce" />}
                  </div>
                  <div className="flex justify-between items-baseline mt-4 w-full">
                    <span className="text-[10px] font-mono text-neutral-500">{room.sizeSqm} sqm / max {room.maxGuests} guests</span>
                    <span className="text-xs font-bold font-mono text-gold">${room.pricePerNight} <span className="text-[9px] text-neutral-500 font-normal">{getLoc('perNightUnit')}</span></span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nights Slicer / Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-neutral-300 uppercase tracking-wider">{getLoc('nightsLbl')}</span>
                <span className="font-bold text-gold font-mono">{nights} {currentLang === 'KG' ? "түн" : currentLang === 'RU' ? "ночей" : "nights"}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
                id="nights-rates-range"
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-600">
                <span>1 night</span>
                <span>30 nights</span>
              </div>
            </div>

            {/* Guest Cap Selection */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-neutral-300 uppercase tracking-wider">{getLoc('guestsLbl')}</span>
                <span className="font-bold text-gold font-mono">{guests} {currentLang === 'KG' ? "киши" : currentLang === 'RU' ? "гостей" : "guests"}</span>
              </div>
              <div className="flex bg-neutral-950 p-1 border border-neutral-850 rounded">
                {Array.from({ length: selectedRoom.maxGuests }, (_, i) => i + 1).map(gNum => (
                  <button
                    key={gNum}
                    type="button"
                    onClick={() => setGuests(gNum)}
                    className={`flex-1 py-1.5 text-center text-xs font-bold font-mono rounded cursor-pointer ${
                      guests === gNum 
                        ? 'bg-gold text-[#0a0a0b]' 
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {gNum}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 font-mono">
                <Users className="h-3 w-3 text-gold/60" />
                <span>Max allowable limit for this suite is {selectedRoom.maxGuests} guests.</span>
              </div>
            </div>

          </div>

          {/* Elite Services Checkboxes list */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">{getLoc('vipLbl')}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="vip-options-grid">
              
              <button
                type="button"
                onClick={() => setUseHelicopter(!useHelicopter)}
                className={`flex items-center gap-3 p-3 rounded border text-left transition-colors cursor-pointer ${
                  useHelicopter 
                    ? 'bg-gold/5 border-gold/40 text-gold' 
                    : 'bg-neutral-950/80 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className={`h-4 w-4 border rounded flex items-center justify-center shrink-0 ${useHelicopter ? 'border-gold bg-gold text-[#0a0a0b]' : 'border-neutral-700'}`}>
                  {useHelicopter && <Check className="h-3 w-3 stroke-[3px]" />}
                </div>
                <span className="text-[11px] font-mono leading-tight">{getLoc('helicopterLabel')}</span>
              </button>

              <button
                type="button"
                onClick={() => setUseButler(!useButler)}
                className={`flex items-center gap-3 p-3 rounded border text-left transition-colors cursor-pointer ${
                  useButler 
                    ? 'bg-gold/5 border-gold/40 text-gold' 
                    : 'bg-neutral-950/80 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className={`h-4 w-4 border rounded flex items-center justify-center shrink-0 ${useButler ? 'border-gold bg-gold text-[#0a0a0b]' : 'border-neutral-700'}`}>
                  {useButler && <Check className="h-3 w-3 stroke-[3px]" />}
                </div>
                <span className="text-[11px] font-mono leading-tight">{getLoc('butlerLabel')}</span>
              </button>

              <button
                type="button"
                onClick={() => setUseChef(!useChef)}
                className={`flex items-center gap-3 p-3 rounded border text-left transition-colors cursor-pointer ${
                  useChef 
                    ? 'bg-gold/5 border-gold/40 text-gold' 
                    : 'bg-neutral-950/80 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className={`h-4 w-4 border rounded flex items-center justify-center shrink-0 ${useChef ? 'border-gold bg-gold text-[#0a0a0b]' : 'border-neutral-700'}`}>
                  {useChef && <Check className="h-3 w-3 stroke-[3px]" />}
                </div>
                <span className="text-[11px] font-mono leading-tight">{getLoc('chefLabel')}</span>
              </button>

              <button
                type="button"
                onClick={() => setUseSpa(!useSpa)}
                className={`flex items-center gap-3 p-3 rounded border text-left transition-colors cursor-pointer ${
                  useSpa 
                    ? 'bg-gold/5 border-gold/40 text-gold' 
                    : 'bg-neutral-950/80 border-neutral-850 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className={`h-4 w-4 border rounded flex items-center justify-center shrink-0 ${useSpa ? 'border-gold bg-gold text-[#0a0a0b]' : 'border-neutral-700'}`}>
                  {useSpa && <Check className="h-3 w-3 stroke-[3px]" />}
                </div>
                <span className="text-[11px] font-mono leading-tight">{getLoc('spaLabel')}</span>
              </button>

            </div>
          </div>

        </div>

        {/* Righthand Detailed Receipt Card */}
        <div className="lg:col-span-5" id="billing-statement-card">
          <div className="bg-neutral-950 border border-neutral-805 p-6 rounded relative flex flex-col h-full justify-between space-y-6">
            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Stamp header */}
            <div className="border-b border-neutral-805 pb-4 shrink-0 flex items-center justify-between">
              <div>
                <span className="block text-[9px] uppercase font-mono tracking-widest text-[#6c6c70]">{getLoc('billLbl')}</span>
                <span className="block text-sm font-bold text-neutral-200 mt-1 font-serif tracking-tight">{selectedRoom.name[currentLang]}</span>
              </div>
              <ShieldCheck className="h-6 w-6 text-gold/40" />
            </div>

            {/* Calculations items list */}
            <div className="space-y-4 flex-grow text-xs font-mono text-neutral-300 py-2">
              
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="block text-neutral-400">Suite Lodging Rent</span>
                  <span className="block text-[9px] text-[#6c6c70]">${selectedRoom.pricePerNight} × {nights} nights</span>
                </div>
                <span className="font-bold text-neutral-100">${baseCost.toLocaleString()}</span>
              </div>

              {extrasCost > 0 && (
                <div className="flex justify-between items-start border-t border-dashed border-neutral-850 pt-3">
                  <div className="space-y-0.5">
                    <span className="block text-neutral-400">{getLoc('vipExtrasLbl')}</span>
                    <span className="block text-[9px] text-[#6c6c70] font-mono flex flex-wrap gap-x-2">
                      {useHelicopter && <span>• Helicopter</span>}
                      {useButler && <span>• Butler</span>}
                      {useChef && <span>• Personal Chef</span>}
                      {useSpa && <span>• Gold Spa</span>}
                    </span>
                  </div>
                  <span className="font-bold text-neutral-100">${extrasCost.toLocaleString()}</span>
                </div>
              )}

              {/* Founder Gift Option */}
              <div className="flex justify-between items-center border-t border-dashed border-neutral-850 pt-3">
                <div className="space-y-0.5">
                  <span className="block text-neutral-400">{getLoc('welcomeGiftLbl')}</span>
                  <span className="block text-[9px] text-emerald-400 flex items-center gap-1 font-mono">
                    <Flame className="h-3 w-3 fill-current animate-pulse text-gold" />
                    <span>Sary-Jaz Peak Golden Nectar</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-400/25 px-2 py-0.5 rounded">
                  {getLoc('includedDesc')}
                </span>
              </div>

              {/* Guests Detail Line */}
              <div className="flex justify-between items-center border-t border-neutral-850 pt-3 text-[10px] text-neutral-500 px-1">
                <span>Registered Residency Occupancy:</span>
                <span className="font-bold text-gold flex items-center gap-1">
                  <User className="h-3.5 w-3.5 fill-current" />
                  <span>{guests} Luxury Guests</span>
                </span>
              </div>

            </div>

            {/* Financial Grand total bill footer block */}
            <div className="border-t border-neutral-805 pt-5 space-y-4 shrink-0 bg-neutral-950">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider font-mono">{getLoc('sumBill')}</span>
                <span className="text-2xl font-bold font-mono text-gold tracking-tighter">
                  ${totalBill.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => onSelectSuite(selectedRoom)}
                className="w-full py-4.5 bg-gold hover:opacity-95 text-neutral-950 font-serif font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
                id="book-exact-setup-btn"
              >
                <span>{getLoc('bookThisSetup')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
