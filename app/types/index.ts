export interface Handyman {
  id: string;
  name: string;
  email?: string;
  website?: string;
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

//search query parameters user sends when looking for a handyman
export interface SearchParams {
  lat: number;
  lng: number;
  radius?: number;
  keyword?: string;
  specialty?: string;
  language?: string;
}

// user's physical location
export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  state?: string;
}

// what API returns when user searches for a handyman
export interface SearchResponse {
  handymen: Handyman[];
  totalResults: number;
  page: number;
  totalPages: number;
}
