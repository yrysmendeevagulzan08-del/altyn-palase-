export type Language = 'KG' | 'EN' | 'RU';

export interface MultilingualText {
  KG: string;
  EN: string;
  RU: string;
}

export interface LuxuryService {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  pricePerNight: number;
  icon: string;
}

export interface CustomizationOption {
  category: string;
  categoryLabel: MultilingualText;
  choices: {
    id: string;
    label: MultilingualText;
    price: number;
  }[];
}

export interface LuxuryRoom {
  id: string;
  name: MultilingualText;
  tagline: MultilingualText;
  description: MultilingualText;
  longDescription: MultilingualText;
  pricePerNight: number;
  maxGuests: number;
  sizeSqm: number;
  viewType: MultilingualText;
  bedType: MultilingualText;
  image: string;
  amenities: MultilingualText[];
  specialPerk: MultilingualText;
}

export interface GuestBooking {
  id: string;
  roomId: string;
  roomName: MultilingualText;
  roomImage: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  adultsCount: number;
  childrenCount: number;
  selectedServices: string[]; // service IDs
  customizationChoices: Record<string, string>; // categoryId -> choiceId
  additionalNotes: string;
  totalPrice: number;
  bookingCode: string;
  status: 'Confirmed' | 'Pending Luxury Concierge Review';
  createdAt: string;
}

export interface GuestReview {
  id: string;
  guestName: string;
  rating: number;
  roomName: string;
  comment: string;
  date: string;
  avatarSeed: string;
}
