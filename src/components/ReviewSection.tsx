import React, { useState } from 'react';
import { GuestReview, Language } from '../types';
import { TRANSLATIONS, LUXURY_ROOMS } from '../data';
import { Star, Sparkles, MessageSquare, Quote, User, CheckCircle2 } from 'lucide-react';

interface ReviewSectionProps {
  currentLang: Language;
  reviews: GuestReview[];
  onAddReview: (newReview: GuestReview) => void;
}

export default function ReviewSection({ currentLang, reviews, onAddReview }: ReviewSectionProps) {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  const [formOpen, setFormOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [roomName, setRoomName] = useState('Presidential Royal Suite');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingMsg, setSubmittingMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !comment) {
      alert(currentLang === 'KG' ? "Сураныч, атыңызды жана пикириңизди жазыңыз!" : currentLang === 'RU' ? "Пожалуйста, введите ваше имя и отзыв!" : "Please write your name and dynamic comment!");
      return;
    }

    const newReview: GuestReview = {
      id: `rev-${Date.now()}`,
      guestName,
      rating,
      roomName,
      comment,
      date: new Date().toISOString().split('T')[0],
      avatarSeed: guestName.toLowerCase().replace(/\s+/g, '')
    };

    onAddReview(newReview);
    
    // Clear state
    setGuestName('');
    setComment('');
    setRating(5);
    setSubmittingMsg(true);
    
    setTimeout(() => {
      setSubmittingMsg(false);
      setFormOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 py-6" id="guest-reviews-section">
      
      {/* Top Header Information block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/60 pb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
            {t('navReviews')}
          </span>
          <h2 className="text-3xl font-serif font-bold text-neutral-100 tracking-wide">
            {t('reviewsTitle')}
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
            {t('reviewsSubtitle')}
          </p>
        </div>

        {/* Aggregate Ratings & Leave Action */}
        <div className="flex items-center space-x-6 shrink-0">
          <div className="bg-[#161618] px-4 py-3 rounded border border-neutral-800 flex items-center space-x-3">
            <div className="text-center">
              <span className="block text-xl font-bold font-mono text-gold font-bold">5.0</span>
              <span className="text-[9px] uppercase font-mono text-neutral-500">Perfect Suite Score</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-xs font-mono text-neutral-400 mt-1 block">
                {reviews.length} {currentLang === 'KG' ? "конок баалаган" : currentLang === 'RU' ? "отзывов гостей" : "verified reviews"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-5 py-3 bg-gold hover:opacity-90 text-neutral-950 font-serif font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-md"
            id="leave-comment-trigger"
          >
            {t('btnLeaveReview')}
          </button>
        </div>
      </div>

      {/* Review Submission Form Drawer / Card */}
      {formOpen && (
        <div className="bg-[#161618] p-6 rounded-lg border border-gold/25 max-w-2xl mx-auto shadow-2xl animate-fade-in">
          {submittingMsg ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3" id="review-success-panel">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce" />
              <h3 className="text-lg font-bold text-neutral-100">{t('revSuccessMsg')}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="review-submission-form">
              <h3 className="text-md font-bold text-gold flex items-center space-x-2">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>{t('reviewFormTitle')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('revNameLbl')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Aidar Semyonov"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs"
                    id="input-review-name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('revSuiteLbl')}</label>
                  <select
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-2.5 rounded text-neutral-200 text-xs font-mono"
                    id="select-review-suite"
                  >
                    {LUXURY_ROOMS.map(r => (
                      <option key={r.id} value={r.name[currentLang]}>{r.name[currentLang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interactive star clicking mechanism */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2">{t('revRatingLbl')}</label>
                <div className="flex items-center space-x-2 bg-[#0a0a0b] p-2 border border-neutral-800 rounded w-max">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      className="p-1 text-gold hover:scale-125 transition-transform"
                      id={`star-button-${starValue}`}
                    >
                      <Star className={`h-5 w-5 ${starValue <= rating ? 'fill-current' : 'text-neutral-600'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-neutral-400 ml-4 font-bold">({rating} / 5)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">{t('revCommentLbl')}</label>
                <textarea
                  rows={3}
                  required
                  placeholder="..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#0a0a0b] border border-neutral-800 focus:border-gold focus:outline-none p-3 rounded text-neutral-200 text-xs leading-relaxed"
                  id="input-review-comment"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold hover:opacity-90 text-neutral-950 font-bold text-xs font-mono tracking-wider cursor-pointer"
                  id="submit-review-btn"
                >
                  {t('revSubmitBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Grid listing reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="reviews-display-grid">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="group bg-[#161618]/70 hover:bg-[#161618] transition-all border border-neutral-800/80 p-6 rounded-lg relative flex flex-col justify-between"
            id={`review-item-${rev.id}`}
          >
            <div className="absolute top-6 right-6 text-neutral-800 group-hover:text-gold/15 transition-colors">
              <Quote className="h-8 w-8" />
            </div>

            <div>
              {/* Stars display */}
              <div className="flex text-gold mb-3">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>

              <p className="text-neutral-350 text-xs leading-relaxed font-sans mb-6 italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author layout footer */}
            <div className="flex items-center justify-between border-t border-neutral-800/40 pt-4 text-[10px] font-mono">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-gold">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-neutral-200 text-xs">{rev.guestName}</span>
                  <span className="text-neutral-500 font-normal block mt-0.5">{rev.roomName}</span>
                </div>
              </div>
              <span className="text-neutral-600">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
