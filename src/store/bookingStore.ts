'use client';

import { create } from 'zustand';
import type { BookingState, BookingGuests } from '@/types/booking';

interface BookingStore extends BookingState {
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setGuests: (guests: BookingGuests) => void;
  setRoomType: (type: string) => void;
  setExtras: (extras: string[]) => void;
  reset: () => void;
}

const initialState: BookingState = {
  checkIn: '',
  checkOut: '',
  guests: { adults: 2, children: 0 },
  roomType: '',
  extras: [],
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialState,
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setGuests: (guests) => set({ guests }),
  setRoomType: (roomType) => set({ roomType }),
  setExtras: (extras) => set({ extras }),
  reset: () => set(initialState),
}));
