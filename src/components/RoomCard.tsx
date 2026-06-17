import React from 'react';
import { LuxuryRoom, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Maximize2, Users, Compass, BedDouble, Star, Sparkles } from 'lucide-react';

interface RoomCardProps {
  key?: string;
  room: LuxuryRoom;
  currentLang: Language;
  onSelect: (roomId: string) => void;
}

export default function RoomCard({ room, currentLang, onSelect }: RoomCardProps) {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  return (
    <div 
      className="group bg-[#161618] border border-neutral-800/80 hover:border-gold/40 rounded-lg overflow-hidden transition-all duration-500 flex flex-col h-full shadow-2xl"
      id={`room-card-${room.id}`}
    >
      {/* Room Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-neutral-950">
        <img
          src={room.image}
          alt={room.name[currentLang]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out-quint"
          referrerPolicy="no-referrer"
        />
        
        {/* Price Tag Overlay */}
        <div className="absolute top-4 right-4 bg-[#0a0a0b]/90 backdrop-blur-md px-4 py-2 border border-gold/30 rounded-sm">
          <span className="block text-xs uppercase tracking-wider text-neutral-400 text-right">{t('perNight')}</span>
          <span className="text-xl font-bold font-mono text-gold">
            ${room.pricePerNight}
          </span>
        </div>

        {/* Five Star Certification Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-gold text-[#0a0a0b] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-md">
          <Star className="h-3 w-3 fill-current" />
          <span>{t('ratingLabel')}</span>
        </div>

        {/* Floating Tagline */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent p-6 pt-16">
          <span className="text-gold/90 text-xs font-mono tracking-wider uppercase flex items-center space-x-1.5 label">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>{room.tagline[currentLang]}</span>
          </span>
          <h3 className="text-xl font-bold font-serif text-neutral-100 tracking-wide mt-1">
            {room.name[currentLang]}
          </h3>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
            {room.description[currentLang]}
          </p>

          {/* Luxury Specifications Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-b border-neutral-800/60 py-4 mb-6">
            <div className="flex items-center space-x-2.5">
              <Maximize2 className="h-4 w-4 text-gold/80" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">{t('sizeLabel')}</span>
                <span className="text-xs font-semibold text-neutral-300 font-mono">{room.sizeSqm} {t('perkSqm')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Users className="h-4 w-4 text-gold/80" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">{t('capacityLabel')}</span>
                <span className="text-xs font-semibold text-neutral-300 font-mono">{room.maxGuests} {t('perkMaxGuests')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Compass className="h-4 w-4 text-gold/80" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">{t('viewLabel')}</span>
                <span className="text-xs font-semibold text-neutral-300 truncate max-w-[130px]" title={room.viewType[currentLang]}>
                  {room.viewType[currentLang]}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <BedDouble className="h-4 w-4 text-gold/80" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">{t('bedLabel')}</span>
                <span className="text-xs font-semibold text-neutral-300 truncate max-w-[130px]" title={room.bedType[currentLang]}>
                  {room.bedType[currentLang]}
                </span>
              </div>
            </div>
          </div>

          {/* Highlighted special perk */}
          <div className="bg-gold/5 border border-gold/20 rounded p-3 mb-6 flex items-start space-x-2.5">
            <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] font-mono tracking-wider text-gold uppercase">{t('perkSpecialBenefit')}</span>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                {room.specialPerk[currentLang]}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Trigger */}
        <button
          onClick={() => onSelect(room.id)}
          className="w-full py-3 bg-[#0a0a0b] border border-gold text-gold hover:bg-gold hover:text-neutral-950 font-serif tracking-widest font-bold text-xs uppercase transition-all duration-300 rounded-sm shadow-xl"
          id={`select-btn-${room.id}`}
        >
          {t('selectBtn')}
        </button>
      </div>
    </div>
  );
}
