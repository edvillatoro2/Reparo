export interface Handyman {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  skills: string[];
  rating?: number;
  reviewCount?: number;
  photoUrl?: string;
  specialties: string[];
  availability: "available" | "busy" | "unavailable";
  languages: string[];
  isVerified: boolean;
}
