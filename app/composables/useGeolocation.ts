import type { UserLocation } from "~/types";

export const useGeolocation = () => {
  const location = ref<UserLocation | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const detect = async (): Promise<UserLocation> => {
    // make sure running in browser, not server
    if (!import.meta.client) {
      throw new Error("Geolocation only works in the browser");
    }

    // make sure browser supports geolocation
    if (!navigator.geolocation) {
      throw new Error("Browser does not support geolocation");
    }

    loading.value = true;
    error.value = null;

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // success — we got the coordinates
          const result: UserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          location.value = result;
          loading.value = false;
          resolve(result);
        },
        (err) => {
          // failed - user denied or timeout
          const message =
            err.code === 1
              ? "Location access denied. Please allow location access and try again."
              : "Unable to detect your location. Try entering your city manually.";
          error.value = message;
          loading.value = false;
          reject(new Error(message));
        },
        { timeout: 8000 },
      );
    });
  };

  // set location manually (for when user types a city instead)
  const setManually = (
    lat: number,
    lng: number,
    city?: string,
    state?: string,
  ) => {
    location.value = { lat, lng, city, state };
  };

  return { location, loading, error, detect, setManually };
};
