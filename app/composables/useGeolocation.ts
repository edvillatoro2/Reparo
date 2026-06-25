import type { UserLocation } from "~/types";

export const useGeolocation = () => {
  const location = ref<UserLocation | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const detect = async (): Promise<UserLocation> => {
    //make sure running in browser, not server
    if (!import.meta.client) {
      throw new Error("Geolocation only works in the browser");
    }
  };
};
