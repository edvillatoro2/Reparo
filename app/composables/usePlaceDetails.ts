interface placeDetails {
  website?: string | null;
  phone?: string | null;
  fullAddress?: string | null;
  googleUrl?: string | null;
  openNow?: boolean | null;
  photoUrl?: string | null;
}

export const usePlaceDetails = () => {
  const details = ref<placeDetails | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async (placeId: string) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<placeDetails>("/api/place", {
        params: { placeId },
      });
      details.value = data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const clear = () => {
    details.value = null;
  };

  return { details, loading, error, fetchData, clear };
};
