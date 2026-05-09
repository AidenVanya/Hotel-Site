export interface BookingGuests {
  adults: number;
  children: number;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: BookingGuests;
  roomType: string;
  extras: string[];
}
